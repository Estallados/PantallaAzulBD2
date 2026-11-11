//Creción y uso de base de datos 
use("pantalla_azul");
//Creación de la colleccíon fichas_tecnicas_peliculas
db.fichas_tecnicas_peliculas.drop();
db.createCollection("fichas_tecnicas_peliculas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Ficha técnica de película",
      // Campos obligatorios (equivale a NOT NULL en PostgreSQL)
      required: ["codigo_pelicula", "id_contrato", "titulo", "anio_estreno", "generos",
                 "direccion", "elenco", "versiones", "idiomas", "subtitulos",
                 "clasificaciones", "estado_catalogo", "actualizado_en"],
      properties: {
        codigo_pelicula: { bsonType: "string", minLength: 1, description: "Código de la película, ej. PA-PEL-001" },
        id_contrato:     { bsonType: ["number", "null"], minimum: 1,
                           description: "REFERENCIA a contratos.id_contrato; null si la película está en evaluación" },
        titulo:          { bsonType: "string", minLength: 1 },
        titulo_original: { bsonType: "string", minLength: 1 },
        anio_estreno:    { bsonType: "number", minimum: 1895, maximum: 2030 },
        paises_origen:   { bsonType: "array", items: { bsonType: "string" } },
        generos:         { bsonType: "array", minItems: 1, items: { bsonType: "string" } },
        sinopsis:        { bsonType: "string" },
        direccion: {
          bsonType: "array", minItems: 1,
          items: {
            bsonType: "object",
            required: ["nombre"],
            properties: {
              id_artista: { bsonType: ["number", "null"], description: "REFERENCIA a actores_directores.id_artista" },
              nombre:     { bsonType: "string", minLength: 1 }
            }
          }
        },
        elenco: {
          bsonType: "array", minItems: 1,
          items: {
            bsonType: "object",
            required: ["nombre", "personaje", "orden"],
            properties: {
              id_artista: { bsonType: ["number", "null"], description: "REFERENCIA a actores_directores.id_artista" },
              nombre:     { bsonType: "string", minLength: 1 },
              personaje:  { bsonType: "string", minLength: 1 },
              orden:      { bsonType: "number", minimum: 1 }
            }
          }
        },
        versiones: {
          bsonType: "array", minItems: 1,
          items: {
            bsonType: "object",
            required: ["tipo", "duracion_min", "formatos"],
            properties: {
              tipo:         { enum: ["CINE", "DIRECTOR_CUT", "EXTENDIDA", "REMASTERIZADA_4K", "IMAX"] },
              duracion_min: { bsonType: "number", minimum: 40, maximum: 300 },
              formatos:     { bsonType: "array", minItems: 1, items: { enum: ["2D", "3D", "IMAX", "DOLBY_ATMOS", "35MM"] } }
            }
          }
        },
        idiomas: {
          bsonType: "object",
          required: ["original"],
          properties: {
            original: { bsonType: "array", minItems: 1, items: { bsonType: "string" } },
            doblajes: { bsonType: "array", items: { bsonType: "string" } }
          }
        },
        subtitulos: { bsonType: "array", items: { bsonType: "string" } },
        clasificaciones: {
          bsonType: "array", minItems: 1,
          items: {
            bsonType: "object",
            required: ["pais", "clasificacion"],
            properties: {
              pais:          { bsonType: "string", minLength: 2, maxLength: 2 },
              clasificacion: { bsonType: "string", minLength: 1 },
              entidad:       { bsonType: "string" }
            }
          }
        },
        premios:         { bsonType: "array" },
        // Valores permitidos (equivale a un CHECK ... IN (...))
        estado_catalogo: { enum: ["EN_CARTELERA", "CONTRATO_FINALIZADO", "CONTRATO_CANCELADO", "EN_EVALUACION"] },
        actualizado_en:  { bsonType: "date" }
      }
    }
  }
});
//Insertar datos en la colección fichas_tecnicas_peliculas
db.fichas_tecnicas_peliculas.insertOne({
  codigo_pelicula: "PA-PEL-001",
  id_contrato: 1,
  titulo: "Parasite",
  titulo_original: "Gisaengchung",
  anio_estreno: 2019,
  paises_origen: [ "KR" ],
  generos: [ "Suspenso", "Drama", "Comedia negra" ],
  sinopsis: "Una familia sin empleo se infiltra, uno a uno, en la casa de una familia adinerada de Seúl.",
  direccion: [ { id_artista: 1, nombre: "Bong Joon-ho" } ],
  elenco: [
    { id_artista: 29, nombre: "Song Kang-ho", personaje: "Kim Ki-taek", orden: 1 },
    { id_artista: 30, nombre: "Choi Woo-shik", personaje: "Kim Ki-woo", orden: 2 },
    { id_artista: null, nombre: "Park So-dam", personaje: "Kim Ki-jung", orden: 3 },
    { id_artista: null, nombre: "Lee Sun-kyun", personaje: "Park Dong-ik", orden: 4 },
    { id_artista: null, nombre: "Cho Yeo-jeong", personaje: "Choi Yeon-gyo", orden: 5 }
  ],
  versiones: [
    { tipo: "CINE", duracion_min: 132, formatos: [ "2D", "DOLBY_ATMOS" ] },
    { tipo: "REMASTERIZADA_4K", duracion_min: 132, formatos: [ "2D" ] }
  ],
  idiomas: { original: [ "ko" ], doblajes: [ "es-LA" ] },
  subtitulos: [ "es-CO", "en" ],
  clasificaciones: [
    { pais: "CO", clasificacion: "15+", entidad: "MinCultura" },
    { pais: "US", clasificacion: "R", entidad: "MPA" },
    { pais: "KR", clasificacion: "15", entidad: "KMRB" }
  ],
  estado_catalogo: "EN_CARTELERA",
  actualizado_en: ISODate("2026-09-02T10:00:00-05:00"),
  premios: [
    { premio: "Óscar", categoria: "Mejor película", anio: 2020 },
    { premio: "Palma de Oro", festival: "Cannes", anio: 2019 }
  ]
});

