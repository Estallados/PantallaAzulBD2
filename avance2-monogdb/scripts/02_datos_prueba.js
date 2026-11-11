// =====================================================================
//  PANTALLA AZUL — AVANCE 2: CAPA DOCUMENTAL (MongoDB)
//  Script 02: datos de prueba (mínimo 30 documentos por colección)
// =====================================================================

use("pantalla_azul");


// =====================================================================
// 1. FICHAS_TECNICAS_PELICULAS (30 documentos)
// 14 películas con contrato en PostgreSQL (id_contrato 1 a 14) y 16 en evaluación (id_contrato null)
// =====================================================================
db.fichas_tecnicas_peliculas.deleteMany({});   // limpia la colección para poder ejecutar el script varias veces

db.fichas_tecnicas_peliculas.insertMany([
  {
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
  },
  {
    codigo_pelicula: "PA-PEL-002",
    id_contrato: 2,
    titulo: "Roma",
    titulo_original: "Roma",
    anio_estreno: 2018,
    paises_origen: [ "MX" ],
    generos: [ "Drama" ],
    sinopsis: "Cleo, trabajadora doméstica en la colonia Roma, acompaña a una familia de clase media en el México de 1970-1971.",
    direccion: [ { id_artista: 2, nombre: "Alfonso Cuarón" } ],
    elenco: [
      { id_artista: 28, nombre: "Yalitza Aparicio", personaje: "Cleo", orden: 1 },
      { id_artista: null, nombre: "Marina de Tavira", personaje: "Sofía", orden: 2 },
      { id_artista: null, nombre: "Jorge Antonio Guerrero", personaje: "Fermín", orden: 3 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 135, formatos: [ "2D", "DOLBY_ATMOS" ] } ],
    idiomas: { original: [ "es", "mix" ], doblajes: [ "es-LA" ] },
    subtitulos: [ "es-CO", "en" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "15+", entidad: "MinCultura" },
      { pais: "MX", clasificacion: "B15", entidad: "RTC" },
      { pais: "US", clasificacion: "R", entidad: "MPA" }
    ],
    estado_catalogo: "EN_CARTELERA",
    actualizado_en: ISODate("2026-09-03T10:00:00-05:00"),
    premios: [ { premio: "León de Oro", festival: "Venecia", anio: 2018 } ]
  },
  {
    codigo_pelicula: "PA-PEL-003",
    id_contrato: 3,
    titulo: "El laberinto del fauno",
    titulo_original: "El laberinto del fauno",
    anio_estreno: 2006,
    paises_origen: [ "MX", "ES" ],
    generos: [ "Fantasía", "Drama", "Bélico" ],
    sinopsis: "En la España de 1944, una niña escapa de la crueldad de su padrastro hacia un mundo fantástico custodiado por un fauno.",
    direccion: [ { id_artista: 3, nombre: "Guillermo del Toro" } ],
    elenco: [
      { id_artista: null, nombre: "Ivana Baquero", personaje: "Ofelia", orden: 1 },
      { id_artista: null, nombre: "Sergi López", personaje: "Capitán Vidal", orden: 2 },
      { id_artista: null, nombre: "Maribel Verdú", personaje: "Mercedes", orden: 3 },
      { id_artista: null, nombre: "Doug Jones", personaje: "El Fauno", orden: 4 }
    ],
    versiones: [
      { tipo: "CINE", duracion_min: 118, formatos: [ "2D", "3D" ] },
      { tipo: "REMASTERIZADA_4K", duracion_min: 118, formatos: [ "2D", "DOLBY_ATMOS" ] }
    ],
    idiomas: { original: [ "es" ] },
    subtitulos: [ "es-CO", "en", "fr" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "15+", entidad: "MinCultura" },
      { pais: "ES", clasificacion: "+16", entidad: "ICAA" },
      { pais: "US", clasificacion: "R", entidad: "MPA" }
    ],
    estado_catalogo: "EN_CARTELERA",
    actualizado_en: ISODate("2026-09-04T10:00:00-05:00")
  },
  {
    codigo_pelicula: "PA-PEL-004",
    id_contrato: 4,
    titulo: "Amores perros",
    titulo_original: "Amores perros",
    anio_estreno: 2000,
    paises_origen: [ "MX" ],
    generos: [ "Drama", "Suspenso" ],
    sinopsis: "Un accidente automovilístico en Ciudad de México enlaza tres historias sobre la lealtad, la pérdida y los perros.",
    direccion: [ { id_artista: 4, nombre: "Alejandro González Iñárritu" } ],
    elenco: [
      { id_artista: 13, nombre: "Gael García Bernal", personaje: "Octavio", orden: 1 },
      { id_artista: null, nombre: "Emilio Echevarría", personaje: "El Chivo", orden: 2 },
      { id_artista: null, nombre: "Goya Toledo", personaje: "Valeria", orden: 3 },
      { id_artista: null, nombre: "Vanessa Bauche", personaje: "Susana", orden: 4 }
    ],
    versiones: [
      { tipo: "CINE", duracion_min: 154, formatos: [ "2D", "3D", "DOLBY_ATMOS" ] },
      { tipo: "IMAX", duracion_min: 154, formatos: [ "IMAX" ] }
    ],
    idiomas: { original: [ "es" ] },
    subtitulos: [ "es-CO", "en" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "18+", entidad: "MinCultura" },
      { pais: "MX", clasificacion: "C", entidad: "RTC" }
    ],
    estado_catalogo: "EN_CARTELERA",
    actualizado_en: ISODate("2026-09-05T10:00:00-05:00"),
    premios: [ { premio: "Semana de la Crítica", festival: "Cannes", anio: 2000 } ],
    evento_asociado: { tipo: "CONVERSATORIO", invitado_id_artista: 4 }
  },
  {
    codigo_pelicula: "PA-PEL-005",
    id_contrato: 5,
    titulo: "El abrazo de la serpiente",
    titulo_original: "El abrazo de la serpiente",
    anio_estreno: 2015,
    paises_origen: [ "CO", "VE", "AR" ],
    generos: [ "Drama", "Aventura" ],
    sinopsis: "Karamakate, chamán amazónico, guía en dos épocas distintas a dos científicos en busca de la planta sagrada yakruna.",
    direccion: [ { id_artista: 5, nombre: "Ciro Guerra" } ],
    elenco: [
      { id_artista: null, nombre: "Nilbio Torres", personaje: "Karamakate joven", orden: 1 },
      { id_artista: null, nombre: "Antonio Bolívar", personaje: "Karamakate anciano", orden: 2 },
      { id_artista: null, nombre: "Jan Bijvoet", personaje: "Theodor", orden: 3 },
      { id_artista: null, nombre: "Brionne Davis", personaje: "Evan", orden: 4 }
    ],
    versiones: [
      { tipo: "CINE", duracion_min: 125, formatos: [ "2D", "3D" ] },
      { tipo: "REMASTERIZADA_4K", duracion_min: 125, formatos: [ "2D", "35MM" ] }
    ],
    idiomas: { original: [ "es", "cubeo", "de", "pt" ], doblajes: [ "es-LA" ] },
    subtitulos: [ "es-CO", "en" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "12+", entidad: "MinCultura" },
      { pais: "US", clasificacion: "NR", entidad: "—" }
    ],
    estado_catalogo: "EN_CARTELERA",
    actualizado_en: ISODate("2026-09-06T10:00:00-05:00"),
    premios: [ { premio: "Art Cinema Award", festival: "Cannes", anio: 2015 } ]
  },
  {
    codigo_pelicula: "PA-PEL-006",
    id_contrato: 6,
    titulo: "La ciénaga",
    titulo_original: "La ciénaga",
    anio_estreno: 2001,
    paises_origen: [ "AR", "ES", "FR" ],
    generos: [ "Drama" ],
    sinopsis: "Durante un verano sofocante en Salta, dos familias conviven en una finca decadente donde la tragedia acecha.",
    direccion: [ { id_artista: 6, nombre: "Lucrecia Martel" } ],
    elenco: [
      { id_artista: null, nombre: "Graciela Borges", personaje: "Mecha", orden: 1 },
      { id_artista: null, nombre: "Mercedes Morán", personaje: "Tali", orden: 2 },
      { id_artista: null, nombre: "Martín Adjemián", personaje: "Gregorio", orden: 3 }
    ],
    versiones: [
      { tipo: "CINE", duracion_min: 103, formatos: [ "2D", "3D", "35MM" ] },
      { tipo: "IMAX", duracion_min: 103, formatos: [ "IMAX" ] }
    ],
    idiomas: { original: [ "es" ] },
    subtitulos: [ "es-CO", "en", "fr" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "15+", entidad: "MinCultura" },
      { pais: "AR", clasificacion: "SAM 13", entidad: "INCAA" }
    ],
    estado_catalogo: "EN_CARTELERA",
    actualizado_en: ISODate("2026-09-07T10:00:00-05:00")
  },
  {
    codigo_pelicula: "PA-PEL-007",
    id_contrato: 7,
    titulo: "Todo sobre mi madre",
    titulo_original: "Todo sobre mi madre",
    anio_estreno: 1999,
    paises_origen: [ "ES", "FR" ],
    generos: [ "Drama" ],
    sinopsis: "Tras la muerte de su hijo, Manuela viaja a Barcelona en busca del padre del muchacho.",
    direccion: [ { id_artista: 7, nombre: "Pedro Almodóvar" } ],
    elenco: [
      { id_artista: null, nombre: "Cecilia Roth", personaje: "Manuela", orden: 1 },
      { id_artista: null, nombre: "Marisa Paredes", personaje: "Huma Rojo", orden: 2 },
      { id_artista: 16, nombre: "Penélope Cruz", personaje: "Hermana Rosa", orden: 3 },
      { id_artista: null, nombre: "Antonia San Juan", personaje: "Agrado", orden: 4 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 101, formatos: [ "2D", "3D", "DOLBY_ATMOS" ] } ],
    idiomas: { original: [ "es" ] },
    subtitulos: [ "es-CO", "en" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "15+", entidad: "MinCultura" },
      { pais: "ES", clasificacion: "+13", entidad: "ICAA" },
      { pais: "US", clasificacion: "R", entidad: "MPA" }
    ],
    estado_catalogo: "EN_CARTELERA",
    actualizado_en: ISODate("2026-09-08T10:00:00-05:00"),
    premios: [ { premio: "Óscar", categoria: "Mejor película extranjera", anio: 2000 } ]
  },
  {
    codigo_pelicula: "PA-PEL-008",
    id_contrato: 8,
    titulo: "El secreto de sus ojos",
    titulo_original: "El secreto de sus ojos",
    anio_estreno: 2009,
    paises_origen: [ "AR", "ES" ],
    generos: [ "Suspenso", "Drama" ],
    sinopsis: "Un empleado judicial retirado escribe una novela sobre un caso de asesinato que nunca pudo cerrar.",
    direccion: [ { id_artista: 8, nombre: "Juan José Campanella" } ],
    elenco: [
      { id_artista: 18, nombre: "Ricardo Darín", personaje: "Benjamín Espósito", orden: 1 },
      { id_artista: null, nombre: "Soledad Villamil", personaje: "Irene Menéndez Hastings", orden: 2 },
      { id_artista: null, nombre: "Guillermo Francella", personaje: "Pablo Sandoval", orden: 3 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 129, formatos: [ "2D", "3D" ] } ],
    idiomas: { original: [ "es" ] },
    subtitulos: [ "es-CO", "en", "pt" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "15+", entidad: "MinCultura" },
      { pais: "AR", clasificacion: "SAM 16", entidad: "INCAA" },
      { pais: "US", clasificacion: "R", entidad: "MPA" }
    ],
    estado_catalogo: "EN_CARTELERA",
    actualizado_en: ISODate("2026-09-09T10:00:00-05:00"),
    premios: [ { premio: "Óscar", categoria: "Mejor película extranjera", anio: 2010 } ],
    evento_asociado: { tipo: "CONVERSATORIO", invitado_id_artista: 8 }
  },
  {
    codigo_pelicula: "PA-PEL-009",
    id_contrato: 9,
    titulo: "Una mujer fantástica",
    titulo_original: "Una mujer fantástica",
    anio_estreno: 2017,
    paises_origen: [ "CL", "DE", "ES", "US" ],
    generos: [ "Drama" ],
    sinopsis: "Marina, mujer trans, enfrenta la sospecha y el rechazo de la familia de su pareja tras la muerte de este.",
    direccion: [ { id_artista: 9, nombre: "Sebastián Lelio" } ],
    elenco: [
      { id_artista: null, nombre: "Daniela Vega", personaje: "Marina Vidal", orden: 1 },
      { id_artista: null, nombre: "Francisco Reyes", personaje: "Orlando", orden: 2 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 104, formatos: [ "2D", "DOLBY_ATMOS" ] } ],
    idiomas: { original: [ "es" ] },
    subtitulos: [ "es-CO", "en" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "15+", entidad: "MinCultura" },
      { pais: "CL", clasificacion: "14", entidad: "CCC" }
    ],
    estado_catalogo: "EN_CARTELERA",
    actualizado_en: ISODate("2026-09-10T10:00:00-05:00"),
    premios: [ { premio: "Óscar", categoria: "Mejor película internacional", anio: 2018 } ]
  },
  {
    codigo_pelicula: "PA-PEL-010",
    id_contrato: 10,
    titulo: "Ciudad de Dios",
    titulo_original: "Cidade de Deus",
    anio_estreno: 2002,
    paises_origen: [ "BR", "FR" ],
    generos: [ "Crimen", "Drama" ],
    sinopsis: "Buscapé, joven fotógrafo, narra el ascenso del crimen organizado en una favela de Río de Janeiro.",
    direccion: [ { id_artista: 10, nombre: "Fernando Meirelles" } ],
    elenco: [
      { id_artista: null, nombre: "Alexandre Rodrigues", personaje: "Buscapé", orden: 1 },
      { id_artista: null, nombre: "Leandro Firmino", personaje: "Zé Pequeno", orden: 2 },
      { id_artista: null, nombre: "Seu Jorge", personaje: "Mané Galinha", orden: 3 }
    ],
    versiones: [
      { tipo: "CINE", duracion_min: 130, formatos: [ "2D", "3D", "DOLBY_ATMOS" ] },
      { tipo: "IMAX", duracion_min: 130, formatos: [ "IMAX" ] }
    ],
    idiomas: { original: [ "pt" ], doblajes: [ "es-LA" ] },
    subtitulos: [ "es-CO", "en" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "18+", entidad: "MinCultura" },
      { pais: "BR", clasificacion: "18", entidad: "ClassInd" },
      { pais: "US", clasificacion: "R", entidad: "MPA" }
    ],
    estado_catalogo: "EN_CARTELERA",
    actualizado_en: ISODate("2026-09-11T10:00:00-05:00")
  },
  {
    codigo_pelicula: "PA-PEL-011",
    id_contrato: 11,
    titulo: "Estación Central",
    titulo_original: "Central do Brasil",
    anio_estreno: 1998,
    paises_origen: [ "BR", "FR" ],
    generos: [ "Drama" ],
    sinopsis: "Dora, escritora de cartas en la estación central de Río, acompaña a un niño en busca de su padre.",
    direccion: [ { id_artista: 11, nombre: "Walter Salles" } ],
    elenco: [
      { id_artista: null, nombre: "Fernanda Montenegro", personaje: "Dora", orden: 1 },
      { id_artista: null, nombre: "Vinícius de Oliveira", personaje: "Josué", orden: 2 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 110, formatos: [ "2D", "3D" ] } ],
    idiomas: { original: [ "pt" ], doblajes: [ "es-LA" ] },
    subtitulos: [ "es-CO", "en" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "12+", entidad: "MinCultura" },
      { pais: "BR", clasificacion: "12", entidad: "ClassInd" }
    ],
    estado_catalogo: "EN_CARTELERA",
    actualizado_en: ISODate("2026-09-12T10:00:00-05:00"),
    premios: [ { premio: "Oso de Oro", festival: "Berlín", anio: 1998 } ]
  },
  {
    codigo_pelicula: "PA-PEL-012",
    id_contrato: 12,
    titulo: "Los otros",
    titulo_original: "The Others",
    anio_estreno: 2001,
    paises_origen: [ "ES", "US", "FR" ],
    generos: [ "Terror", "Suspenso" ],
    sinopsis: "En una mansión aislada de la isla de Jersey, una madre protege a sus hijos fotosensibles de presencias inexplicables.",
    direccion: [ { id_artista: 12, nombre: "Alejandro Amenábar" } ],
    elenco: [
      { id_artista: null, nombre: "Nicole Kidman", personaje: "Grace Stewart", orden: 1 },
      { id_artista: null, nombre: "Fionnula Flanagan", personaje: "Bertha Mills", orden: 2 },
      { id_artista: null, nombre: "Christopher Eccleston", personaje: "Charles Stewart", orden: 3 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 104, formatos: [ "2D", "3D", "DOLBY_ATMOS" ] } ],
    idiomas: { original: [ "en" ], doblajes: [ "es-LA" ] },
    subtitulos: [ "es-CO", "es" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "12+", entidad: "MinCultura" },
      { pais: "US", clasificacion: "PG-13", entidad: "MPA" },
      { pais: "ES", clasificacion: "+13", entidad: "ICAA" }
    ],
    estado_catalogo: "EN_CARTELERA",
    actualizado_en: ISODate("2026-09-13T10:00:00-05:00"),
    evento_asociado: { tipo: "CONVERSATORIO", invitado_id_artista: 12 }
  },
  {
    codigo_pelicula: "PA-PEL-013",
    id_contrato: 13,
    titulo: "Diarios de motocicleta",
    titulo_original: "Diarios de motocicleta",
    anio_estreno: 2004,
    paises_origen: [ "AR", "BR", "CL", "PE", "US" ],
    generos: [ "Drama", "Aventura", "Biografía" ],
    sinopsis: "El viaje de juventud de Ernesto Guevara y Alberto Granado por Sudamérica en una vieja motocicleta.",
    direccion: [ { id_artista: 11, nombre: "Walter Salles" } ],
    elenco: [
      { id_artista: 13, nombre: "Gael García Bernal", personaje: "Ernesto Guevara", orden: 1 },
      { id_artista: null, nombre: "Rodrigo de la Serna", personaje: "Alberto Granado", orden: 2 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 126, formatos: [ "2D" ] } ],
    idiomas: { original: [ "es" ] },
    subtitulos: [ "es-CO", "en" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "12+", entidad: "MinCultura" },
      { pais: "US", clasificacion: "R", entidad: "MPA" }
    ],
    estado_catalogo: "CONTRATO_FINALIZADO",
    actualizado_en: ISODate("2026-09-14T10:00:00-05:00"),
    evento_asociado: { tipo: "CONVERSATORIO", invitado_id_artista: 13 }
  },
  {
    codigo_pelicula: "PA-PEL-014",
    id_contrato: 14,
    titulo: "Y tu mamá también",
    titulo_original: "Y tu mamá también",
    anio_estreno: 2001,
    paises_origen: [ "MX" ],
    generos: [ "Drama", "Comedia" ],
    sinopsis: "Dos amigos adolescentes emprenden un viaje por carretera con una mujer mayor hacia una playa imaginaria.",
    direccion: [ { id_artista: 2, nombre: "Alfonso Cuarón" } ],
    elenco: [
      { id_artista: 13, nombre: "Gael García Bernal", personaje: "Julio Zapata", orden: 1 },
      { id_artista: 14, nombre: "Diego Luna", personaje: "Tenoch Iturbide", orden: 2 },
      { id_artista: null, nombre: "Maribel Verdú", personaje: "Luisa Cortés", orden: 3 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 106, formatos: [ "2D" ] } ],
    idiomas: { original: [ "es" ] },
    subtitulos: [ "es-CO", "en" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "18+", entidad: "MinCultura" },
      { pais: "MX", clasificacion: "C", entidad: "RTC" }
    ],
    estado_catalogo: "CONTRATO_CANCELADO",
    actualizado_en: ISODate("2026-09-15T10:00:00-05:00")
  },
  {
    codigo_pelicula: "PA-PEL-015",
    id_contrato: null,
    titulo: "Biutiful",
    titulo_original: "Biutiful",
    anio_estreno: 2010,
    paises_origen: [ "MX", "ES" ],
    generos: [ "Drama" ],
    sinopsis: "Uxbal, padre enfermo en la Barcelona marginal, intenta poner en orden su vida antes de morir.",
    direccion: [ { id_artista: 4, nombre: "Alejandro González Iñárritu" } ],
    elenco: [
      { id_artista: 17, nombre: "Javier Bardem", personaje: "Uxbal", orden: 1 },
      { id_artista: null, nombre: "Maricel Álvarez", personaje: "Marambra", orden: 2 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 148, formatos: [ "2D" ] } ],
    idiomas: { original: [ "es" ] },
    subtitulos: [ "es-CO", "en" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "18+", entidad: "MinCultura" },
      { pais: "ES", clasificacion: "+18", entidad: "ICAA" }
    ],
    estado_catalogo: "EN_EVALUACION",
    actualizado_en: ISODate("2026-09-16T10:00:00-05:00"),
    evaluacion: { distribuidora: "Cinecolor", fecha_propuesta: ISODate("2026-11-17T00:00:00-05:00"), prioridad: "ALTA" }
  },
  {
    codigo_pelicula: "PA-PEL-016",
    id_contrato: null,
    titulo: "Dolor y gloria",
    titulo_original: "Dolor y gloria",
    anio_estreno: 2019,
    paises_origen: [ "ES" ],
    generos: [ "Drama" ],
    sinopsis: "Un director de cine en decadencia revisa su infancia, sus amores y su obra.",
    direccion: [ { id_artista: 7, nombre: "Pedro Almodóvar" } ],
    elenco: [
      { id_artista: 26, nombre: "Antonio Banderas", personaje: "Salvador Mallo", orden: 1 },
      { id_artista: 16, nombre: "Penélope Cruz", personaje: "Jacinta", orden: 2 },
      { id_artista: null, nombre: "Asier Etxeandia", personaje: "Alberto Crespo", orden: 3 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 113, formatos: [ "2D", "DOLBY_ATMOS" ] } ],
    idiomas: { original: [ "es" ] },
    subtitulos: [ "es-CO", "en" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "15+", entidad: "MinCultura" },
      { pais: "ES", clasificacion: "+16", entidad: "ICAA" }
    ],
    estado_catalogo: "EN_EVALUACION",
    actualizado_en: ISODate("2026-09-17T10:00:00-05:00"),
    evaluacion: {
      distribuidora: "Cine Colombia Distribución",
      fecha_propuesta: ISODate("2026-11-18T00:00:00-05:00"),
      prioridad: "MEDIA"
    }
  },
  {
    codigo_pelicula: "PA-PEL-017",
    id_contrato: null,
    titulo: "Mar adentro",
    titulo_original: "Mar adentro",
    anio_estreno: 2004,
    paises_origen: [ "ES", "FR", "IT" ],
    generos: [ "Drama", "Biografía" ],
    sinopsis: "Ramón Sampedro, tetrapléjico durante casi tres décadas, lucha por el derecho a una muerte digna.",
    direccion: [ { id_artista: 12, nombre: "Alejandro Amenábar" } ],
    elenco: [
      { id_artista: 17, nombre: "Javier Bardem", personaje: "Ramón Sampedro", orden: 1 },
      { id_artista: null, nombre: "Belén Rueda", personaje: "Julia", orden: 2 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 125, formatos: [ "2D" ] } ],
    idiomas: { original: [ "es", "gl" ], doblajes: [ "es-LA" ] },
    subtitulos: [ "es-CO", "en" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "12+", entidad: "MinCultura" },
      { pais: "ES", clasificacion: "+13", entidad: "ICAA" }
    ],
    estado_catalogo: "EN_EVALUACION",
    actualizado_en: ISODate("2026-09-18T10:00:00-05:00"),
    evaluacion: { distribuidora: "Babilla Cine", fecha_propuesta: ISODate("2026-11-19T00:00:00-05:00"), prioridad: "BAJA" }
  },
  {
    codigo_pelicula: "PA-PEL-018",
    id_contrato: null,
    titulo: "Pájaros de verano",
    titulo_original: "Pájaros de verano",
    anio_estreno: 2018,
    paises_origen: [ "CO", "DK", "MX" ],
    generos: [ "Drama", "Crimen" ],
    sinopsis: "Una familia wayuu se involucra en la bonanza marimbera de La Guajira en los años setenta.",
    direccion: [ { id_artista: 5, nombre: "Ciro Guerra" }, { id_artista: null, nombre: "Cristina Gallego" } ],
    elenco: [
      { id_artista: null, nombre: "Carmiña Martínez", personaje: "Úrsula", orden: 1 },
      { id_artista: null, nombre: "José Acosta", personaje: "Rapayet", orden: 2 },
      { id_artista: null, nombre: "Natalia Reyes", personaje: "Zaida", orden: 3 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 125, formatos: [ "2D", "DOLBY_ATMOS" ] } ],
    idiomas: { original: [ "es", "wayuunaiki" ], doblajes: [ "es-LA" ] },
    subtitulos: [ "es-CO", "en" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "15+", entidad: "MinCultura" },
      { pais: "CO", clasificacion: "15+", entidad: "MinCultura" }
    ],
    estado_catalogo: "EN_EVALUACION",
    actualizado_en: ISODate("2026-09-19T10:00:00-05:00"),
    evaluacion: { distribuidora: "Diamond Films", fecha_propuesta: ISODate("2026-11-20T00:00:00-05:00"), prioridad: "ALTA" }
  },
  {
    codigo_pelicula: "PA-PEL-019",
    id_contrato: null,
    titulo: "Relatos salvajes",
    titulo_original: "Relatos salvajes",
    anio_estreno: 2014,
    paises_origen: [ "AR", "ES" ],
    generos: [ "Comedia negra" ],
    sinopsis: "Seis historias independientes sobre personas que pierden el control ante la injusticia cotidiana.",
    direccion: [ { id_artista: null, nombre: "Damián Szifron" } ],
    elenco: [
      { id_artista: 18, nombre: "Ricardo Darín", personaje: "Simón Fischer", orden: 1 },
      { id_artista: null, nombre: "Érica Rivas", personaje: "Romina", orden: 2 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 122, formatos: [ "2D" ] } ],
    idiomas: { original: [ "es" ] },
    subtitulos: [ "es-CO", "en" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "15+", entidad: "MinCultura" },
      { pais: "AR", clasificacion: "SAM 16", entidad: "INCAA" }
    ],
    estado_catalogo: "EN_EVALUACION",
    actualizado_en: ISODate("2026-09-20T10:00:00-05:00"),
    evaluacion: { distribuidora: "Cinecolor", fecha_propuesta: ISODate("2026-11-21T00:00:00-05:00"), prioridad: "MEDIA" }
  },
  {
    codigo_pelicula: "PA-PEL-020",
    id_contrato: null,
    titulo: "Nueve reinas",
    titulo_original: "Nueve reinas",
    anio_estreno: 2000,
    paises_origen: [ "AR" ],
    generos: [ "Suspenso", "Crimen" ],
    sinopsis: "Dos estafadores de Buenos Aires intentan vender una falsificación de una valiosa serie de estampillas.",
    direccion: [ { id_artista: null, nombre: "Fabián Bielinsky" } ],
    elenco: [
      { id_artista: 18, nombre: "Ricardo Darín", personaje: "Marcos", orden: 1 },
      { id_artista: null, nombre: "Gastón Pauls", personaje: "Juan", orden: 2 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 114, formatos: [ "2D", "35MM" ] } ],
    idiomas: { original: [ "es" ] },
    subtitulos: [ "es-CO", "en" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "12+", entidad: "MinCultura" },
      { pais: "AR", clasificacion: "SAM 13", entidad: "INCAA" }
    ],
    estado_catalogo: "EN_EVALUACION",
    actualizado_en: ISODate("2026-09-21T10:00:00-05:00"),
    evaluacion: {
      distribuidora: "Cine Colombia Distribución",
      fecha_propuesta: ISODate("2026-11-02T00:00:00-05:00"),
      prioridad: "BAJA"
    }
  },
  {
    codigo_pelicula: "PA-PEL-021",
    id_contrato: null,
    titulo: "Aquarius",
    titulo_original: "Aquarius",
    anio_estreno: 2016,
    paises_origen: [ "BR", "FR" ],
    generos: [ "Drama" ],
    sinopsis: "Clara, crítica musical retirada, se niega a vender su departamento a una constructora en Recife.",
    direccion: [ { id_artista: null, nombre: "Kleber Mendonça Filho" } ],
    elenco: [ { id_artista: 19, nombre: "Sônia Braga", personaje: "Clara", orden: 1 } ],
    versiones: [ { tipo: "CINE", duracion_min: 146, formatos: [ "2D" ] } ],
    idiomas: { original: [ "pt" ], doblajes: [ "es-LA" ] },
    subtitulos: [ "es-CO", "en" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "18+", entidad: "MinCultura" },
      { pais: "BR", clasificacion: "18", entidad: "ClassInd" }
    ],
    estado_catalogo: "EN_EVALUACION",
    actualizado_en: ISODate("2026-09-22T10:00:00-05:00"),
    evaluacion: { distribuidora: "Babilla Cine", fecha_propuesta: ISODate("2026-11-03T00:00:00-05:00"), prioridad: "ALTA" }
  },
  {
    codigo_pelicula: "PA-PEL-022",
    id_contrato: null,
    titulo: "Tropa de élite",
    titulo_original: "Tropa de Elite",
    anio_estreno: 2007,
    paises_origen: [ "BR" ],
    generos: [ "Acción", "Crimen" ],
    sinopsis: "El capitán Nascimento del BOPE busca un sucesor mientras enfrenta el narcotráfico en Río.",
    direccion: [ { id_artista: null, nombre: "José Padilha" } ],
    elenco: [
      { id_artista: 20, nombre: "Wagner Moura", personaje: "Capitán Nascimento", orden: 1 },
      { id_artista: null, nombre: "André Ramiro", personaje: "André Matias", orden: 2 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 115, formatos: [ "2D", "DOLBY_ATMOS" ] } ],
    idiomas: { original: [ "pt" ], doblajes: [ "es-LA" ] },
    subtitulos: [ "es-CO", "en" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "18+", entidad: "MinCultura" },
      { pais: "BR", clasificacion: "16", entidad: "ClassInd" }
    ],
    estado_catalogo: "EN_EVALUACION",
    actualizado_en: ISODate("2026-09-23T10:00:00-05:00"),
    evaluacion: { distribuidora: "Diamond Films", fecha_propuesta: ISODate("2026-11-04T00:00:00-05:00"), prioridad: "MEDIA" }
  },
  {
    codigo_pelicula: "PA-PEL-023",
    id_contrato: null,
    titulo: "La forma del agua",
    titulo_original: "The Shape of Water",
    anio_estreno: 2017,
    paises_origen: [ "US" ],
    generos: [ "Fantasía", "Romance" ],
    sinopsis: "Una conserje muda de un laboratorio secreto establece un vínculo con una criatura anfibia cautiva.",
    direccion: [ { id_artista: 3, nombre: "Guillermo del Toro" } ],
    elenco: [
      { id_artista: null, nombre: "Sally Hawkins", personaje: "Elisa Esposito", orden: 1 },
      { id_artista: null, nombre: "Octavia Spencer", personaje: "Zelda Fuller", orden: 2 },
      { id_artista: null, nombre: "Michael Shannon", personaje: "Richard Strickland", orden: 3 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 123, formatos: [ "2D", "DOLBY_ATMOS" ] } ],
    idiomas: { original: [ "en" ], doblajes: [ "es-LA" ] },
    subtitulos: [ "es-CO", "es" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "15+", entidad: "MinCultura" },
      { pais: "US", clasificacion: "R", entidad: "MPA" }
    ],
    estado_catalogo: "EN_EVALUACION",
    actualizado_en: ISODate("2026-09-24T10:00:00-05:00"),
    premios: [ { premio: "Óscar", categoria: "Mejor película", anio: 2018 } ],
    evaluacion: { distribuidora: "Cinecolor", fecha_propuesta: ISODate("2026-11-05T00:00:00-05:00"), prioridad: "BAJA" }
  },
  {
    codigo_pelicula: "PA-PEL-024",
    id_contrato: null,
    titulo: "Gravity",
    titulo_original: "Gravity",
    anio_estreno: 2013,
    paises_origen: [ "US", "GB" ],
    generos: [ "Ciencia ficción", "Suspenso" ],
    sinopsis: "Dos astronautas quedan a la deriva en el espacio tras la destrucción de su transbordador.",
    direccion: [ { id_artista: 2, nombre: "Alfonso Cuarón" } ],
    elenco: [
      { id_artista: null, nombre: "Sandra Bullock", personaje: "Ryan Stone", orden: 1 },
      { id_artista: null, nombre: "George Clooney", personaje: "Matt Kowalski", orden: 2 }
    ],
    versiones: [
      { tipo: "CINE", duracion_min: 91, formatos: [ "2D", "3D", "DOLBY_ATMOS" ] },
      { tipo: "IMAX", duracion_min: 91, formatos: [ "IMAX", "3D" ] }
    ],
    idiomas: { original: [ "en" ], doblajes: [ "es-LA" ] },
    subtitulos: [ "es-CO", "es" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "12+", entidad: "MinCultura" },
      { pais: "US", clasificacion: "PG-13", entidad: "MPA" }
    ],
    estado_catalogo: "EN_EVALUACION",
    actualizado_en: ISODate("2026-09-25T10:00:00-05:00"),
    evaluacion: {
      distribuidora: "Cine Colombia Distribución",
      fecha_propuesta: ISODate("2026-11-06T00:00:00-05:00"),
      prioridad: "ALTA"
    }
  },
  {
    codigo_pelicula: "PA-PEL-025",
    id_contrato: null,
    titulo: "El renacido",
    titulo_original: "The Revenant",
    anio_estreno: 2015,
    paises_origen: [ "US" ],
    generos: [ "Aventura", "Drama" ],
    sinopsis: "Un trampero herido y abandonado recorre el territorio salvaje para vengarse de quien lo traicionó.",
    direccion: [ { id_artista: 4, nombre: "Alejandro González Iñárritu" } ],
    elenco: [
      { id_artista: null, nombre: "Leonardo DiCaprio", personaje: "Hugh Glass", orden: 1 },
      { id_artista: null, nombre: "Tom Hardy", personaje: "John Fitzgerald", orden: 2 }
    ],
    versiones: [
      { tipo: "CINE", duracion_min: 156, formatos: [ "2D", "DOLBY_ATMOS" ] },
      { tipo: "IMAX", duracion_min: 156, formatos: [ "IMAX" ] }
    ],
    idiomas: { original: [ "en", "arapaho" ], doblajes: [ "es-LA" ] },
    subtitulos: [ "es-CO", "es" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "15+", entidad: "MinCultura" },
      { pais: "US", clasificacion: "R", entidad: "MPA" }
    ],
    estado_catalogo: "EN_EVALUACION",
    actualizado_en: ISODate("2026-09-26T10:00:00-05:00"),
    evaluacion: { distribuidora: "Babilla Cine", fecha_propuesta: ISODate("2026-11-07T00:00:00-05:00"), prioridad: "MEDIA" }
  },
  {
    codigo_pelicula: "PA-PEL-026",
    id_contrato: null,
    titulo: "Joker",
    titulo_original: "Joker",
    anio_estreno: 2019,
    paises_origen: [ "US" ],
    generos: [ "Drama", "Suspenso" ],
    sinopsis: "Arthur Fleck, comediante fracasado de Gotham, desciende hacia la locura y el crimen.",
    direccion: [ { id_artista: null, nombre: "Todd Phillips" } ],
    elenco: [
      { id_artista: 35, nombre: "Joaquin Phoenix", personaje: "Arthur Fleck", orden: 1 },
      { id_artista: null, nombre: "Robert De Niro", personaje: "Murray Franklin", orden: 2 }
    ],
    versiones: [
      { tipo: "CINE", duracion_min: 122, formatos: [ "2D", "DOLBY_ATMOS" ] },
      { tipo: "IMAX", duracion_min: 122, formatos: [ "IMAX" ] }
    ],
    idiomas: { original: [ "en" ], doblajes: [ "es-LA" ] },
    subtitulos: [ "es-CO", "es" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "15+", entidad: "MinCultura" },
      { pais: "US", clasificacion: "R", entidad: "MPA" }
    ],
    estado_catalogo: "EN_EVALUACION",
    actualizado_en: ISODate("2026-09-27T10:00:00-05:00"),
    evaluacion: { distribuidora: "Diamond Films", fecha_propuesta: ISODate("2026-11-08T00:00:00-05:00"), prioridad: "BAJA" }
  },
  {
    codigo_pelicula: "PA-PEL-027",
    id_contrato: null,
    titulo: "Tár",
    titulo_original: "Tár",
    anio_estreno: 2022,
    paises_origen: [ "US", "DE" ],
    generos: [ "Drama", "Música" ],
    sinopsis: "Lydia Tár, directora de una gran orquesta alemana, ve cómo su carrera se desmorona.",
    direccion: [ { id_artista: null, nombre: "Todd Field" } ],
    elenco: [
      { id_artista: 34, nombre: "Cate Blanchett", personaje: "Lydia Tár", orden: 1 },
      { id_artista: null, nombre: "Nina Hoss", personaje: "Sharon Goodnow", orden: 2 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 158, formatos: [ "2D", "DOLBY_ATMOS" ] } ],
    idiomas: { original: [ "en", "de" ], doblajes: [ "es-LA" ] },
    subtitulos: [ "es-CO", "es" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "15+", entidad: "MinCultura" },
      { pais: "US", clasificacion: "R", entidad: "MPA" }
    ],
    estado_catalogo: "EN_EVALUACION",
    actualizado_en: ISODate("2026-09-28T10:00:00-05:00"),
    evaluacion: { distribuidora: "Cinecolor", fecha_propuesta: ISODate("2026-11-09T00:00:00-05:00"), prioridad: "ALTA" }
  },
  {
    codigo_pelicula: "PA-PEL-028",
    id_contrato: null,
    titulo: "Nomadland",
    titulo_original: "Nomadland",
    anio_estreno: 2020,
    paises_origen: [ "US" ],
    generos: [ "Drama" ],
    sinopsis: "Tras el colapso económico de su pueblo, Fern recorre el oeste estadounidense viviendo en una furgoneta.",
    direccion: [ { id_artista: null, nombre: "Chloé Zhao" } ],
    elenco: [
      { id_artista: 36, nombre: "Frances McDormand", personaje: "Fern", orden: 1 },
      { id_artista: null, nombre: "David Strathairn", personaje: "Dave", orden: 2 }
    ],
    versiones: [ { tipo: "CINE", duracion_min: 108, formatos: [ "2D" ] } ],
    idiomas: { original: [ "en" ], doblajes: [ "es-LA" ] },
    subtitulos: [ "es-CO", "es" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "12+", entidad: "MinCultura" },
      { pais: "US", clasificacion: "R", entidad: "MPA" }
    ],
    estado_catalogo: "EN_EVALUACION",
    actualizado_en: ISODate("2026-09-01T10:00:00-05:00"),
    premios: [ { premio: "Óscar", categoria: "Mejor película", anio: 2021 } ],
    evaluacion: {
      distribuidora: "Cine Colombia Distribución",
      fecha_propuesta: ISODate("2026-11-10T00:00:00-05:00"),
      prioridad: "MEDIA"
    }
  },
  {
    codigo_pelicula: "PA-PEL-029",
    id_contrato: null,
    titulo: "Oppenheimer",
    titulo_original: "Oppenheimer",
    anio_estreno: 2023,
    paises_origen: [ "US", "GB" ],
    generos: [ "Drama", "Biografía", "Historia" ],
    sinopsis: "La historia del físico J. Robert Oppenheimer y el desarrollo de la bomba atómica.",
    direccion: [ { id_artista: null, nombre: "Christopher Nolan" } ],
    elenco: [
      { id_artista: null, nombre: "Cillian Murphy", personaje: "J. Robert Oppenheimer", orden: 1 },
      { id_artista: null, nombre: "Emily Blunt", personaje: "Kitty Oppenheimer", orden: 2 },
      { id_artista: 40, nombre: "Florence Pugh", personaje: "Jean Tatlock", orden: 3 },
      { id_artista: null, nombre: "Robert Downey Jr.", personaje: "Lewis Strauss", orden: 4 }
    ],
    versiones: [
      { tipo: "CINE", duracion_min: 180, formatos: [ "2D", "DOLBY_ATMOS" ] },
      { tipo: "IMAX", duracion_min: 180, formatos: [ "IMAX", "35MM" ] }
    ],
    idiomas: { original: [ "en" ], doblajes: [ "es-LA" ] },
    subtitulos: [ "es-CO", "es" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "15+", entidad: "MinCultura" },
      { pais: "US", clasificacion: "R", entidad: "MPA" }
    ],
    estado_catalogo: "EN_EVALUACION",
    actualizado_en: ISODate("2026-09-02T10:00:00-05:00"),
    premios: [ { premio: "Óscar", categoria: "Mejor película", anio: 2024 } ],
    evaluacion: { distribuidora: "Babilla Cine", fecha_propuesta: ISODate("2026-11-11T00:00:00-05:00"), prioridad: "BAJA" }
  },
  {
    codigo_pelicula: "PA-PEL-030",
    id_contrato: null,
    titulo: "Dune: Parte dos",
    titulo_original: "Dune: Part Two",
    anio_estreno: 2024,
    paises_origen: [ "US", "CA" ],
    generos: [ "Ciencia ficción", "Aventura" ],
    sinopsis: "Paul Atreides se une a los Fremen y emprende la guerra contra quienes destruyeron a su familia.",
    direccion: [ { id_artista: null, nombre: "Denis Villeneuve" } ],
    elenco: [
      { id_artista: null, nombre: "Timothée Chalamet", personaje: "Paul Atreides", orden: 1 },
      { id_artista: null, nombre: "Zendaya", personaje: "Chani", orden: 2 },
      { id_artista: 40, nombre: "Florence Pugh", personaje: "Princesa Irulan", orden: 3 }
    ],
    versiones: [
      { tipo: "CINE", duracion_min: 166, formatos: [ "2D", "3D", "DOLBY_ATMOS" ] },
      { tipo: "IMAX", duracion_min: 166, formatos: [ "IMAX" ] }
    ],
    idiomas: { original: [ "en" ], doblajes: [ "es-LA" ] },
    subtitulos: [ "es-CO", "es" ],
    clasificaciones: [
      { pais: "CO", clasificacion: "12+", entidad: "MinCultura" },
      { pais: "US", clasificacion: "PG-13", entidad: "MPA" }
    ],
    estado_catalogo: "EN_EVALUACION",
    actualizado_en: ISODate("2026-09-03T10:00:00-05:00"),
    evaluacion: { distribuidora: "Diamond Films", fecha_propuesta: ISODate("2026-11-12T00:00:00-05:00"), prioridad: "ALTA" }
  }
]);






