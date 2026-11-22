from datetime import timedelta

from conexion import ErrorIntegracion, conectar_postgres, en_bogota, inicio_dia, limpiar, mongo


def obtener_uno(conexion, consulta, parametros, mensaje):
    fila = conexion.execute(consulta, parametros).fetchone()
    if fila is None:
        raise ErrorIntegracion(mensaje, 404, 'postgresql')
    return fila


def porcentaje(parte, total):
    return round(float(parte) * 100 / float(total), 1) if total else 0.0


def resumen_calificaciones(resenas):
    if not resenas:
        return {'total': 0, 'promedio': None, 'distribucion': {str(n): 0 for n in range(5, 0, -1)}}
    calificaciones = [int(resena['calificacion']) for resena in resenas]
    return {
        'total': len(calificaciones),
        'promedio': round(sum(calificaciones) / len(calificaciones), 2),
        'distribucion': {str(n): calificaciones.count(n) for n in range(5, 0, -1)}
    }


def funcion_con_resenas(id_funcion):
    with conectar_postgres() as conexion:
        funcion = obtener_uno(conexion, """
            SELECT f.id_funcion, f.fecha_hora, f.idioma, f.precio_base, f.estado,
                   s.id_sala, s.nombre AS sala, s.tipo_sala, s.capacidad,
                   c.id_contrato, c.titulo_obra, c.genero, c.clasificacion,
                   COALESCE(SUM(v.cantidad) FILTER (WHERE v.estado = 'PAGADA'), 0) AS boletas_vendidas,
                   COALESCE(SUM(v.total) FILTER (WHERE v.estado = 'PAGADA'), 0) AS recaudo,
                   COUNT(v.id_venta) FILTER (WHERE v.estado = 'ANULADA') AS ventas_anuladas
            FROM funciones f
            JOIN salas s ON s.id_sala = f.id_sala
            JOIN contratos c ON c.id_contrato = f.id_contrato
            LEFT JOIN ventas v ON v.id_funcion = f.id_funcion
            WHERE f.id_funcion = %s
            GROUP BY f.id_funcion, s.id_sala, c.id_contrato
        """, (id_funcion,), 'La función {} no existe en PostgreSQL'.format(id_funcion))
        ventas = conexion.execute("""
            SELECT id_venta FROM ventas WHERE id_funcion = %s AND estado = 'PAGADA'
        """, (id_funcion,)).fetchall()

    ids_venta = {venta['id_venta'] for venta in ventas}
    ficha = mongo.fichas_tecnicas_peliculas.find_one(
        {'id_contrato': funcion['id_contrato']},
        {'codigo_pelicula': 1, 'titulo_original': 1, 'anio_estreno': 1, 'generos': 1,
         'direccion.nombre': 1, 'subtitulos': 1, 'estado_catalogo': 1}
    )
    resenas = list(mongo.resenas_peliculas.find(
        {'id_contrato': funcion['id_contrato'], 'estado_moderacion': 'PUBLICADA'},
        {'autor_alias': 1, 'calificacion': 1, 'titulo': 1, 'texto': 1, 'fecha': 1, 'verificada': 1,
         'id_venta': 1, 'id_espectador': 1, 'spoiler': 1, 'calificaciones_detalle': 1}
    ).sort('fecha', -1))
    de_asistentes = [resena for resena in resenas if resena.get('id_venta') in ids_venta]

    return limpiar({
        'caso': 'Función con sus reseñas',
        'motores': {'postgresql': 'funciones, salas, contratos, ventas', 'mongodb': 'fichas_tecnicas_peliculas, resenas_peliculas'},
        'funcion': {
            'id_funcion': funcion['id_funcion'],
            'fecha_hora': en_bogota(funcion['fecha_hora']),
            'idioma': funcion['idioma'],
            'estado': funcion['estado'],
            'precio_base': funcion['precio_base'],
            'sala': {'id_sala': funcion['id_sala'], 'nombre': funcion['sala'], 'tipo_sala': funcion['tipo_sala'], 'capacidad': funcion['capacidad']},
            'pelicula': {'id_contrato': funcion['id_contrato'], 'titulo': funcion['titulo_obra'], 'genero': funcion['genero'], 'clasificacion': funcion['clasificacion']}
        },
        'ventas': {
            'boletas_vendidas': funcion['boletas_vendidas'],
            'ocupacion_porcentaje': porcentaje(funcion['boletas_vendidas'], funcion['capacidad']),
            'recaudo': funcion['recaudo'],
            'ventas_anuladas': funcion['ventas_anuladas']
        },
        'ficha_tecnica': ficha,
        'resenas_pelicula': resumen_calificaciones(resenas),
        'resenas_de_asistentes': {
            **resumen_calificaciones(de_asistentes),
            'detalle': de_asistentes
        },
        'ultimas_resenas': resenas[:5]
    })