//Segunda Coleccion
// Borrar la colección si ya existe
db.requisitos_proyeccion.drop();
// Crear la colección nueva y vacía
db.createCollection("requisitos_proyeccion");

// Insertar un documento .
db.requisitos_proyeccion.insertOne({
  id_funcion: 1,
  id_sala: 1,
  id_contrato: 1,
  codigo_pelicula: "PA-PEL-001",
  fecha_hora: ISODate("2026-10-05T14:00:00-05:00"),
  formato: "2D",
  idioma: "SUBTITULADA",
  requisitos: {
    proyeccion: { proyector: "Barco SP4K-15 (láser)", resolucion: "4K", relacion_aspecto: "1.85:1", brillo_min_fl: 14 },
    audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 },
    subtitulado: {
      idioma: "es-CO",
      formato_archivo: "SMPTE-TT (XML)",
      tamano_fuente_pt: 42,
      posicion: "inferior",
      sincronia_verificada: true
    }
  },
  dcp: {
    kdm_valida_desde: ISODate("2026-10-03T14:00:00-05:00"),
    kdm_valida_hasta: ISODate("2026-10-06T14:00:00-05:00"),
    tamano_gb: 145.2
  },
  checklist: [
    { item: "Ingestar DCP y validar hash", id_staff: 8, completado: true, fecha: ISODate("2026-10-04T14:00:00-05:00") },
    { item: "Verificar KDM vigente", id_staff: 8, completado: true, fecha: ISODate("2026-10-04T15:00:00-05:00") },
    { item: "Prueba de imagen y foco", id_staff: 8, completado: true, fecha: ISODate("2026-10-04T16:00:00-05:00") },
    { item: "Prueba de sonido en sala", id_staff: 8, completado: true, fecha: ISODate("2026-10-04T17:00:00-05:00") },
    { item: "Verificar sincronía de subtítulos", id_staff: 8, completado: true, fecha: ISODate("2026-10-04T18:00:00-05:00") }
  ],
  estado_preparacion: "LISTA"
});

db.resenas_peliculas.drop();
db.createCollection("resenas_peliculas");