// 2. REQUISITOS_PROYECCION (36 documentos)
// Un documento por cada una de las 36 funciones de PostgreSQL
// Este se encarga de limpiar la colección para poder ejecutar el script varias veces
db.requisitos_proyeccion.deleteMany({});   

db.requisitos_proyeccion.insertMany([
  {
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
  },
  {
    id_funcion: 2,
    id_sala: 6,
    id_contrato: 2,
    codigo_pelicula: "PA-PEL-002",
    fecha_hora: ISODate("2026-10-05T17:00:00-05:00"),
    formato: "35MM",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: {
        proyector: "Kinoton FP38 (35 mm) + respaldo digital",
        resolucion: "Analógica 35 mm",
        relacion_aspecto: "1.85:1",
        brillo_min_fl: 14,
        copia_fisica: { rollos: 6, estado_copia: "Restaurada", empalmes_verificados: true }
      },
      audio: { sistema: "Dolby Digital 5.1", canales: 6, nivel_referencia_db: 82 },
      evento_especial: { tipo: "CINECLUB", foro_posterior_min: 30, moderador_id_staff: 12, microfonos_inalambricos: 2 }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-03T17:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-06T17:00:00-05:00"),
      tamano_gb: 148.5
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 8, completado: true, fecha: ISODate("2026-10-04T17:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 8, completado: true, fecha: ISODate("2026-10-04T18:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 8, completado: true, fecha: ISODate("2026-10-04T19:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 8, completado: true, fecha: ISODate("2026-10-04T20:00:00-05:00") },
      {
        item: "Revisar rollos y empalmes de la copia 35 mm",
        id_staff: 8,
        completado: true,
        fecha: ISODate("2026-10-04T21:00:00-05:00")
      },
      { item: "Preparar micrófonos para foro", id_staff: 7, completado: true, fecha: ISODate("2026-10-04T22:00:00-05:00") }
    ],
    estado_preparacion: "LISTA"
  },
  {
    id_funcion: 3,
    id_sala: 5,
    id_contrato: 3,
    codigo_pelicula: "PA-PEL-003",
    fecha_hora: ISODate("2026-10-05T20:00:00-05:00"),
    formato: "DOLBY_ATMOS",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: {
        proyector: "Christie CP4440-RGB (láser RGB)",
        resolucion: "4K",
        relacion_aspecto: "2.39:1",
        brillo_min_fl: 14
      },
      audio: { sistema: "Dolby Atmos", canales: 64, nivel_referencia_db: 85 },
      dolby_atmos: {
        altavoces_techo: 24,
        procesador: "Dolby CP950A",
        archivo_audio: "IAB (Immersive Audio Bitstream)",
        calibracion_previa: true
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-03T20:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-06T20:00:00-05:00"),
      tamano_gb: 129.8
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-04T20:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-04T21:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-04T22:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: true, fecha: ISODate("2026-10-04T23:00:00-05:00") },
      { item: "Calibrar altavoces de techo Atmos", id_staff: 9, completado: true, fecha: ISODate("2026-10-05T00:00:00-05:00") }
    ],
    estado_preparacion: "LISTA"
  },
  {
    id_funcion: 4,
    id_sala: 5,
    id_contrato: 4,
    codigo_pelicula: "PA-PEL-004",
    fecha_hora: ISODate("2026-10-06T14:00:00-05:00"),
    formato: "IMAX",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: { proyector: "IMAX con láser 4K dual", resolucion: "4K", relacion_aspecto: "1.43:1", brillo_min_fl: 22 },
      audio: { sistema: "IMAX 12 canales", canales: 12, nivel_referencia_db: 85 },
      imax: { certificacion_vigente: true, version_dcp: "IMAX DMR", alineacion_dual_laser: true, butacas_reclinables: 70 },
      evento_especial: {
        tipo: "CONVERSATORIO_CON_ARTISTA",
        invitado_id_artista: 4,
        foro_posterior_min: 45,
        moderador_id_staff: 12,
        microfonos_inalambricos: 3,
        requiere_seguridad_adicional: true
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-04T14:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-07T14:00:00-05:00"),
      tamano_gb: 323.4
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-05T14:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-05T15:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-05T16:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: true, fecha: ISODate("2026-10-05T17:00:00-05:00") },
      { item: "Alinear proyectores láser duales", id_staff: 9, completado: true, fecha: ISODate("2026-10-05T18:00:00-05:00") },
      {
        item: "Coordinar llegada del artista invitado",
        id_staff: 12,
        completado: true,
        fecha: ISODate("2026-10-05T19:00:00-05:00")
      }
    ],
    estado_preparacion: "LISTA"
  },
  {
    id_funcion: 5,
    id_sala: 4,
    id_contrato: 5,
    codigo_pelicula: "PA-PEL-005",
    fecha_hora: ISODate("2026-10-06T17:00:00-05:00"),
    formato: "3D",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: {
        proyector: "Christie CP4440-RGB (láser RGB)",
        resolucion: "4K",
        relacion_aspecto: "1.85:1",
        brillo_min_fl: 6
      },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 },
      gafas_3d: { tipo: "RealD pasivas", cantidad: 135, desinfeccion: "UV + paño microfibra", polarizador: "RealD XL" }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-04T17:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-07T17:00:00-05:00"),
      tamano_gb: 200
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-05T17:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-05T18:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-05T19:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: true, fecha: ISODate("2026-10-05T20:00:00-05:00") },
      { item: "Desinfectar y contar gafas 3D", id_staff: 6, completado: true, fecha: ISODate("2026-10-05T21:00:00-05:00") },
      { item: "Calibrar polarizador 3D", id_staff: 9, completado: true, fecha: ISODate("2026-10-05T22:00:00-05:00") }
    ],
    estado_preparacion: "LISTA"
  },
  {
    id_funcion: 6,
    id_sala: 3,
    id_contrato: 6,
    codigo_pelicula: "PA-PEL-006",
    fecha_hora: ISODate("2026-10-06T20:00:00-05:00"),
    formato: "3D",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: {
        proyector: "Christie CP4440-RGB (láser RGB)",
        resolucion: "4K",
        relacion_aspecto: "2.39:1",
        brillo_min_fl: 6
      },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 },
      gafas_3d: { tipo: "RealD pasivas", cantidad: 155, desinfeccion: "UV + paño microfibra", polarizador: "RealD XL" }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-04T20:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-07T20:00:00-05:00"),
      tamano_gb: 164.8
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-05T20:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-05T21:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-05T22:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: true, fecha: ISODate("2026-10-05T23:00:00-05:00") },
      { item: "Desinfectar y contar gafas 3D", id_staff: 6, completado: true, fecha: ISODate("2026-10-06T00:00:00-05:00") },
      { item: "Calibrar polarizador 3D", id_staff: 9, completado: true, fecha: ISODate("2026-10-06T01:00:00-05:00") }
    ],
    estado_preparacion: "LISTA"
  },
  {
    id_funcion: 7,
    id_sala: 3,
    id_contrato: 7,
    codigo_pelicula: "PA-PEL-007",
    fecha_hora: ISODate("2026-10-07T14:00:00-05:00"),
    formato: "3D",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: {
        proyector: "Christie CP4440-RGB (láser RGB)",
        resolucion: "4K",
        relacion_aspecto: "1.85:1",
        brillo_min_fl: 6
      },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 },
      gafas_3d: { tipo: "RealD pasivas", cantidad: 155, desinfeccion: "UV + paño microfibra", polarizador: "RealD XL" }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-05T14:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-08T14:00:00-05:00"),
      tamano_gb: 161.6
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-06T14:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-06T15:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-06T16:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: true, fecha: ISODate("2026-10-06T17:00:00-05:00") },
      { item: "Desinfectar y contar gafas 3D", id_staff: 6, completado: true, fecha: ISODate("2026-10-06T18:00:00-05:00") },
      { item: "Calibrar polarizador 3D", id_staff: 9, completado: true, fecha: ISODate("2026-10-06T19:00:00-05:00") }
    ],
    estado_preparacion: "LISTA"
  },
  {
    id_funcion: 8,
    id_sala: 2,
    id_contrato: 8,
    codigo_pelicula: "PA-PEL-008",
    fecha_hora: ISODate("2026-10-07T17:00:00-05:00"),
    formato: "2D",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: { proyector: "Barco SP4K-15 (láser)", resolucion: "4K", relacion_aspecto: "1.85:1", brillo_min_fl: 14 },
      audio: { sistema: "Dolby Digital 5.1", canales: 6, nivel_referencia_db: 82 },
      evento_especial: {
        tipo: "CONVERSATORIO_CON_ARTISTA",
        invitado_id_artista: 8,
        foro_posterior_min: 45,
        moderador_id_staff: 12,
        microfonos_inalambricos: 3,
        requiere_seguridad_adicional: true
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-05T17:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-08T17:00:00-05:00"),
      tamano_gb: 141.9
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 8, completado: true, fecha: ISODate("2026-10-06T17:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 8, completado: true, fecha: ISODate("2026-10-06T18:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 8, completado: true, fecha: ISODate("2026-10-06T19:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 8, completado: true, fecha: ISODate("2026-10-06T20:00:00-05:00") },
      {
        item: "Coordinar llegada del artista invitado",
        id_staff: 12,
        completado: true,
        fecha: ISODate("2026-10-06T21:00:00-05:00")
      }
    ],
    estado_preparacion: "LISTA"
  },
  {
    id_funcion: 9,
    id_sala: 1,
    id_contrato: 9,
    codigo_pelicula: "PA-PEL-009",
    fecha_hora: ISODate("2026-10-07T20:00:00-05:00"),
    formato: "2D",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: { proyector: "Barco SP4K-15 (láser)", resolucion: "4K", relacion_aspecto: "2.39:1", brillo_min_fl: 14 },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-05T20:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-08T20:00:00-05:00"),
      tamano_gb: 114.4
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 8, completado: true, fecha: ISODate("2026-10-06T20:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 8, completado: true, fecha: ISODate("2026-10-06T21:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 8, completado: true, fecha: ISODate("2026-10-06T22:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 8, completado: true, fecha: ISODate("2026-10-06T23:00:00-05:00") }
    ],
    estado_preparacion: "LISTA"
  },
  {
    id_funcion: 10,
    id_sala: 1,
    id_contrato: 10,
    codigo_pelicula: "PA-PEL-010",
    fecha_hora: ISODate("2026-10-08T14:00:00-05:00"),
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
      kdm_valida_desde: ISODate("2026-10-06T14:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-09T14:00:00-05:00"),
      tamano_gb: 143
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 8, completado: true, fecha: ISODate("2026-10-07T14:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 8, completado: true, fecha: ISODate("2026-10-07T15:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 8, completado: true, fecha: ISODate("2026-10-07T16:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 8, completado: true, fecha: ISODate("2026-10-07T17:00:00-05:00") },
      { item: "Verificar sincronía de subtítulos", id_staff: 8, completado: true, fecha: ISODate("2026-10-07T18:00:00-05:00") }
    ],
    estado_preparacion: "LISTA"
  },
  {
    id_funcion: 11,
    id_sala: 6,
    id_contrato: 11,
    codigo_pelicula: "PA-PEL-011",
    fecha_hora: ISODate("2026-10-08T17:00:00-05:00"),
    formato: "2D",
    idioma: "SUBTITULADA",
    requisitos: {
      proyeccion: { proyector: "Barco SP4K-15 (láser)", resolucion: "4K", relacion_aspecto: "1.85:1", brillo_min_fl: 14 },
      audio: { sistema: "Dolby Digital 5.1", canales: 6, nivel_referencia_db: 82 },
      subtitulado: {
        idioma: "es-CO",
        formato_archivo: "SMPTE-TT (XML)",
        tamano_fuente_pt: 42,
        posicion: "inferior",
        sincronia_verificada: true
      },
      evento_especial: { tipo: "CINECLUB", foro_posterior_min: 30, moderador_id_staff: 12, microfonos_inalambricos: 2 }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-06T17:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-09T17:00:00-05:00"),
      tamano_gb: 121
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 8, completado: true, fecha: ISODate("2026-10-07T17:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 8, completado: true, fecha: ISODate("2026-10-07T18:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 8, completado: true, fecha: ISODate("2026-10-07T19:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 8, completado: true, fecha: ISODate("2026-10-07T20:00:00-05:00") },
      { item: "Verificar sincronía de subtítulos", id_staff: 8, completado: true, fecha: ISODate("2026-10-07T21:00:00-05:00") },
      { item: "Preparar micrófonos para foro", id_staff: 7, completado: true, fecha: ISODate("2026-10-07T22:00:00-05:00") }
    ],
    estado_preparacion: "LISTA"
  },
  {
    id_funcion: 12,
    id_sala: 5,
    id_contrato: 12,
    codigo_pelicula: "PA-PEL-012",
    fecha_hora: ISODate("2026-10-08T20:00:00-05:00"),
    formato: "DOLBY_ATMOS",
    idioma: "SUBTITULADA",
    requisitos: {
      proyeccion: {
        proyector: "Christie CP4440-RGB (láser RGB)",
        resolucion: "4K",
        relacion_aspecto: "2.39:1",
        brillo_min_fl: 14
      },
      audio: { sistema: "Dolby Atmos", canales: 64, nivel_referencia_db: 85 },
      dolby_atmos: {
        altavoces_techo: 24,
        procesador: "Dolby CP950A",
        archivo_audio: "IAB (Immersive Audio Bitstream)",
        calibracion_previa: true
      },
      subtitulado: {
        idioma: "es-CO",
        formato_archivo: "SMPTE-TT (XML)",
        tamano_fuente_pt: 42,
        posicion: "inferior",
        sincronia_verificada: true
      },
      evento_especial: {
        tipo: "CONVERSATORIO_CON_ARTISTA",
        invitado_id_artista: 12,
        foro_posterior_min: 45,
        moderador_id_staff: 12,
        microfonos_inalambricos: 3,
        requiere_seguridad_adicional: true
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-06T20:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-09T20:00:00-05:00"),
      tamano_gb: 114.4
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-07T20:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-07T21:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-07T22:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: true, fecha: ISODate("2026-10-07T23:00:00-05:00") },
      { item: "Calibrar altavoces de techo Atmos", id_staff: 9, completado: true, fecha: ISODate("2026-10-08T00:00:00-05:00") },
      { item: "Verificar sincronía de subtítulos", id_staff: 9, completado: true, fecha: ISODate("2026-10-08T01:00:00-05:00") },
      {
        item: "Coordinar llegada del artista invitado",
        id_staff: 12,
        completado: true,
        fecha: ISODate("2026-10-08T02:00:00-05:00")
      }
    ],
    estado_preparacion: "LISTA"
  },
  {
    id_funcion: 13,
    id_sala: 5,
    id_contrato: 1,
    codigo_pelicula: "PA-PEL-001",
    fecha_hora: ISODate("2026-10-09T14:00:00-05:00"),
    formato: "DOLBY_ATMOS",
    idioma: "SUBTITULADA",
    requisitos: {
      proyeccion: {
        proyector: "Christie CP4440-RGB (láser RGB)",
        resolucion: "4K",
        relacion_aspecto: "1.85:1",
        brillo_min_fl: 14
      },
      audio: { sistema: "Dolby Atmos", canales: 64, nivel_referencia_db: 85 },
      dolby_atmos: {
        altavoces_techo: 24,
        procesador: "Dolby CP950A",
        archivo_audio: "IAB (Immersive Audio Bitstream)",
        calibracion_previa: true
      },
      subtitulado: {
        idioma: "es-CO",
        formato_archivo: "SMPTE-TT (XML)",
        tamano_fuente_pt: 42,
        posicion: "inferior",
        sincronia_verificada: true
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-07T14:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-10T14:00:00-05:00"),
      tamano_gb: 145.2
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-08T14:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-08T15:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-08T16:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: true, fecha: ISODate("2026-10-08T17:00:00-05:00") },
      { item: "Calibrar altavoces de techo Atmos", id_staff: 9, completado: true, fecha: ISODate("2026-10-08T18:00:00-05:00") },
      { item: "Verificar sincronía de subtítulos", id_staff: 9, completado: true, fecha: ISODate("2026-10-08T19:00:00-05:00") }
    ],
    estado_preparacion: "LISTA"
  },
  {
    id_funcion: 14,
    id_sala: 4,
    id_contrato: 2,
    codigo_pelicula: "PA-PEL-002",
    fecha_hora: ISODate("2026-10-09T17:00:00-05:00"),
    formato: "2D",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: {
        proyector: "Christie CP4440-RGB (láser RGB)",
        resolucion: "4K",
        relacion_aspecto: "1.85:1",
        brillo_min_fl: 14
      },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-07T17:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-10T17:00:00-05:00"),
      tamano_gb: 148.5
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-08T17:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-08T18:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-08T19:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: true, fecha: ISODate("2026-10-08T20:00:00-05:00") }
    ],
    estado_preparacion: "LISTA"
  },
  {
    id_funcion: 15,
    id_sala: 3,
    id_contrato: 3,
    codigo_pelicula: "PA-PEL-003",
    fecha_hora: ISODate("2026-10-09T20:00:00-05:00"),
    formato: "3D",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: {
        proyector: "Christie CP4440-RGB (láser RGB)",
        resolucion: "4K",
        relacion_aspecto: "2.39:1",
        brillo_min_fl: 6
      },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 },
      gafas_3d: { tipo: "RealD pasivas", cantidad: 155, desinfeccion: "UV + paño microfibra", polarizador: "RealD XL" }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-07T20:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-10T20:00:00-05:00"),
      tamano_gb: 188.8
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-08T20:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-08T21:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-08T22:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: true, fecha: ISODate("2026-10-08T23:00:00-05:00") },
      { item: "Desinfectar y contar gafas 3D", id_staff: 6, completado: true, fecha: ISODate("2026-10-09T00:00:00-05:00") },
      { item: "Calibrar polarizador 3D", id_staff: 9, completado: true, fecha: ISODate("2026-10-09T01:00:00-05:00") }
    ],
    estado_preparacion: "LISTA"
  },
  {
    id_funcion: 16,
    id_sala: 3,
    id_contrato: 4,
    codigo_pelicula: "PA-PEL-004",
    fecha_hora: ISODate("2026-10-10T14:00:00-05:00"),
    formato: "3D",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: {
        proyector: "Christie CP4440-RGB (láser RGB)",
        resolucion: "4K",
        relacion_aspecto: "1.85:1",
        brillo_min_fl: 6
      },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 },
      gafas_3d: { tipo: "RealD pasivas", cantidad: 155, desinfeccion: "UV + paño microfibra", polarizador: "RealD XL" },
      evento_especial: {
        tipo: "CONVERSATORIO_CON_ARTISTA",
        invitado_id_artista: 4,
        foro_posterior_min: 45,
        moderador_id_staff: 12,
        microfonos_inalambricos: 3,
        requiere_seguridad_adicional: true
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-08T14:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-11T14:00:00-05:00"),
      tamano_gb: 246.4
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-09T14:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-09T15:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-09T16:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: true, fecha: ISODate("2026-10-09T17:00:00-05:00") },
      { item: "Desinfectar y contar gafas 3D", id_staff: 6, completado: true, fecha: ISODate("2026-10-09T18:00:00-05:00") },
      { item: "Calibrar polarizador 3D", id_staff: 9, completado: true, fecha: ISODate("2026-10-09T19:00:00-05:00") },
      {
        item: "Coordinar llegada del artista invitado",
        id_staff: 12,
        completado: true,
        fecha: ISODate("2026-10-09T20:00:00-05:00")
      }
    ],
    estado_preparacion: "LISTA"
  },
  {
    id_funcion: 17,
    id_sala: 2,
    id_contrato: 5,
    codigo_pelicula: "PA-PEL-005",
    fecha_hora: ISODate("2026-10-10T17:00:00-05:00"),
    formato: "2D",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: { proyector: "Barco SP4K-15 (láser)", resolucion: "4K", relacion_aspecto: "1.85:1", brillo_min_fl: 14 },
      audio: { sistema: "Dolby Digital 5.1", canales: 6, nivel_referencia_db: 82 }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-08T17:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-11T17:00:00-05:00"),
      tamano_gb: 137.5
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 8, completado: true, fecha: ISODate("2026-10-09T17:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 8, completado: true, fecha: ISODate("2026-10-09T18:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 8, completado: true, fecha: ISODate("2026-10-09T19:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 8, completado: true, fecha: ISODate("2026-10-09T20:00:00-05:00") }
    ],
    estado_preparacion: "LISTA"
  },
  {
    id_funcion: 18,
    id_sala: 1,
    id_contrato: 6,
    codigo_pelicula: "PA-PEL-006",
    fecha_hora: ISODate("2026-10-10T20:00:00-05:00"),
    formato: "2D",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: { proyector: "Barco SP4K-15 (láser)", resolucion: "4K", relacion_aspecto: "2.39:1", brillo_min_fl: 14 },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-08T20:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-11T20:00:00-05:00"),
      tamano_gb: 113.3
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 8, completado: true, fecha: ISODate("2026-10-09T20:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 8, completado: true, fecha: ISODate("2026-10-09T21:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 8, completado: true, fecha: ISODate("2026-10-09T22:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 8, completado: true, fecha: ISODate("2026-10-09T23:00:00-05:00") }
    ],
    estado_preparacion: "LISTA"
  },
  {
    id_funcion: 19,
    id_sala: 1,
    id_contrato: 7,
    codigo_pelicula: "PA-PEL-007",
    fecha_hora: ISODate("2026-10-11T14:00:00-05:00"),
    formato: "2D",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: { proyector: "Barco SP4K-15 (láser)", resolucion: "4K", relacion_aspecto: "1.85:1", brillo_min_fl: 14 },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-09T14:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-12T14:00:00-05:00"),
      tamano_gb: 111.1
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 8, completado: true, fecha: ISODate("2026-10-10T14:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 8, completado: false, fecha: null },
      { item: "Prueba de imagen y foco", id_staff: 8, completado: true, fecha: ISODate("2026-10-10T16:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 8, completado: true, fecha: ISODate("2026-10-10T17:00:00-05:00") }
    ],
    estado_preparacion: "PENDIENTE"
  },
  {
    id_funcion: 20,
    id_sala: 6,
    id_contrato: 8,
    codigo_pelicula: "PA-PEL-008",
    fecha_hora: ISODate("2026-10-11T17:00:00-05:00"),
    formato: "2D",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: { proyector: "Barco SP4K-15 (láser)", resolucion: "4K", relacion_aspecto: "1.85:1", brillo_min_fl: 14 },
      audio: { sistema: "Dolby Digital 5.1", canales: 6, nivel_referencia_db: 82 },
      evento_especial: {
        tipo: "CONVERSATORIO_CON_ARTISTA",
        invitado_id_artista: 8,
        foro_posterior_min: 45,
        moderador_id_staff: 12,
        microfonos_inalambricos: 3,
        requiere_seguridad_adicional: true
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-09T17:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-12T17:00:00-05:00"),
      tamano_gb: 141.9
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 8, completado: false, fecha: null },
      { item: "Verificar KDM vigente", id_staff: 8, completado: true, fecha: ISODate("2026-10-10T18:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 8, completado: true, fecha: ISODate("2026-10-10T19:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 8, completado: true, fecha: ISODate("2026-10-10T20:00:00-05:00") },
      { item: "Preparar micrófonos para foro", id_staff: 7, completado: false, fecha: null },
      {
        item: "Coordinar llegada del artista invitado",
        id_staff: 12,
        completado: true,
        fecha: ISODate("2026-10-10T22:00:00-05:00")
      }
    ],
    estado_preparacion: "PENDIENTE"
  },
  {
    id_funcion: 21,
    id_sala: 5,
    id_contrato: 9,
    codigo_pelicula: "PA-PEL-009",
    fecha_hora: ISODate("2026-10-11T20:00:00-05:00"),
    formato: "DOLBY_ATMOS",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: {
        proyector: "Christie CP4440-RGB (láser RGB)",
        resolucion: "4K",
        relacion_aspecto: "2.39:1",
        brillo_min_fl: 14
      },
      audio: { sistema: "Dolby Atmos", canales: 64, nivel_referencia_db: 85 },
      dolby_atmos: {
        altavoces_techo: 24,
        procesador: "Dolby CP950A",
        archivo_audio: "IAB (Immersive Audio Bitstream)",
        calibracion_previa: true
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-09T20:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-12T20:00:00-05:00"),
      tamano_gb: 114.4
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-10T20:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-10T21:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-10T22:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: false, fecha: null },
      { item: "Calibrar altavoces de techo Atmos", id_staff: 9, completado: true, fecha: ISODate("2026-10-11T00:00:00-05:00") }
    ],
    estado_preparacion: "PENDIENTE"
  },
  {
    id_funcion: 22,
    id_sala: 5,
    id_contrato: 10,
    codigo_pelicula: "PA-PEL-010",
    fecha_hora: ISODate("2026-10-12T14:00:00-05:00"),
    formato: "IMAX",
    idioma: "SUBTITULADA",
    requisitos: {
      proyeccion: { proyector: "IMAX con láser 4K dual", resolucion: "4K", relacion_aspecto: "1.43:1", brillo_min_fl: 22 },
      audio: { sistema: "IMAX 12 canales", canales: 12, nivel_referencia_db: 85 },
      imax: { certificacion_vigente: true, version_dcp: "IMAX DMR", alineacion_dual_laser: true, butacas_reclinables: 70 },
      subtitulado: {
        idioma: "es-CO",
        formato_archivo: "SMPTE-TT (XML)",
        tamano_fuente_pt: 42,
        posicion: "inferior",
        sincronia_verificada: true
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-10T14:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-13T14:00:00-05:00"),
      tamano_gb: 273
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-11T14:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-11T15:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: false, fecha: null },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: true, fecha: ISODate("2026-10-11T17:00:00-05:00") },
      { item: "Alinear proyectores láser duales", id_staff: 9, completado: true, fecha: ISODate("2026-10-11T18:00:00-05:00") },
      { item: "Verificar sincronía de subtítulos", id_staff: 9, completado: true, fecha: ISODate("2026-10-11T19:00:00-05:00") }
    ],
    estado_preparacion: "PENDIENTE"
  },
  {
    id_funcion: 23,
    id_sala: 4,
    id_contrato: 11,
    codigo_pelicula: "PA-PEL-011",
    fecha_hora: ISODate("2026-10-12T17:00:00-05:00"),
    formato: "3D",
    idioma: "SUBTITULADA",
    requisitos: {
      proyeccion: {
        proyector: "Christie CP4440-RGB (láser RGB)",
        resolucion: "4K",
        relacion_aspecto: "1.85:1",
        brillo_min_fl: 6
      },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 },
      gafas_3d: { tipo: "RealD pasivas", cantidad: 135, desinfeccion: "UV + paño microfibra", polarizador: "RealD XL" },
      subtitulado: {
        idioma: "es-CO",
        formato_archivo: "SMPTE-TT (XML)",
        tamano_fuente_pt: 42,
        posicion: "inferior",
        sincronia_verificada: false
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-10T17:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-13T17:00:00-05:00"),
      tamano_gb: 176
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-11T17:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: false, fecha: null },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-11T19:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: true, fecha: ISODate("2026-10-11T20:00:00-05:00") },
      { item: "Desinfectar y contar gafas 3D", id_staff: 6, completado: true, fecha: ISODate("2026-10-11T21:00:00-05:00") },
      { item: "Calibrar polarizador 3D", id_staff: 9, completado: false, fecha: null },
      { item: "Verificar sincronía de subtítulos", id_staff: 9, completado: true, fecha: ISODate("2026-10-11T23:00:00-05:00") }
    ],
    estado_preparacion: "PENDIENTE"
  },
  {
    id_funcion: 24,
    id_sala: 3,
    id_contrato: 12,
    codigo_pelicula: "PA-PEL-012",
    fecha_hora: ISODate("2026-10-12T20:00:00-05:00"),
    formato: "3D",
    idioma: "SUBTITULADA",
    requisitos: {
      proyeccion: {
        proyector: "Christie CP4440-RGB (láser RGB)",
        resolucion: "4K",
        relacion_aspecto: "2.39:1",
        brillo_min_fl: 6
      },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 },
      gafas_3d: { tipo: "RealD pasivas", cantidad: 155, desinfeccion: "UV + paño microfibra", polarizador: "RealD XL" },
      subtitulado: {
        idioma: "es-CO",
        formato_archivo: "SMPTE-TT (XML)",
        tamano_fuente_pt: 42,
        posicion: "inferior",
        sincronia_verificada: true
      },
      evento_especial: {
        tipo: "CONVERSATORIO_CON_ARTISTA",
        invitado_id_artista: 12,
        foro_posterior_min: 45,
        moderador_id_staff: 12,
        microfonos_inalambricos: 3,
        requiere_seguridad_adicional: true
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-10T20:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-13T20:00:00-05:00"),
      tamano_gb: 166.4
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: false, fecha: null },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-11T21:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-11T22:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: true, fecha: ISODate("2026-10-11T23:00:00-05:00") },
      { item: "Desinfectar y contar gafas 3D", id_staff: 6, completado: false, fecha: null },
      { item: "Calibrar polarizador 3D", id_staff: 9, completado: true, fecha: ISODate("2026-10-12T01:00:00-05:00") },
      { item: "Verificar sincronía de subtítulos", id_staff: 9, completado: true, fecha: ISODate("2026-10-12T02:00:00-05:00") },
      {
        item: "Coordinar llegada del artista invitado",
        id_staff: 12,
        completado: true,
        fecha: ISODate("2026-10-12T03:00:00-05:00")
      }
    ],
    estado_preparacion: "PENDIENTE"
  },
  {
    id_funcion: 25,
    id_sala: 3,
    id_contrato: 1,
    codigo_pelicula: "PA-PEL-001",
    fecha_hora: ISODate("2026-10-13T14:00:00-05:00"),
    formato: "2D",
    idioma: "SUBTITULADA",
    requisitos: {
      proyeccion: {
        proyector: "Christie CP4440-RGB (láser RGB)",
        resolucion: "4K",
        relacion_aspecto: "1.85:1",
        brillo_min_fl: 14
      },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 },
      subtitulado: {
        idioma: "es-CO",
        formato_archivo: "SMPTE-TT (XML)",
        tamano_fuente_pt: 42,
        posicion: "inferior",
        sincronia_verificada: false
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-11T14:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-14T14:00:00-05:00"),
      tamano_gb: 145.2
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-12T14:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-12T15:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-12T16:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: false, fecha: null },
      { item: "Verificar sincronía de subtítulos", id_staff: 9, completado: true, fecha: ISODate("2026-10-12T18:00:00-05:00") }
    ],
    estado_preparacion: "PENDIENTE"
  },
  {
    id_funcion: 26,
    id_sala: 2,
    id_contrato: 2,
    codigo_pelicula: "PA-PEL-002",
    fecha_hora: ISODate("2026-10-13T17:00:00-05:00"),
    formato: "2D",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: { proyector: "Barco SP4K-15 (láser)", resolucion: "4K", relacion_aspecto: "1.85:1", brillo_min_fl: 14 },
      audio: { sistema: "Dolby Digital 5.1", canales: 6, nivel_referencia_db: 82 }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-11T17:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-14T17:00:00-05:00"),
      tamano_gb: 148.5
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 8, completado: true, fecha: ISODate("2026-10-12T17:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 8, completado: true, fecha: ISODate("2026-10-12T18:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 8, completado: false, fecha: null },
      { item: "Prueba de sonido en sala", id_staff: 8, completado: true, fecha: ISODate("2026-10-12T20:00:00-05:00") }
    ],
    estado_preparacion: "PENDIENTE"
  },
  {
    id_funcion: 27,
    id_sala: 1,
    id_contrato: 3,
    codigo_pelicula: "PA-PEL-003",
    fecha_hora: ISODate("2026-10-13T20:00:00-05:00"),
    formato: "2D",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: { proyector: "Barco SP4K-15 (láser)", resolucion: "4K", relacion_aspecto: "2.39:1", brillo_min_fl: 14 },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-11T20:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-14T20:00:00-05:00"),
      tamano_gb: 129.8
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 8, completado: true, fecha: ISODate("2026-10-12T20:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 8, completado: false, fecha: null },
      { item: "Prueba de imagen y foco", id_staff: 8, completado: true, fecha: ISODate("2026-10-12T22:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 8, completado: true, fecha: ISODate("2026-10-12T23:00:00-05:00") }
    ],
    estado_preparacion: "PENDIENTE"
  },
  {
    id_funcion: 28,
    id_sala: 1,
    id_contrato: 4,
    codigo_pelicula: "PA-PEL-004",
    fecha_hora: ISODate("2026-10-14T14:00:00-05:00"),
    formato: "2D",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: { proyector: "Barco SP4K-15 (láser)", resolucion: "4K", relacion_aspecto: "1.85:1", brillo_min_fl: 14 },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 },
      evento_especial: {
        tipo: "CONVERSATORIO_CON_ARTISTA",
        invitado_id_artista: 4,
        foro_posterior_min: 45,
        moderador_id_staff: 12,
        microfonos_inalambricos: 3,
        requiere_seguridad_adicional: true
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-12T14:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-15T14:00:00-05:00"),
      tamano_gb: 169.4
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 8, completado: false, fecha: null },
      { item: "Verificar KDM vigente", id_staff: 8, completado: true, fecha: ISODate("2026-10-13T15:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 8, completado: true, fecha: ISODate("2026-10-13T16:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 8, completado: true, fecha: ISODate("2026-10-13T17:00:00-05:00") },
      { item: "Coordinar llegada del artista invitado", id_staff: 12, completado: false, fecha: null }
    ],
    estado_preparacion: "PENDIENTE"
  },
  {
    id_funcion: 29,
    id_sala: 6,
    id_contrato: 5,
    codigo_pelicula: "PA-PEL-005",
    fecha_hora: ISODate("2026-10-14T17:00:00-05:00"),
    formato: "35MM",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: {
        proyector: "Kinoton FP38 (35 mm) + respaldo digital",
        resolucion: "Analógica 35 mm",
        relacion_aspecto: "1.85:1",
        brillo_min_fl: 14,
        copia_fisica: { rollos: 6, estado_copia: "Restaurada", empalmes_verificados: true }
      },
      audio: { sistema: "Dolby Digital 5.1", canales: 6, nivel_referencia_db: 82 },
      evento_especial: { tipo: "CINECLUB", foro_posterior_min: 30, moderador_id_staff: 12, microfonos_inalambricos: 2 }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-12T17:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-15T17:00:00-05:00"),
      tamano_gb: 137.5
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 8, completado: true, fecha: ISODate("2026-10-13T17:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 8, completado: true, fecha: ISODate("2026-10-13T18:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 8, completado: true, fecha: ISODate("2026-10-13T19:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 8, completado: false, fecha: null },
      {
        item: "Revisar rollos y empalmes de la copia 35 mm",
        id_staff: 8,
        completado: true,
        fecha: ISODate("2026-10-13T21:00:00-05:00")
      },
      { item: "Preparar micrófonos para foro", id_staff: 7, completado: true, fecha: ISODate("2026-10-13T22:00:00-05:00") }
    ],
    estado_preparacion: "PENDIENTE"
  },
  {
    id_funcion: 30,
    id_sala: 5,
    id_contrato: 6,
    codigo_pelicula: "PA-PEL-006",
    fecha_hora: ISODate("2026-10-14T20:00:00-05:00"),
    formato: "IMAX",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: { proyector: "IMAX con láser 4K dual", resolucion: "4K", relacion_aspecto: "1.43:1", brillo_min_fl: 22 },
      audio: { sistema: "IMAX 12 canales", canales: 12, nivel_referencia_db: 85 },
      imax: { certificacion_vigente: true, version_dcp: "IMAX DMR", alineacion_dual_laser: true, butacas_reclinables: 70 }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-12T20:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-15T20:00:00-05:00"),
      tamano_gb: 216.3
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-13T20:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-13T21:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: false, fecha: null },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: false, fecha: null },
      { item: "Alinear proyectores láser duales", id_staff: 9, completado: false, fecha: null }
    ],
    estado_preparacion: "CANCELADA",
    observaciones: "Función cancelada en PostgreSQL; KDM revocada por la distribuidora."
  },
  {
    id_funcion: 31,
    id_sala: 5,
    id_contrato: 7,
    codigo_pelicula: "PA-PEL-007",
    fecha_hora: ISODate("2026-10-15T14:00:00-05:00"),
    formato: "DOLBY_ATMOS",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: {
        proyector: "Christie CP4440-RGB (láser RGB)",
        resolucion: "4K",
        relacion_aspecto: "1.85:1",
        brillo_min_fl: 14
      },
      audio: { sistema: "Dolby Atmos", canales: 64, nivel_referencia_db: 85 },
      dolby_atmos: {
        altavoces_techo: 24,
        procesador: "Dolby CP950A",
        archivo_audio: "IAB (Immersive Audio Bitstream)",
        calibracion_previa: true
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-13T14:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-16T14:00:00-05:00"),
      tamano_gb: 111.1
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-14T14:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-14T15:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-14T16:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: false, fecha: null },
      { item: "Calibrar altavoces de techo Atmos", id_staff: 9, completado: false, fecha: null }
    ],
    estado_preparacion: "PENDIENTE"
  },
  {
    id_funcion: 32,
    id_sala: 4,
    id_contrato: 8,
    codigo_pelicula: "PA-PEL-008",
    fecha_hora: ISODate("2026-10-15T17:00:00-05:00"),
    formato: "3D",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: {
        proyector: "Christie CP4440-RGB (láser RGB)",
        resolucion: "4K",
        relacion_aspecto: "1.85:1",
        brillo_min_fl: 6
      },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 },
      gafas_3d: { tipo: "RealD pasivas", cantidad: 135, desinfeccion: "UV + paño microfibra", polarizador: "RealD XL" },
      evento_especial: {
        tipo: "CONVERSATORIO_CON_ARTISTA",
        invitado_id_artista: 8,
        foro_posterior_min: 45,
        moderador_id_staff: 12,
        microfonos_inalambricos: 3,
        requiere_seguridad_adicional: true
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-13T17:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-16T17:00:00-05:00"),
      tamano_gb: 206.4
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-14T17:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-14T18:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-14T19:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: false, fecha: null },
      { item: "Desinfectar y contar gafas 3D", id_staff: 6, completado: false, fecha: null },
      { item: "Calibrar polarizador 3D", id_staff: 9, completado: false, fecha: null },
      { item: "Coordinar llegada del artista invitado", id_staff: 12, completado: false, fecha: null }
    ],
    estado_preparacion: "PENDIENTE"
  },
  {
    id_funcion: 33,
    id_sala: 3,
    id_contrato: 9,
    codigo_pelicula: "PA-PEL-009",
    fecha_hora: ISODate("2026-10-15T20:00:00-05:00"),
    formato: "2D",
    idioma: "ORIGINAL",
    requisitos: {
      proyeccion: {
        proyector: "Christie CP4440-RGB (láser RGB)",
        resolucion: "4K",
        relacion_aspecto: "2.39:1",
        brillo_min_fl: 14
      },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-13T20:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-16T20:00:00-05:00"),
      tamano_gb: 114.4
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-14T20:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-14T21:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-14T22:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: false, fecha: null }
    ],
    estado_preparacion: "PENDIENTE"
  },
  {
    id_funcion: 34,
    id_sala: 3,
    id_contrato: 10,
    codigo_pelicula: "PA-PEL-010",
    fecha_hora: ISODate("2026-10-16T14:00:00-05:00"),
    formato: "3D",
    idioma: "SUBTITULADA",
    requisitos: {
      proyeccion: {
        proyector: "Christie CP4440-RGB (láser RGB)",
        resolucion: "4K",
        relacion_aspecto: "1.85:1",
        brillo_min_fl: 6
      },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 },
      gafas_3d: { tipo: "RealD pasivas", cantidad: 155, desinfeccion: "UV + paño microfibra", polarizador: "RealD XL" },
      subtitulado: {
        idioma: "es-CO",
        formato_archivo: "SMPTE-TT (XML)",
        tamano_fuente_pt: 42,
        posicion: "inferior",
        sincronia_verificada: true
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-14T14:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-17T14:00:00-05:00"),
      tamano_gb: 208
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 9, completado: true, fecha: ISODate("2026-10-15T14:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 9, completado: true, fecha: ISODate("2026-10-15T15:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 9, completado: true, fecha: ISODate("2026-10-15T16:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 9, completado: false, fecha: null },
      { item: "Desinfectar y contar gafas 3D", id_staff: 6, completado: false, fecha: null },
      { item: "Calibrar polarizador 3D", id_staff: 9, completado: false, fecha: null },
      { item: "Verificar sincronía de subtítulos", id_staff: 9, completado: false, fecha: null }
    ],
    estado_preparacion: "PENDIENTE"
  },
  {
    id_funcion: 35,
    id_sala: 2,
    id_contrato: 11,
    codigo_pelicula: "PA-PEL-011",
    fecha_hora: ISODate("2026-10-16T17:00:00-05:00"),
    formato: "2D",
    idioma: "SUBTITULADA",
    requisitos: {
      proyeccion: { proyector: "Barco SP4K-15 (láser)", resolucion: "4K", relacion_aspecto: "1.85:1", brillo_min_fl: 14 },
      audio: { sistema: "Dolby Digital 5.1", canales: 6, nivel_referencia_db: 82 },
      subtitulado: {
        idioma: "es-CO",
        formato_archivo: "SMPTE-TT (XML)",
        tamano_fuente_pt: 42,
        posicion: "inferior",
        sincronia_verificada: false
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-14T17:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-17T17:00:00-05:00"),
      tamano_gb: 121
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 8, completado: true, fecha: ISODate("2026-10-15T17:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 8, completado: true, fecha: ISODate("2026-10-15T18:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 8, completado: true, fecha: ISODate("2026-10-15T19:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 8, completado: false, fecha: null },
      { item: "Verificar sincronía de subtítulos", id_staff: 8, completado: false, fecha: null }
    ],
    estado_preparacion: "PENDIENTE"
  },
  {
    id_funcion: 36,
    id_sala: 1,
    id_contrato: 12,
    codigo_pelicula: "PA-PEL-012",
    fecha_hora: ISODate("2026-10-16T20:00:00-05:00"),
    formato: "2D",
    idioma: "SUBTITULADA",
    requisitos: {
      proyeccion: { proyector: "Barco SP4K-15 (láser)", resolucion: "4K", relacion_aspecto: "2.39:1", brillo_min_fl: 14 },
      audio: { sistema: "Dolby Digital 7.1", canales: 8, nivel_referencia_db: 82 },
      subtitulado: {
        idioma: "es-CO",
        formato_archivo: "SMPTE-TT (XML)",
        tamano_fuente_pt: 42,
        posicion: "inferior",
        sincronia_verificada: true
      },
      evento_especial: {
        tipo: "CONVERSATORIO_CON_ARTISTA",
        invitado_id_artista: 12,
        foro_posterior_min: 45,
        moderador_id_staff: 12,
        microfonos_inalambricos: 3,
        requiere_seguridad_adicional: true
      }
    },
    dcp: {
      kdm_valida_desde: ISODate("2026-10-14T20:00:00-05:00"),
      kdm_valida_hasta: ISODate("2026-10-17T20:00:00-05:00"),
      tamano_gb: 114.4
    },
    checklist: [
      { item: "Ingestar DCP y validar hash", id_staff: 8, completado: true, fecha: ISODate("2026-10-15T20:00:00-05:00") },
      { item: "Verificar KDM vigente", id_staff: 8, completado: true, fecha: ISODate("2026-10-15T21:00:00-05:00") },
      { item: "Prueba de imagen y foco", id_staff: 8, completado: true, fecha: ISODate("2026-10-15T22:00:00-05:00") },
      { item: "Prueba de sonido en sala", id_staff: 8, completado: false, fecha: null },
      { item: "Verificar sincronía de subtítulos", id_staff: 8, completado: false, fecha: null },
      { item: "Coordinar llegada del artista invitado", id_staff: 12, completado: false, fecha: null }
    ],
    estado_preparacion: "PENDIENTE"
  }
]);