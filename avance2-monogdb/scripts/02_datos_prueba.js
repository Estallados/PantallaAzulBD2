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
