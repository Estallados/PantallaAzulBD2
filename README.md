# Pantalla Azul · Base de Datos II

Grupo **Estallados**. Pantalla Azul es una cadena de cine independiente de Bogotá con seis salas (2D, 3D, Premium y de autor) que programa cine latinoamericano y de autor. La parte transaccional (contratos, funciones, ventas, personal) vive en PostgreSQL y la parte documental (fichas técnicas, requisitos de proyección, reseñas, incidentes y comprobantes) vive en MongoDB.

## Integrantes

| GitHub | Integrante |
|---|---|
| Camilooop7 | Camilo Peláez Perez |
| Vivas11 | Luis Camilo Vivas Cruz |
| HatosJeisson | Jeisson Herreño |
| kevx2705 | Kevin Tunjuelo |
| Sealpaca-16 | Sergio Pastran |

## Estructura

```
entrega-final/
├── script-integracion/        conexión simultánea, casos de uso y transacciones cruzadas (Python)
├── modulo-api/                API FastAPI + front (estatico/) + colección Postman
├── informe-final-consolidado.pdf
├── portafolio-individual/     reflexiones individuales ([nombre-estudiante]-reflexion.pdf)
├── postgresql/                DDL, datos de prueba, triggers, procedimientos y consultas
├── mongodb/                   colecciones con $jsonSchema, datos de prueba y consultas
├── diagramas/                 modelo ER, modelo relacional y arquitectura políglota
├── evidencias/                capturas de ejecución (postgresql/ y mongodb/)
└── requirements.txt           dependencias de Python
```

## Fase 1 · PostgreSQL

Ejecutar en orden sobre una base vacía (pgAdmin, psql o el editor SQL de Neon):

1. `entrega-final/postgresql/01_creacion_tablas.sql`
2. `entrega-final/postgresql/02_datos_prueba.sql`
3. `entrega-final/postgresql/03_triggers.sql`
4. `entrega-final/postgresql/04_procedimientos.sql`
5. `entrega-final/postgresql/05_consultas.sql`

## Fase 2 · MongoDB

Con `mongosh` o MongoDB Compass sobre la base `pantalla_azul`:

1. `entrega-final/mongodb/01_creacion_colecciones.js`
2. `entrega-final/mongodb/02_datos_prueba.js`
3. `entrega-final/mongodb/03_consultas.js`

## Fase 3 · Integración funcional

Requiere Python 3.12 o superior, PostgreSQL con la fase 1 cargada y MongoDB con la fase 2 cargada.

```powershell
python -m venv env
env\Scripts\activate
pip install -r entrega-final\requirements.txt
```

En la raíz del proyecto se crea un archivo `.env` con la cadena de conexión de PostgreSQL (`POSTGRES_URL`) y la de MongoDB (`MONGO_URL`, `MONGO_BD`).

```powershell
python entrega-final\script-integracion\preparar_demo.py
python entrega-final\script-integracion\integracion.py demo
uvicorn principal:app --app-dir entrega-final\modulo-api --port 8000
```

`preparar_demo.py` crea la colección `comprobantes_venta` con su `$jsonSchema`, los índices de integración y programa funciones futuras con sus requisitos técnicos para poder vender en la sustentación. Se puede ejecutar varias veces.

Con la API arriba: front en `http://localhost:8000`, documentación interactiva en `http://localhost:8000/docs` y colección Postman en `entrega-final/modulo-api/pantalla_azul.postman_collection.json`.

### Casos de uso

| Caso | Endpoint | PostgreSQL | MongoDB |
|---|---|---|---|
| Función con sus reseñas | `GET /api/funciones/{id}/resenas` | funciones, salas, contratos, ventas | fichas_tecnicas_peliculas, resenas_peliculas |
| Película con sus requisitos técnicos | `GET /api/peliculas/{id_contrato}/requisitos` | contratos, actores_directores, funciones, salas, staff | fichas_tecnicas_peliculas, requisitos_proyeccion |
| Ventas vs incidentes por sala | `GET /api/salas/ventas-incidentes?desde=&hasta=` | salas, funciones, ventas | reportes_incidentes (agregación) |
| Historial del espectador | `GET /api/espectadores/{id}/historial` | espectadores, ventas, funciones | resenas_peliculas, reportes_incidentes, comprobantes_venta |

### Transacciones cruzadas

| Evento | Endpoint | PostgreSQL | MongoDB |
|---|---|---|---|
| Venta de boletas | `POST /api/ventas` | `CALL vender_boletas(...)` | inserta el comprobante en `comprobantes_venta` |
| Anulación con reembolso | `POST /api/ventas/{id}/anulacion` | `CALL anular_venta(...)` | inserta el incidente con la compensación en `reportes_incidentes` y marca el comprobante como `ANULADA` |

Las dos operaciones siguen el mismo orden: se abre la transacción en PostgreSQL y se ejecuta el procedimiento sin confirmar, se escribe en MongoDB y solo si MongoDB acepta el documento se hace `COMMIT`. Si MongoDB falla se hace `ROLLBACK`; si el `COMMIT` falla se elimina lo escrito en MongoDB (compensación). El campo `simular_falla_mongo` permite demostrar el rollback en vivo.

### Manejo de errores

Todas las respuestas de error traen `{"mensaje": "..."}` y, cuando aplica, `motor` y `campos`:

| Código | Cuándo |
|---|---|
| 404 | función, contrato, espectador, venta o empleado inexistente |
| 409 | regla de negocio rechazada por PostgreSQL (función finalizada, sillas insuficientes, clasificación por edad, venta ya anulada) |
| 422 | datos inválidos (tipos, rangos, canal, motivo, periodo invertido) |
| 503 | PostgreSQL o MongoDB no disponible, o MongoDB rechazó el documento y se revirtió la operación |