def pelicula_con_requisitos(id_contrato):
    with conectar_postgres() as conexion:
        contrato = obtener_uno(conexion, """
            SELECT c.id_contrato, c.titulo_obra, c.genero, c.duracion_min, c.clasificacion,
                   c.tipo_contrato, c.fecha_inicio, c.fecha_fin, c.estado,
                   a.id_artista, a.nombres || ' ' || a.apellidos AS artista, a.rol, a.nacionalidad
            FROM contratos c
            JOIN actores_directores a ON a.id_artista = c.id_artista
            WHERE c.id_contrato = %s
        """, (id_contrato,), 'El contrato {} no existe en PostgreSQL'.format(id_contrato))
        funciones = conexion.execute("""
            SELECT f.id_funcion, f.fecha_hora, f.idioma, f.estado, f.precio_base,
                   s.id_sala, s.nombre AS sala, s.tipo_sala, s.estado AS estado_sala
            FROM funciones f
            JOIN salas s ON s.id_sala = f.id_sala
            WHERE f.id_contrato = %s
            ORDER BY f.fecha_hora
        """, (id_contrato,)).fetchall()
        personal = {fila['id_staff']: fila for fila in conexion.execute("""
            SELECT id_staff, nombres || ' ' || apellidos AS nombre, cargo FROM staff
        """).fetchall()}

    ficha = mongo.fichas_tecnicas_peliculas.find_one({'id_contrato': id_contrato})
    requisitos = {int(doc['id_funcion']): doc for doc in mongo.requisitos_proyeccion.find(
        {'id_funcion': {'$in': [funcion['id_funcion'] for funcion in funciones]}}
    )}
    formatos = sorted({formato for version in (ficha or {}).get('versiones', []) for formato in version['formatos']})

    detalle = []
    alertas = []
    for funcion in funciones:
        requisito = requisitos.get(funcion['id_funcion'])
        item = {
            'id_funcion': funcion['id_funcion'],
            'fecha_hora': en_bogota(funcion['fecha_hora']),
            'estado': funcion['estado'],
            'idioma': funcion['idioma'],
            'sala': {'id_sala': funcion['id_sala'], 'nombre': funcion['sala'], 'tipo_sala': funcion['tipo_sala'], 'estado': funcion['estado_sala']},
            'requisitos': None
        }
        if requisito is None:
            if funcion['estado'] == 'PROGRAMADA':
                alertas.append('La función {} está programada y no tiene requisitos técnicos en MongoDB'.format(funcion['id_funcion']))
        else:
            checklist = [
                {**paso, 'responsable': personal.get(paso.get('id_staff'), {}).get('nombre')}
                for paso in requisito['checklist']
            ]
            pendientes = [paso['item'] for paso in checklist if not paso['completado']]
            item['requisitos'] = {
                'formato': requisito['formato'],
                'estado_preparacion': requisito['estado_preparacion'],
                'proyeccion': requisito['requisitos']['proyeccion'],
                'audio': requisito['requisitos']['audio'],
                'requisitos_especiales': sorted(set(requisito['requisitos']) - {'proyeccion', 'audio'}),
                'dcp': requisito.get('dcp'),
                'checklist': checklist,
                'pasos_pendientes': pendientes
            }
            if int(requisito['id_sala']) != funcion['id_sala']:
                alertas.append('La función {} está en la sala {} en PostgreSQL pero MongoDB indica la sala {}'.format(
                    funcion['id_funcion'], funcion['id_sala'], int(requisito['id_sala'])))
            if requisito['formato'] == '3D' and funcion['tipo_sala'] != '3D':
                alertas.append('La función {} requiere 3D y la sala {} es {}'.format(funcion['id_funcion'], funcion['sala'], funcion['tipo_sala']))
            if funcion['estado'] == 'PROGRAMADA' and pendientes:
                alertas.append('La función {} tiene {} paso(s) pendientes del checklist'.format(funcion['id_funcion'], len(pendientes)))
        detalle.append(item)

    return limpiar({
        'caso': 'Película con sus requisitos técnicos',
        'motores': {'postgresql': 'contratos, actores_directores, funciones, salas, staff', 'mongodb': 'fichas_tecnicas_peliculas, requisitos_proyeccion'},
        'contrato': contrato,
        'ficha_tecnica': None if ficha is None else {
            'codigo_pelicula': ficha['codigo_pelicula'],
            'titulo_original': ficha.get('titulo_original'),
            'anio_estreno': ficha['anio_estreno'],
            'generos': ficha['generos'],
            'direccion': [persona['nombre'] for persona in ficha['direccion']],
            'elenco': [persona['nombre'] for persona in sorted(ficha['elenco'], key=lambda persona: persona['orden'])],
            'formatos_disponibles': formatos,
            'idiomas': ficha['idiomas'],
            'subtitulos': ficha['subtitulos'],
            'estado_catalogo': ficha['estado_catalogo']
        },
        'resumen': {
            'funciones': len(funciones),
            'con_requisitos': sum(1 for item in detalle if item['requisitos']),
            'listas': sum(1 for item in detalle if item['requisitos'] and item['requisitos']['estado_preparacion'] == 'LISTA')
        },
        'funciones': detalle,
        'alertas': alertas
    })


