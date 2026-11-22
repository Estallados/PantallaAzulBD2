import os
from datetime import date, datetime, timedelta, timezone
from decimal import Decimal
from pathlib import Path

import psycopg
from bson import Decimal128, ObjectId
from dotenv import load_dotenv
from psycopg.rows import dict_row
from pymongo import ASCENDING, MongoClient

load_dotenv(Path(__file__).resolve().parents[2] / '.env')

POSTGRES_URL = os.getenv('POSTGRES_URL', 'postgresql://postgres:postgres@localhost:5432/pantalla_azul')
MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
MONGO_BD = os.getenv('MONGO_BD', 'pantalla_azul')

BOGOTA = timezone(timedelta(hours=-5), 'America/Bogota')

cliente_mongo = MongoClient(MONGO_URL, serverSelectionTimeoutMS=4000, tz_aware=True, tzinfo=BOGOTA)
mongo = cliente_mongo[MONGO_BD]


class ErrorIntegracion(Exception):
    def __init__(self, mensaje, estado=400, motor=None, campos=None):
        super().__init__(mensaje)
        self.mensaje = mensaje
        self.estado = estado
        self.motor = motor
        self.campos = campos or {}

    def respuesta(self):
        cuerpo = {'mensaje': self.mensaje}
        if self.motor:
            cuerpo['motor'] = self.motor
        if self.campos:
            cuerpo['campos'] = self.campos
        return cuerpo


def conectar_postgres():
    conexion = psycopg.connect(POSTGRES_URL, row_factory=dict_row, connect_timeout=5)
    conexion.execute("SET TIME ZONE 'America/Bogota'")
    conexion.commit()
    return conexion


def en_bogota(valor):
    if valor.tzinfo is None:
        return valor.replace(tzinfo=BOGOTA)
    return valor.astimezone(BOGOTA)


def inicio_dia(dia):
    return datetime(dia.year, dia.month, dia.day, tzinfo=BOGOTA)


def limpiar(valor):
    if isinstance(valor, dict):
        return {clave: limpiar(dato) for clave, dato in valor.items() if clave != '_id'}
    if isinstance(valor, list):
        return [limpiar(dato) for dato in valor]
    if isinstance(valor, Decimal128):
        return float(valor.to_decimal())
    if isinstance(valor, Decimal):
        return float(valor)
    if isinstance(valor, ObjectId):
        return str(valor)
    if isinstance(valor, datetime):
        return en_bogota(valor).isoformat()
    if isinstance(valor, date):
        return valor.isoformat()
    return valor


ESQUEMA_COMPROBANTE = {
    '$jsonSchema': {
        'bsonType': 'object',
        'title': 'Comprobante de venta generado desde PostgreSQL',
        'required': ['codigo_comprobante', 'id_venta', 'id_funcion', 'id_espectador', 'id_contrato',
                     'titulo', 'sala', 'fecha_funcion', 'cantidad', 'valor_unitario', 'total',
                     'canal', 'estado', 'generado_en', 'historial'],
        'properties': {
            'codigo_comprobante': {'bsonType': 'string', 'pattern': '^PA-V-[0-9]{6}$'},
            'id_venta': {'bsonType': 'int', 'minimum': 1},
            'id_funcion': {'bsonType': 'int', 'minimum': 1},
            'id_espectador': {'bsonType': 'int', 'minimum': 1},
            'id_contrato': {'bsonType': 'int', 'minimum': 1},
            'id_staff': {'bsonType': ['int', 'null']},
            'codigo_pelicula': {'bsonType': ['string', 'null']},
            'titulo': {'bsonType': 'string', 'minLength': 1},
            'sala': {'bsonType': 'object', 'required': ['id_sala', 'nombre', 'tipo_sala']},
            'fecha_funcion': {'bsonType': 'date'},
            'cantidad': {'bsonType': 'int', 'minimum': 1, 'maximum': 10},
            'tipo_boleta': {'bsonType': 'string'},
            'valor_unitario': {'bsonType': 'decimal'},
            'total': {'bsonType': 'decimal'},
            'canal': {'enum': ['TAQUILLA', 'WEB', 'APP']},
            'estado': {'enum': ['PAGADA', 'ANULADA']},
            'generado_en': {'bsonType': 'date'},
            'historial': {
                'bsonType': 'array', 'minItems': 1,
                'items': {
                    'bsonType': 'object',
                    'required': ['fecha', 'evento'],
                    'properties': {
                        'fecha': {'bsonType': 'date'},
                        'evento': {'enum': ['VENTA_REGISTRADA', 'VENTA_ANULADA']},
                        'detalle': {'bsonType': 'string'}
                    }
                }
            }
        }
    }
}


def preparar_mongo():
    if 'comprobantes_venta' not in mongo.list_collection_names():
        mongo.create_collection('comprobantes_venta', validator=ESQUEMA_COMPROBANTE)
    else:
        mongo.command('collMod', 'comprobantes_venta', validator=ESQUEMA_COMPROBANTE)
    mongo.comprobantes_venta.create_index([('id_venta', ASCENDING)], unique=True, name='uq_comprobante_venta')
    mongo.reportes_incidentes.create_index([('codigo_incidente', ASCENDING)], unique=True, name='uq_codigo_incidente')
    mongo.resenas_peliculas.create_index([('id_contrato', ASCENDING), ('fecha', -1)], name='idx_resena_contrato_fecha')
    mongo.requisitos_proyeccion.create_index([('id_funcion', ASCENDING)], name='idx_requisito_funcion')
    mongo.reportes_incidentes.create_index([('id_sala', ASCENDING), ('fecha_reporte', -1)], name='idx_incidente_sala_fecha')


def estado_motores():
    estado = {}
    try:
        with conectar_postgres() as conexion:
            fila = conexion.execute('SELECT version() AS version, current_database() AS base').fetchone()
        estado['postgresql'] = {'conectado': True, 'base': fila['base'], 'version': fila['version'].split(',')[0]}
    except psycopg.Error as error:
        estado['postgresql'] = {'conectado': False, 'mensaje': str(error).strip()}
    try:
        version = cliente_mongo.server_info()['version']
        estado['mongodb'] = {'conectado': True, 'base': MONGO_BD, 'version': 'MongoDB {}'.format(version)}
    except Exception as error:
        estado['mongodb'] = {'conectado': False, 'mensaje': str(error).split(',')[0]}
    return estado
