import argparse
import json
import sys
from datetime import date

from casos_uso import funcion_con_resenas, historial_espectador, pelicula_con_requisitos, ventas_con_incidentes
from conexion import ErrorIntegracion, estado_motores, preparar_mongo
from transaccion import anular_venta, registrar_venta


def mostrar(titulo, datos):
    print('\n' + '=' * 78)
    print(titulo)
    print('=' * 78)
    print(json.dumps(datos, ensure_ascii=False, indent=2, default=str))


def ejecutar(titulo, accion, *argumentos, **opciones):
    try:
        mostrar(titulo, accion(*argumentos, **opciones))
        return True
    except ErrorIntegracion as error:
        mostrar(titulo + ' (error {})'.format(error.estado), error.respuesta())
        return False


def construir_argumentos():
    analizador = argparse.ArgumentParser(description='Integración PostgreSQL + MongoDB de Pantalla Azul')
    sub = analizador.add_subparsers(dest='comando')
    sub.add_parser('estado')
    sub.add_parser('demo')
    sub.add_parser('funcion').add_argument('id_funcion', type=int)
    sub.add_parser('pelicula').add_argument('id_contrato', type=int)
    sub.add_parser('espectador').add_argument('id_espectador', type=int)
    cruce = sub.add_parser('cruce')
    cruce.add_argument('--desde', type=date.fromisoformat)
    cruce.add_argument('--hasta', type=date.fromisoformat)
    venta = sub.add_parser('vender')
    venta.add_argument('id_espectador', type=int)
    venta.add_argument('id_funcion', type=int)
    venta.add_argument('id_tipo_boleta', type=int)
    venta.add_argument('cantidad', type=int)
    venta.add_argument('--canal', default='WEB', choices=['WEB', 'TAQUILLA'])
    venta.add_argument('--staff', type=int)
    venta.add_argument('--simular-falla-mongo', action='store_true')
    anulacion = sub.add_parser('anular')
    anulacion.add_argument('id_venta', type=int)
    anulacion.add_argument('motivo')
    anulacion.add_argument('--staff', type=int)
    return analizador


def demo():
    mostrar('Estado de los motores', estado_motores())
    ejecutar('Caso 1: función con sus reseñas', funcion_con_resenas, 1)
    ejecutar('Caso 2: película con sus requisitos técnicos', pelicula_con_requisitos, 1)
    ejecutar('Caso 3: cruce de ventas con incidentes por sala', ventas_con_incidentes)
    ejecutar('Caso 4: historial del espectador', historial_espectador, 22)
    ejecutar('Error controlado: función inexistente', funcion_con_resenas, 99999)
    ejecutar('Error controlado: venta en función finalizada', registrar_venta,
             {'id_espectador': 1, 'id_funcion': 1, 'id_tipo_boleta': 1, 'cantidad': 1, 'canal': 'WEB'})


def principal():
    argumentos = construir_argumentos().parse_args()
    preparar_mongo()
    comando = argumentos.comando or 'demo'
    if comando == 'demo':
        demo()
        return True
    if comando == 'estado':
        mostrar('Estado de los motores', estado_motores())
        return True
    if comando == 'funcion':
        return ejecutar('Función con sus reseñas', funcion_con_resenas, argumentos.id_funcion)
    if comando == 'pelicula':
        return ejecutar('Película con sus requisitos técnicos', pelicula_con_requisitos, argumentos.id_contrato)
    if comando == 'espectador':
        return ejecutar('Historial del espectador', historial_espectador, argumentos.id_espectador)
    if comando == 'cruce':
        return ejecutar('Cruce de ventas con incidentes por sala', ventas_con_incidentes, argumentos.desde, argumentos.hasta)
    if comando == 'vender':
        return ejecutar('Transacción cruzada: registrar venta', registrar_venta, {
            'id_espectador': argumentos.id_espectador, 'id_funcion': argumentos.id_funcion,
            'id_tipo_boleta': argumentos.id_tipo_boleta, 'cantidad': argumentos.cantidad,
            'canal': argumentos.canal, 'id_staff': argumentos.staff,
            'simular_falla_mongo': argumentos.simular_falla_mongo
        })
    return ejecutar('Transacción cruzada: anular venta', anular_venta, argumentos.id_venta, argumentos.motivo, argumentos.staff)


if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    sys.exit(0 if principal() else 1)