def ventas_con_incidentes(desde=None, hasta=None):
    if desde and hasta and hasta < desde:
        raise ErrorIntegracion('La fecha final no puede ser anterior a la inicial', 422)
    condiciones = []
    parametros = []
    filtro_mongo = {}
    if desde:
        condiciones.append('f.fecha_hora >= %s')
        parametros.append(desde)
        filtro_mongo.setdefault('fecha_reporte', {})['$gte'] = inicio_dia(desde)
    if hasta:
        condiciones.append('f.fecha_hora < %s')
        parametros.append(hasta + timedelta(days=1))
        filtro_mongo.setdefault('fecha_reporte', {})['$lt'] = inicio_dia(hasta + timedelta(days=1))
    filtro_sql = ' AND '.join(condiciones) or 'TRUE'

    with conectar_postgres() as conexion:
        salas = conexion.execute("""
            SELECT s.id_sala, s.nombre, s.tipo_sala, s.capacidad, s.estado,
                   COUNT(DISTINCT f.id_funcion) AS funciones,
                   COALESCE(SUM(v.cantidad) FILTER (WHERE v.estado = 'PAGADA'), 0) AS boletas,
                   COALESCE(SUM(v.total) FILTER (WHERE v.estado = 'PAGADA'), 0) AS recaudo,
                   COUNT(v.id_venta) FILTER (WHERE v.estado = 'ANULADA') AS ventas_anuladas
            FROM salas s
            LEFT JOIN funciones f ON f.id_sala = s.id_sala AND {}
            LEFT JOIN ventas v ON v.id_funcion = f.id_funcion
            GROUP BY s.id_sala
            ORDER BY s.id_sala
        """.format(filtro_sql), parametros).fetchall()

    agregado = {fila['_id']: fila for fila in mongo.reportes_incidentes.aggregate([
        {'$match': filtro_mongo},
        {'$group': {
            '_id': '$id_sala',
            'total': {'$sum': 1},
            'abiertos': {'$sum': {'$cond': [{'$in': ['$estado', ['ABIERTO', 'EN_PROCESO']]}, 1, 0]}},
            'graves': {'$sum': {'$cond': [{'$in': ['$severidad', ['ALTA', 'CRITICA']]}, 1, 0]}},
            'fallas_tecnicas': {'$sum': {'$cond': [{'$eq': ['$tipo', 'FALLA_TECNICA']}, 1, 0]}},
            'quejas_servicio': {'$sum': {'$cond': [{'$eq': ['$tipo', 'QUEJA_SERVICIO']}, 1, 0]}},
            'seguridad': {'$sum': {'$cond': [{'$eq': ['$tipo', 'SEGURIDAD']}, 1, 0]}},
            'minutos_interrupcion': {'$sum': {'$ifNull': ['$detalle.minutos_interrupcion', 0]}},
            'reembolsado': {'$sum': {'$toDouble': {'$ifNull': ['$detalle.compensacion.valor', 0]}}}
        }}
    ])}

    vacio = {'total': 0, 'abiertos': 0, 'graves': 0, 'fallas_tecnicas': 0, 'quejas_servicio': 0,
             'seguridad': 0, 'minutos_interrupcion': 0, 'reembolsado': 0}
    resultado = []
    for sala in salas:
        incidentes = {clave: agregado.get(sala['id_sala'], vacio)[clave] for clave in vacio}
        resultado.append({
            **sala,
            'incidentes': incidentes,
            'incidentes_por_mil_boletas': round(incidentes['total'] * 1000 / sala['boletas'], 2) if sala['boletas'] else None
        })
    resultado.sort(key=lambda sala: (sala['incidentes_por_mil_boletas'] or 0), reverse=True)
    comunes = agregado.get(None, vacio)

    return limpiar({
        'caso': 'Cruce de ventas con incidentes por sala',
        'motores': {'postgresql': 'salas, funciones, ventas', 'mongodb': 'reportes_incidentes'},
        'periodo': {'desde': desde, 'hasta': hasta},
        'totales': {
            'boletas': sum(sala['boletas'] for sala in salas),
            'recaudo': sum(sala['recaudo'] for sala in salas),
            'incidentes_en_salas': sum(sala['incidentes']['total'] for sala in resultado),
            'incidentes_areas_comunes': comunes['total']
        },
        'salas': resultado
    })


