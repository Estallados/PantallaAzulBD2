import sys
from datetime import date, datetime, time, timedelta

from conexion import BOGOTA, conectar_postgres, mongo, preparar_mongo

PROGRAMACION = [
    (2, 1, 1, time(14, 0), 'SUBTITULADA', 18000),
    (2, 3, 3, time(17, 30), 'ORIGINAL', 26000),
    (2, 5, 4, time(21, 0), 'ORIGINAL', 32000),
    (3, 6, 5, time(14, 0), 'ORIGINAL', 22000),
    (3, 4, 7, time(17, 30), 'ORIGINAL', 26000),
    (3, 2, 10, time(21, 0), 'SUBTITULADA', 18000),
    (4, 1, 2, time(17, 30), 'ORIGINAL', 18000),
    (4, 5, 12, time(21, 0), 'SUBTITULADA', 32000),
    (5, 6, 9, time(17, 30), 'ORIGINAL', 22000),
    (6, 3, 11, time(14, 0), 'SUBTITULADA', 26000)
]

FORMATO_SALA = {'2D': '2D', '3D': '3D', 'PREMIUM': 'DOLBY_ATMOS', 'AUTOR': '2D'}


def programar_funciones(conexion, hoy):
    creadas = []
    for dias, id_sala, id_contrato, hora, idioma, precio in PROGRAMACION:
        fecha_hora = datetime.combine(hoy + timedelta(days=dias), hora)
        existente = conexion.execute(
            'SELECT id_funcion FROM funciones WHERE id_sala = %s AND fecha_hora = %s', (id_sala, fecha_hora)
        ).fetchone()
        if existente:
            continue
        fila = conexion.execute("""
            INSERT INTO funciones (id_sala, id_contrato, fecha_hora, idioma, precio_base, estado)
            VALUES (%s, %s, %s, %s, %s, 'PROGRAMADA')
            RETURNING id_funcion
        """, (id_sala, id_contrato, fecha_hora, idioma, precio)).fetchone()
        creadas.append(fila['id_funcion'])
    conexion.commit()
    return creadas


def documento_requisito(funcion, codigo_pelicula, plantilla):
    formato = FORMATO_SALA[funcion['tipo_sala']]
    inicio = funcion['fecha_hora'].replace(tzinfo=BOGOTA)
    requisitos = {
        'proyeccion': plantilla['requisitos']['proyeccion'] if plantilla else {'proyector': 'Barco SP4K-15 (láser)', 'resolucion': '4K'},
        'audio': plantilla['requisitos']['audio'] if plantilla else {'sistema': 'Dolby Digital 7.1', 'canales': 8}
    }
    if formato == '3D':
        requisitos['gafas_3d'] = {'tipo': 'pasivas', 'unidades': funcion['capacidad']}
    if formato == 'DOLBY_ATMOS':
        requisitos['dolby_atmos'] = {'parlantes': 64, 'calibrado': True}
    if funcion['idioma'] == 'SUBTITULADA':
        requisitos['subtitulado'] = {'idioma': 'es-CO', 'formato_archivo': 'SMPTE-TT (XML)', 'sincronia_verificada': False}
    return {
        'id_funcion': funcion['id_funcion'],
        'id_sala': funcion['id_sala'],
        'id_contrato': funcion['id_contrato'],
        'codigo_pelicula': codigo_pelicula,
        'fecha_hora': inicio,
        'formato': formato,
        'idioma': funcion['idioma'],
        'requisitos': requisitos,
        'dcp': {'kdm_valida_desde': inicio - timedelta(days=2), 'kdm_valida_hasta': inicio + timedelta(days=1), 'tamano_gb': 150.0},
        'checklist': [
            {'item': 'Ingestar DCP y validar hash', 'id_staff': 8, 'completado': True, 'fecha': inicio - timedelta(days=1)},
            {'item': 'Verificar KDM vigente', 'id_staff': 8, 'completado': True, 'fecha': inicio - timedelta(days=1)},
            {'item': 'Prueba de imagen y foco', 'id_staff': 9, 'completado': False, 'fecha': None},
            {'item': 'Prueba de sonido en sala', 'id_staff': 9, 'completado': False, 'fecha': None}
        ],
        'estado_preparacion': 'PENDIENTE',
        'observaciones': 'Función programada para la sustentación de la entrega final'
    }


def registrar_requisitos(conexion, hoy):
    funciones = conexion.execute("""
        SELECT f.id_funcion, f.id_sala, f.id_contrato, f.fecha_hora, f.idioma, s.tipo_sala, s.capacidad
        FROM funciones f JOIN salas s ON s.id_sala = f.id_sala
        WHERE f.estado = 'PROGRAMADA' AND f.fecha_hora >= %s
    """, (hoy,)).fetchall()
    creados = 0
    for funcion in funciones:
        if mongo.requisitos_proyeccion.count_documents({'id_funcion': funcion['id_funcion']}):
            continue
        ficha = mongo.fichas_tecnicas_peliculas.find_one({'id_contrato': funcion['id_contrato']}, {'codigo_pelicula': 1})
        plantilla = mongo.requisitos_proyeccion.find_one({'id_contrato': funcion['id_contrato']})
        codigo = ficha['codigo_pelicula'] if ficha else 'PA-PEL-{:03d}'.format(funcion['id_contrato'])
        mongo.requisitos_proyeccion.insert_one(documento_requisito(funcion, codigo, plantilla))
        creados += 1
    return creados


def principal():
    sys.stdout.reconfigure(encoding='utf-8')
    preparar_mongo()
    hoy = date.today()
    with conectar_postgres() as conexion:
        funciones = programar_funciones(conexion, hoy)
        requisitos = registrar_requisitos(conexion, hoy)
    print('Colección comprobantes_venta e índices listos en MongoDB')
    print('Funciones nuevas en PostgreSQL: {}'.format(funciones or 'ninguna, ya existían'))
    print('Requisitos técnicos nuevos en MongoDB: {}'.format(requisitos))


if __name__ == '__main__':
    principal()
