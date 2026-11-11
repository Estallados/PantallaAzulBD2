//Creción y uso de base de datos 
use("pantalla_azul");
//Creación de la colleccíon fichas_tecnicas_peliculas
db.createCollection("fichas_tecnicas_peliculas");
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