def historial_espectador(id_espectador):
    with conectar_postgres() as conexion:
        espectador = obtener_uno(conexion, """
            SELECT id_espectador, tipo_documento, numero_documento, nombres, apellidos, email, fecha_registro
            FROM espectadores WHERE id_espectador = %s
        """, (id_espectador,), 'El espectador {} no existe en PostgreSQL'.format(id_espectador))
        compras = conexion.execute("""
            SELECT v.id_venta, v.fecha_venta, v.cantidad, v.valor_unitario, v.total, v.canal, v.estado,
                   tb.nombre AS tipo_boleta, f.id_funcion, f.fecha_hora, c.id_contrato, c.titulo_obra, s.nombre AS sala
            FROM ventas v
            JOIN tipos_boleta tb ON tb.id_tipo_boleta = v.id_tipo_boleta
            JOIN funciones f ON f.id_funcion = v.id_funcion
            JOIN contratos c ON c.id_contrato = f.id_contrato
            JOIN salas s ON s.id_sala = f.id_sala
            WHERE v.id_espectador = %s
            ORDER BY v.fecha_venta DESC
        """, (id_espectador,)).fetchall()

    resenas = list(mongo.resenas_peliculas.find(
        {'id_espectador': id_espectador},
        {'id_contrato': 1, 'codigo_pelicula': 1, 'calificacion': 1, 'titulo': 1, 'fecha': 1, 'verificada': 1, 'id_venta': 1, 'estado_moderacion': 1}
    ).sort('fecha', -1))
    incidentes = list(mongo.reportes_incidentes.find(
        {'reportado_por.id_espectador': id_espectador},
        {'codigo_incidente': 1, 'tipo': 1, 'severidad': 1, 'estado': 1, 'descripcion': 1, 'fecha_reporte': 1, 'detalle.id_venta': 1}
    ).sort('fecha_reporte', -1))
    comprobantes = {int(doc['id_venta']): doc['codigo_comprobante'] for doc in mongo.comprobantes_venta.find(
        {'id_espectador': id_espectador}, {'id_venta': 1, 'codigo_comprobante': 1})}
    resenadas = {int(resena['id_contrato']) for resena in resenas}

    for compra in compras:
        compra['fecha_hora'] = en_bogota(compra['fecha_hora'])
        compra['codigo_comprobante'] = comprobantes.get(compra['id_venta'])
        compra['tiene_resena'] = compra['id_contrato'] in resenadas

    return limpiar({
        'caso': 'Historial del espectador',
        'motores': {'postgresql': 'espectadores, ventas, funciones, contratos', 'mongodb': 'resenas_peliculas, reportes_incidentes, comprobantes_venta'},
        'espectador': espectador,
        'resumen': {
            'compras': len(compras),
            'boletas': sum(compra['cantidad'] for compra in compras if compra['estado'] == 'PAGADA'),
            'gastado': sum(compra['total'] for compra in compras if compra['estado'] == 'PAGADA'),
            'resenas': len(resenas),
            'incidentes_reportados': len(incidentes)
        },
        'compras': compras,
        'resenas': resenas,
        'incidentes': incidentes
    })


