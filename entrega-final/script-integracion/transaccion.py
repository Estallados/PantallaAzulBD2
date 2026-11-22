import re
from datetime import datetime
from decimal import Decimal

import psycopg
from bson import Decimal128
from pymongo.errors import DuplicateKeyError, PyMongoError

from conexion import BOGOTA, ErrorIntegracion, conectar_postgres, en_bogota, limpiar, mongo

CANALES = ('TAQUILLA', 'WEB')
PREFIJOS = ('Ocurrio un error al realizar la venta: ', 'Ocurrio un error al anular la venta: ')


def ahora():
    return datetime.now(BOGOTA)


def dinero(valor):
    return Decimal128(Decimal(valor).quantize(Decimal('0.01')))


def mensaje_aviso(avisos, defecto):
    for aviso in avisos:
        for prefijo in PREFIJOS:
            if aviso.startswith(prefijo):
                return aviso[len(prefijo):]
    return defecto


def estado_por_mensaje(mensaje):
    if 'no existe' in mensaje:
        return 404
    return 409


def deshacer_mongo(operacion, descripcion):
    try:
        operacion()
        return None
    except PyMongoError as error:
        return 'No se pudo revertir {} en MongoDB: {}'.format(descripcion, error)


def validar_venta(datos):
    errores = {}
    for campo in ('id_espectador', 'id_funcion', 'id_tipo_boleta', 'cantidad'):
        valor = datos.get(campo)
        if not isinstance(valor, int) or isinstance(valor, bool) or valor < 1:
            errores[campo] = 'Debe ser un número entero mayor que cero'
    if isinstance(datos.get('cantidad'), int) and not 1 <= datos['cantidad'] <= 10:
        errores['cantidad'] = 'La cantidad debe estar entre 1 y 10'
    if datos.get('canal') not in CANALES:
        errores['canal'] = 'El canal debe ser TAQUILLA o WEB'
    if datos.get('canal') == 'TAQUILLA' and not datos.get('id_staff'):
        errores['id_staff'] = 'Una venta por taquilla debe indicar el taquillero'
    if errores:
        raise ErrorIntegracion('Revisa los datos de la venta', 422, campos=errores)


def registrar_venta(datos):
    validar_venta(datos)
    id_staff = datos.get('id_staff') if datos['canal'] == 'TAQUILLA' else None
    avisos = []
    conexion = conectar_postgres()
    conexion.add_notice_handler(lambda aviso: avisos.append(aviso.message_primary))
    try:
        fila = conexion.execute(
            'CALL vender_boletas(%s, %s, %s, %s, %s, NULL, %s)',
            (datos['id_espectador'], datos['id_funcion'], datos['id_tipo_boleta'], datos['cantidad'], datos['canal'], id_staff)
        ).fetchone()
        id_venta = fila['p_id_venta'] if fila else None
        if id_venta is None:
            conexion.rollback()
            mensaje = mensaje_aviso(avisos, 'PostgreSQL rechazó la venta')
            raise ErrorIntegracion(mensaje, estado_por_mensaje(mensaje), 'postgresql')

        venta = conexion.execute("""
            SELECT v.id_venta, v.id_funcion, v.id_espectador, v.id_staff, v.cantidad, v.valor_unitario, v.total,
                   v.canal, v.estado, v.fecha_venta, tb.nombre AS tipo_boleta,
                   f.fecha_hora, c.id_contrato, c.titulo_obra, s.id_sala, s.nombre AS sala, s.tipo_sala
            FROM ventas v
            JOIN tipos_boleta tb ON tb.id_tipo_boleta = v.id_tipo_boleta
            JOIN funciones f ON f.id_funcion = v.id_funcion
            JOIN contratos c ON c.id_contrato = f.id_contrato
            JOIN salas s ON s.id_sala = f.id_sala
            WHERE v.id_venta = %s
        """, (id_venta,)).fetchone()
        ficha = mongo.fichas_tecnicas_peliculas.find_one({'id_contrato': venta['id_contrato']}, {'codigo_pelicula': 1})
        momento = ahora()
        comprobante = {
            'codigo_comprobante': 'PA-V-{:06d}'.format(id_venta),
            'id_venta': id_venta,
            'id_funcion': venta['id_funcion'],
            'id_espectador': venta['id_espectador'],
            'id_contrato': venta['id_contrato'],
            'id_staff': venta['id_staff'],
            'codigo_pelicula': ficha['codigo_pelicula'] if ficha else None,
            'titulo': venta['titulo_obra'],
            'sala': {'id_sala': venta['id_sala'], 'nombre': venta['sala'], 'tipo_sala': venta['tipo_sala']},
            'fecha_funcion': en_bogota(venta['fecha_hora']),
            'cantidad': venta['cantidad'],
            'tipo_boleta': venta['tipo_boleta'],
            'valor_unitario': dinero(venta['valor_unitario']),
            'total': dinero(venta['total']),
            'canal': venta['canal'],
            'estado': 'PAGADA',
            'generado_en': momento,
            'historial': [{'fecha': momento, 'evento': 'VENTA_REGISTRADA', 'detalle': avisos[-1] if avisos else 'Venta registrada'}]
        }
        if datos.get('simular_falla_mongo'):
            comprobante['total'] = 'invalido'
        try:
            mongo.comprobantes_venta.insert_one(comprobante)
        except PyMongoError as error:
            conexion.rollback()
            raise ErrorIntegracion(
                'MongoDB rechazó el comprobante ({}); la venta {} se revirtió en PostgreSQL'.format(type(error).__name__, id_venta),
                503 if not isinstance(error, DuplicateKeyError) else 409, 'mongodb')
        try:
            conexion.commit()
        except psycopg.Error as error:
            falla = deshacer_mongo(lambda: mongo.comprobantes_venta.delete_one({'id_venta': id_venta}), 'el comprobante')
            raise ErrorIntegracion('PostgreSQL no confirmó la venta: {}{}'.format(error, '. ' + falla if falla else ''), 503, 'postgresql')
    except psycopg.Error as error:
        conexion.rollback()
        raise ErrorIntegracion('Error en PostgreSQL: {}'.format(str(error).strip()), 409, 'postgresql')
    finally:
        conexion.close()

    return limpiar({
        'mensaje': 'Venta {} registrada en PostgreSQL y comprobante {} generado en MongoDB'.format(id_venta, comprobante['codigo_comprobante']),
        'postgresql': {'tabla': 'ventas', 'venta': venta},
        'mongodb': {'coleccion': 'comprobantes_venta', 'comprobante': comprobante}
    })


