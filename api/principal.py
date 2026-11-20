import sys
from contextlib import asynccontextmanager
from datetime import date
from pathlib import Path

import psycopg
from fastapi import FastAPI, Path as Ruta, Query, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from pymongo.errors import ConnectionFailure, PyMongoError
from starlette.exceptions import HTTPException

CARPETA = Path(__file__).resolve().parent
sys.path.insert(0, str(CARPETA.parent / 'integracion'))

from casos_uso import cartelera, catalogos, funcion_con_resenas, historial_espectador, pelicula_con_requisitos, ventas_con_incidentes
from conexion import ErrorIntegracion, estado_motores, preparar_mongo
from transaccion import anular_venta, registrar_venta

MENSAJES = {
    'missing': 'Este campo es obligatorio',
    'int_parsing': 'Debe ser un número entero',
    'int_type': 'Debe ser un número entero',
    'greater_than_equal': 'Debe ser mayor o igual a {ge}',
    'less_than_equal': 'Debe ser menor o igual a {le}',
    'string_too_short': 'Debe tener al menos {min_length} caracteres',
    'string_too_long': 'No puede superar {max_length} caracteres',
    'literal_error': 'Valor no permitido; use {expected}',
    'date_from_datetime_parsing': 'Debe ser una fecha AAAA-MM-DD',
    'date_parsing': 'Debe ser una fecha AAAA-MM-DD',
    'json_invalid': 'El cuerpo no es un JSON válido',
    'model_attributes_type': 'El cuerpo debe ser un objeto JSON',
    'bool_parsing': 'Debe ser verdadero o falso'
}


@asynccontextmanager
async def ciclo_vida(aplicacion):
    try:
        preparar_mongo()
    except PyMongoError:
        pass
    yield


app = FastAPI(
    title='Pantalla Azul · Integración PostgreSQL + MongoDB',
    version='1.0.0',
    description='Módulo de exposición de la arquitectura políglota de Pantalla Azul. '
                'Cada endpoint consulta ambos motores o escribe en los dos dentro de la misma operación.',
    lifespan=ciclo_vida
)


class Venta(BaseModel):
    id_espectador: int = Field(ge=1, examples=[5])
    id_funcion: int = Field(ge=1, examples=[37])
    id_tipo_boleta: int = Field(ge=1, examples=[1])
    cantidad: int = Field(ge=1, le=10, examples=[2])
    canal: str = Field(pattern='^(TAQUILLA|WEB)$', examples=['WEB'])
    id_staff: int | None = Field(default=None, ge=1, examples=[None])
    simular_falla_mongo: bool = False


class Anulacion(BaseModel):
    motivo: str = Field(min_length=10, max_length=150, examples=['El espectador no puede asistir a la función'])
    id_staff: int | None = Field(default=None, ge=1)


def traducir(error):
    plantilla = MENSAJES.get(error['type'], error['msg'])
    if error['type'] == 'string_pattern_mismatch':
        plantilla = 'Valor no permitido'
    try:
        return plantilla.format(**error.get('ctx', {}))
    except (KeyError, IndexError):
        return plantilla


@app.exception_handler(RequestValidationError)
async def error_validacion(request: Request, error: RequestValidationError):
    campos = {}
    for detalle in error.errors():
        ubicacion = [str(parte) for parte in detalle['loc'] if parte not in ('body', 'query', 'path')]
        campos[ubicacion[-1] if ubicacion else 'cuerpo'] = traducir(detalle)
    return JSONResponse(status_code=422, content={'mensaje': 'Revisa los datos enviados', 'campos': campos})


@app.exception_handler(ErrorIntegracion)
async def error_integracion(request: Request, error: ErrorIntegracion):
    return JSONResponse(status_code=error.estado, content=error.respuesta())


@app.exception_handler(psycopg.OperationalError)
async def postgres_caido(request: Request, error: psycopg.OperationalError):
    return JSONResponse(status_code=503, content={'mensaje': 'PostgreSQL no está disponible', 'motor': 'postgresql'})


@app.exception_handler(ConnectionFailure)
async def mongo_caido(request: Request, error: ConnectionFailure):
    return JSONResponse(status_code=503, content={'mensaje': 'MongoDB no está disponible', 'motor': 'mongodb'})


@app.exception_handler(HTTPException)
async def error_http(request: Request, error: HTTPException):
    mensajes = {404: 'La ruta {} no existe'.format(request.url.path), 405: 'Método no permitido en esta ruta'}
    return JSONResponse(status_code=error.status_code, content={'mensaje': mensajes.get(error.status_code, str(error.detail))})


@app.exception_handler(Exception)
async def error_inesperado(request: Request, error: Exception):
    return JSONResponse(status_code=500, content={'mensaje': 'Error inesperado: {}'.format(type(error).__name__)})


@app.get('/api/estado', tags=['General'], summary='Estado de la conexión con ambos motores')
def estado():
    motores = estado_motores()
    activos = all(motor['conectado'] for motor in motores.values())
    return JSONResponse(status_code=200 if activos else 503, content=motores)


@app.get('/api/catalogos', tags=['General'], summary='Tipos de boleta, taquilleros, contratos y salas')
def obtener_catalogos():
    return catalogos()


@app.get('/api/cartelera', tags=['General'], summary='Funciones programadas a futuro con su ficha técnica')
def obtener_cartelera():
    return cartelera()


@app.get('/api/funciones/{id_funcion}/resenas', tags=['Casos de uso'], summary='Caso 1: función con sus reseñas')
def obtener_funcion_con_resenas(id_funcion: int = Ruta(ge=1)):
    return funcion_con_resenas(id_funcion)


@app.get('/api/peliculas/{id_contrato}/requisitos', tags=['Casos de uso'], summary='Caso 2: película con sus requisitos técnicos')
def obtener_pelicula_con_requisitos(id_contrato: int = Ruta(ge=1)):
    return pelicula_con_requisitos(id_contrato)


@app.get('/api/salas/ventas-incidentes', tags=['Casos de uso'], summary='Caso 3: cruce de ventas con incidentes por sala')
def obtener_ventas_con_incidentes(desde: date | None = Query(default=None), hasta: date | None = Query(default=None)):
    return ventas_con_incidentes(desde, hasta)


@app.get('/api/espectadores/{id_espectador}/historial', tags=['Casos de uso'], summary='Caso 4: historial del espectador')
def obtener_historial(id_espectador: int = Ruta(ge=1)):
    return historial_espectador(id_espectador)


@app.post('/api/ventas', status_code=201, tags=['Transacciones cruzadas'], summary='Registra la venta en PostgreSQL y su comprobante en MongoDB')
def crear_venta(venta: Venta):
    return registrar_venta(venta.model_dump())


@app.post('/api/ventas/{id_venta}/anulacion', tags=['Transacciones cruzadas'], summary='Anula la venta en PostgreSQL y registra el incidente con reembolso en MongoDB')
def crear_anulacion(anulacion: Anulacion, id_venta: int = Ruta(ge=1)):
    return anular_venta(id_venta, anulacion.motivo, anulacion.id_staff)


app.mount('/estatico', StaticFiles(directory=CARPETA / 'estatico'), name='estatico')


@app.get('/', include_in_schema=False)
def inicio():
    return FileResponse(CARPETA / 'estatico' / 'index.html')