def cartelera():
    with conectar_postgres() as conexion:
        funciones = conexion.execute("""
            SELECT f.id_funcion, f.fecha_hora, f.idioma, f.precio_base, f.estado,
                   s.nombre AS sala, s.tipo_sala, s.capacidad, c.id_contrato, c.titulo_obra, c.clasificacion,
                   s.capacidad - COALESCE(SUM(v.cantidad) FILTER (WHERE v.estado = 'PAGADA'), 0) AS disponibles
            FROM funciones f
            JOIN salas s ON s.id_sala = f.id_sala
            JOIN contratos c ON c.id_contrato = f.id_contrato
            LEFT JOIN ventas v ON v.id_funcion = f.id_funcion
            WHERE f.estado = 'PROGRAMADA' AND f.fecha_hora > NOW()
            GROUP BY f.id_funcion, s.id_sala, c.id_contrato
            ORDER BY f.fecha_hora
        """).fetchall()
    fichas = {int(ficha['id_contrato']): ficha for ficha in mongo.fichas_tecnicas_peliculas.find(
        {'id_contrato': {'$in': list({funcion['id_contrato'] for funcion in funciones})}},
        {'id_contrato': 1, 'codigo_pelicula': 1, 'generos': 1, 'sinopsis': 1})}
    for funcion in funciones:
        funcion['fecha_hora'] = en_bogota(funcion['fecha_hora'])
        funcion['ficha'] = fichas.get(funcion['id_contrato'])
    return limpiar(funciones)


def catalogos():
    with conectar_postgres() as conexion:
        return limpiar({
            'tipos_boleta': conexion.execute('SELECT id_tipo_boleta, nombre, factor_precio FROM tipos_boleta WHERE activo ORDER BY id_tipo_boleta').fetchall(),
            'taquilleros': conexion.execute("SELECT id_staff, nombres || ' ' || apellidos AS nombre FROM staff WHERE cargo = 'TAQUILLERO' AND activo ORDER BY id_staff").fetchall(),
            'contratos': conexion.execute('SELECT id_contrato, titulo_obra, estado FROM contratos ORDER BY id_contrato').fetchall(),
            'salas': conexion.execute('SELECT id_sala, nombre, tipo_sala FROM salas ORDER BY id_sala').fetchall()
        })