def siguiente_codigo_incidente():
    anio = ahora().year
    ultimo = mongo.reportes_incidentes.find_one(
        {'codigo_incidente': {'$regex': '^INC-{}-'.format(anio)}},
        {'codigo_incidente': 1}, sort=[('codigo_incidente', -1)]
    )
    numero = int(ultimo['codigo_incidente'].split('-')[-1]) + 1 if ultimo else 1
    return 'INC-{}-{:04d}'.format(anio, numero)


def anular_venta(id_venta, motivo, id_staff=None):
    motivo = (motivo or '').strip()
    if not isinstance(id_venta, int) or id_venta < 1:
        raise ErrorIntegracion('El identificador de la venta debe ser un entero positivo', 422)
    if len(motivo) < 10:
        raise ErrorIntegracion('Escribe un motivo de al menos 10 caracteres', 422)
    if len(motivo) > 150:
        raise ErrorIntegracion('El motivo no puede superar 150 caracteres', 422)

    avisos = []
    conexion = conectar_postgres()
    conexion.add_notice_handler(lambda aviso: avisos.append(aviso.message_primary))
    codigo = None
    comprobante_previo = None
    try:
        venta = conexion.execute("""
            SELECT v.id_venta, v.id_espectador, v.id_funcion, v.canal, v.estado, v.total, v.id_staff,
                   f.fecha_hora, f.id_sala, f.fecha_hora > NOW() AS antes_de_funcion
            FROM ventas v JOIN funciones f ON f.id_funcion = v.id_funcion
            WHERE v.id_venta = %s
        """, (id_venta,)).fetchone()
        if venta is None:
            raise ErrorIntegracion('La venta {} no existe en PostgreSQL'.format(id_venta), 404, 'postgresql')
        if venta['estado'] != 'PAGADA':
            raise ErrorIntegracion('La venta {} está en estado {} y no se puede anular'.format(id_venta, venta['estado']), 409, 'postgresql')
        if id_staff is not None and conexion.execute('SELECT 1 FROM staff WHERE id_staff = %s AND activo', (id_staff,)).fetchone() is None:
            raise ErrorIntegracion('El empleado {} no existe o está inactivo'.format(id_staff), 404, 'postgresql')

        conexion.execute('CALL anular_venta(%s, %s)', (id_venta, motivo))
        estado = conexion.execute('SELECT estado FROM ventas WHERE id_venta = %s', (id_venta,)).fetchone()['estado']
        if estado != 'ANULADA':
            conexion.rollback()
            mensaje = mensaje_aviso(avisos, 'PostgreSQL no anuló la venta {}'.format(id_venta))
            raise ErrorIntegracion(mensaje, estado_por_mensaje(mensaje), 'postgresql')

        devolver = venta['total'] if venta['antes_de_funcion'] else (venta['total'] * Decimal('0.80')).quantize(Decimal('0.01'))
        momento = ahora()
        incidente = {
            'tipo': 'QUEJA_SERVICIO',
            'fecha_reporte': momento,
            'id_sala': venta['id_sala'],
            'id_funcion': venta['id_funcion'],
            'reportado_por': {'rol': 'STAFF', 'id_staff': id_staff} if id_staff else {'rol': 'ESPECTADOR', 'id_espectador': venta['id_espectador']},
            'severidad': 'BAJA',
            'estado': 'RESUELTO',
            'descripcion': 'Anulación de la venta {}: {}'.format(id_venta, motivo),
            'detalle': {
                'area': venta['canal'],
                'id_venta': id_venta,
                'motivo': motivo,
                'compensacion': {
                    'tipo': 'REEMBOLSO_TOTAL' if venta['antes_de_funcion'] else 'REEMBOLSO_PARCIAL',
                    'valor': dinero(devolver),
                    'porcentaje': 100 if venta['antes_de_funcion'] else 80
                }
            },
            'seguimiento': [{'fecha': momento, 'id_staff': id_staff, 'accion': 'Venta anulada en PostgreSQL y reembolso registrado'}],
            'fecha_cierre': None
        }
        comprobante_previo = mongo.comprobantes_venta.find_one({'id_venta': id_venta}, {'estado': 1, 'historial': 1})
        try:
            for _ in range(3):
                incidente['codigo_incidente'] = siguiente_codigo_incidente()
                try:
                    mongo.reportes_incidentes.insert_one(incidente)
                    codigo = incidente['codigo_incidente']
                    break
                except DuplicateKeyError:
                    incidente.pop('_id', None)
            if codigo is None:
                raise ErrorIntegracion('No se pudo generar un código de incidente único', 409, 'mongodb')
            if comprobante_previo:
                mongo.comprobantes_venta.update_one({'id_venta': id_venta}, {
                    '$set': {'estado': 'ANULADA'},
                    '$push': {'historial': {'fecha': momento, 'evento': 'VENTA_ANULADA', 'detalle': '{} ({})'.format(motivo, codigo)}}
                })
        except PyMongoError as error:
            conexion.rollback()
            if codigo:
                deshacer_mongo(lambda: mongo.reportes_incidentes.delete_one({'codigo_incidente': codigo}), 'el incidente')
            raise ErrorIntegracion('MongoDB falló ({}); la anulación se revirtió en PostgreSQL'.format(type(error).__name__), 503, 'mongodb')
        except ErrorIntegracion:
            conexion.rollback()
            raise
        try:
            conexion.commit()
        except psycopg.Error as error:
            deshacer_mongo(lambda: mongo.reportes_incidentes.delete_one({'codigo_incidente': codigo}), 'el incidente')
            if comprobante_previo:
                deshacer_mongo(lambda: mongo.comprobantes_venta.update_one({'id_venta': id_venta}, {
                    '$set': {'estado': comprobante_previo['estado'], 'historial': comprobante_previo['historial']}}), 'el comprobante')
            raise ErrorIntegracion('PostgreSQL no confirmó la anulación: {}'.format(error), 503, 'postgresql')
    except psycopg.Error as error:
        conexion.rollback()
        raise ErrorIntegracion('Error en PostgreSQL: {}'.format(str(error).strip()), 409, 'postgresql')
    finally:
        conexion.close()

    return limpiar({
        'mensaje': 'Venta {} anulada en PostgreSQL e incidente {} registrado en MongoDB'.format(id_venta, codigo),
        'postgresql': {'tabla': 'ventas', 'id_venta': id_venta, 'estado': 'ANULADA', 'valor_devuelto': devolver},
        'mongodb': {
            'reportes_incidentes': mongo.reportes_incidentes.find_one({'codigo_incidente': codigo}),
            'comprobante_actualizado': comprobante_previo is not None
        }
    })