// Insertar un documento.
db.resenas_peliculas.insertOne({
  id_contrato: 1,
  codigo_pelicula: "PA-PEL-001",
  id_espectador: 22,
  id_venta: 1,
  autor_alias: "Johanna F.",
  calificacion: 5,
  titulo: "Obra maestra",
  texto: "La tensión entre las dos familias está construida con una precisión que asusta. El giro de la mitad me dejó sin aire.",
  fecha: ISODate("2026-10-05T17:00:00-05:00"),
  verificada: true,
  etiquetas: [ "fotografía", "actuaciones" ],
  respuesta_empresa: {
    id_staff: 12,
    texto: "¡Gracias por acompañarnos! Nos alegra que haya disfrutado la función. Lo esperamos en la próxima.",
    fecha: ISODate("2026-10-07T21:00:00-05:00")
  },
  estado_moderacion: "PUBLICADA"
});

db.resenas_peliculas.createIndex({ texto: "text", titulo: "text" }, { name: "txt_resena", default_language: "spanish" });



// NUmero 4.... .... collection reportes_incidentes


db.createCollection("reportes_incidentes");


db.reportes_incidentes.insertMany([
  {
    codigo_incidente: "INC-2026-0002",
    tipo: "FALLA_TECNICA",
    fecha_reporte: ISODate("2026-10-05T14:52:00-05:00"),
    id_sala: 1,
    id_funcion: 1,
    reportado_por: { rol: "STAFF", id_staff: 8 },
    severidad: "MEDIA",
    estado: "CERRADO",
    descripcion: "Pérdida de subtítulos durante 6 minutos en la función de Parasite.",
    detalle: {
      categoria: "PROYECCION",
      equipo: "Servidor de cine IMS3000 sala 1",
      codigo_error: "SUB-TT-404",
      minutos_interrupcion: 6,
      funcion_reprogramada: false
    },
    seguimiento: [
      { fecha: ISODate("2026-10-05T14:58:00-05:00"), id_staff: 8, accion: "Se recargó el archivo SMPTE-TT y se reanudó la función." },
      { fecha: ISODate("2026-10-06T09:00:00-05:00"), id_staff: 12, accion: "Caso cerrado; se agregó verificación de subtítulos al checklist." }
    ],
    fecha_cierre: ISODate("2026-10-06T09:00:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0001",
    tipo: "QUEJA_SERVICIO",
    fecha_reporte: ISODate("2026-10-02T12:50:00-05:00"),
    id_sala: null,
    id_funcion: 1,
    reportado_por: { rol: "ESPECTADOR", id_espectador: 22 },
    severidad: "BAJA",
    estado: "CERRADO",
    descripcion: "La taquilla aplicó tarifa general a un menor con boleta de niño.",
    detalle: {
      area: "TAQUILLA",
      canal_queja: "PRESENCIAL",
      id_venta: 1,
      id_staff_involucrado: 2,
      compensacion: { tipo: "NINGUNA", valor: 0 }
    },
    seguimiento: [
      { fecha: ISODate("2026-10-02T13:00:00-05:00"), id_staff: 2, accion: "Se verificó la venta; la tarifa estaba bien aplicada (factor 0,60)." }
    ],
    fecha_cierre: ISODate("2026-10-02T13:00:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0005",
    tipo: "SEGURIDAD",
    fecha_reporte: ISODate("2026-10-05T21:30:00-05:00"),
    id_sala: 5,
    id_funcion: 3,
    reportado_por: { rol: "STAFF", id_staff: 6 },
    severidad: "ALTA",
    estado: "CERRADO",
    descripcion: "Espectador con desmayo durante la función premium.",
    detalle: {
      categoria: "EMERGENCIA_MEDICA",
      personas_involucradas: 1,
      requirio_evacuacion: false,
      lesionados: 0,
      autoridades_notificadas: [ "Línea 123 - ambulancia" ]
    },
    seguimiento: [
      { fecha: ISODate("2026-10-05T21:32:00-05:00"), id_staff: 6, accion: "Primeros auxilios en sala." },
      { fecha: ISODate("2026-10-05T21:50:00-05:00"), id_staff: 12, accion: "Paramédicos atendieron; el espectador se retiró por sus propios medios." }
    ],
    fecha_cierre: ISODate("2026-10-05T22:00:00-05:00")
  }
]);