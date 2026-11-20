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



// =====================================================================
// 3. RESENAS_PELICULAS (40 documentos)
// 27 reseñas verificadas (con id_venta real) y 13 no verificadas
// =====================================================================
db.resenas_peliculas.deleteMany({});   

db.resenas_peliculas.insertMany([
  {
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
  },
  {
    id_contrato: 5,
    codigo_pelicula: "PA-PEL-005",
    id_espectador: 12,
    id_venta: 2,
    autor_alias: "Melissa C.",
    calificacion: 5,
    titulo: "Orgullo colombiano",
    texto: "Una joya del cine nacional. La fotografía en blanco y negro del Amazonas es hipnótica.",
    fecha: ISODate("2026-10-06T21:07:00-05:00"),
    verificada: true,
    calificaciones_detalle: { imagen: 5, sonido: 5, comodidad: 4 },
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 2,
    codigo_pelicula: "PA-PEL-002",
    id_espectador: 28,
    id_venta: 3,
    autor_alias: "Sandra A.",
    calificacion: 5,
    titulo: "Poesía en blanco y negro",
    texto: "Cada plano es una fotografía. Yalitza Aparicio está inmensa. Ideal para verla en pantalla grande.",
    fecha: ISODate("2026-10-05T22:14:00-05:00"),
    verificada: true,
    votos_utiles: 5,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 2,
    codigo_pelicula: "PA-PEL-002",
    id_espectador: 10,
    id_venta: 4,
    autor_alias: "Tatiana R.",
    calificacion: 3,
    titulo: "Lenta",
    texto: "Hermosa visualmente pero muy lenta para mi gusto. Las sillas de la sala de autor no son tan cómodas.",
    fecha: ISODate("2026-10-05T23:21:00-05:00"),
    verificada: true,
    etiquetas: [ "familia" ],
    respuesta_empresa: {
      id_staff: 12,
      texto: "Gracias por su comentario. Tendremos en cuenta sus observaciones para mejorar la experiencia en nuestras salas.",
      fecha: ISODate("2026-10-07T08:21:00-05:00")
    },
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 3,
    codigo_pelicula: "PA-PEL-003",
    id_espectador: 3,
    id_venta: 5,
    autor_alias: "Karen V.",
    calificacion: 5,
    titulo: "Imperdible",
    texto: "Del Toro en su mejor momento. El fauno y el hombre pálido siguen dando miedo veinte años después.",
    fecha: ISODate("2026-10-06T03:28:00-05:00"),
    verificada: true,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 4,
    codigo_pelicula: "PA-PEL-004",
    id_espectador: 16,
    id_venta: 6,
    autor_alias: "Yesenia P.",
    calificacion: 4,
    titulo: "Intensa",
    texto: "Tres historias que se cruzan de forma brutal. El conversatorio con el director fue lo mejor de la noche.",
    fecha: ISODate("2026-10-06T22:35:00-05:00"),
    verificada: true,
    calificaciones_detalle: { imagen: 5, sonido: 4, comodidad: 4 },
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 6,
    codigo_pelicula: "PA-PEL-006",
    id_espectador: 16,
    id_venta: 7,
    autor_alias: "Yesenia P.",
    calificacion: 3,
    texto: "Interesante pero confusa. Hay que estar muy atento para entender quién es quién.",
    fecha: ISODate("2026-10-07T05:42:00-05:00"),
    verificada: true,
    etiquetas: [ "fotografía", "actuaciones" ],
    respuesta_empresa: {
      id_staff: 12,
      texto: "Gracias por su comentario. Tendremos en cuenta sus observaciones para mejorar la experiencia en nuestras salas.",
      fecha: ISODate("2026-10-08T17:42:00-05:00")
    },
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 5,
    codigo_pelicula: "PA-PEL-005",
    id_espectador: 4,
    id_venta: 8,
    autor_alias: "Camilo M.",
    calificacion: 4,
    texto: "Gran película, pero los subtítulos de los diálogos en cubeo a veces iban desfasados.",
    fecha: ISODate("2026-10-07T03:49:00-05:00"),
    verificada: true,
    votos_utiles: 10,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 10,
    codigo_pelicula: "PA-PEL-010",
    id_espectador: 16,
    id_venta: 9,
    autor_alias: "Yesenia P.",
    calificacion: 5,
    titulo: "Brutal",
    texto: "Ritmo frenético, montaje impecable. Sigue siendo igual de impactante.",
    fecha: ISODate("2026-10-09T01:56:00-05:00"),
    verificada: true,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 1,
    codigo_pelicula: "PA-PEL-001",
    id_espectador: 29,
    id_venta: 10,
    autor_alias: "Jorge M.",
    calificacion: 4,
    titulo: "Muy buena",
    texto: "Excelente película, aunque el sonido en la sala estuvo un poco bajo en las escenas de diálogo.",
    fecha: ISODate("2026-10-06T02:03:00-05:00"),
    verificada: true,
    etiquetas: [ "familia" ],
    calificaciones_detalle: { imagen: 5, sonido: 3, comodidad: 4 },
    respuesta_empresa: {
      id_staff: 12,
      texto: "¡Gracias por acompañarnos! Nos alegra que haya disfrutado la función. Lo esperamos en la próxima.",
      fecha: ISODate("2026-10-08T15:03:00-05:00")
    },
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 6,
    codigo_pelicula: "PA-PEL-006",
    id_espectador: 36,
    id_venta: 11,
    autor_alias: "Stephanie Z.",
    calificacion: 4,
    titulo: "Atmósfera asfixiante",
    texto: "Martel crea un ambiente pesadísimo con el sonido. Muy recomendada para cinéfilos.",
    fecha: ISODate("2026-10-07T09:10:00-05:00"),
    verificada: true,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 3,
    codigo_pelicula: "PA-PEL-003",
    id_espectador: 36,
    id_venta: 12,
    autor_alias: "Stephanie Z.",
    calificacion: 5,
    texto: "La versión remasterizada se ve espectacular en la sala premium.",
    fecha: ISODate("2026-10-06T10:17:00-05:00"),
    verificada: true,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 7,
    codigo_pelicula: "PA-PEL-007",
    id_espectador: 3,
    id_venta: 14,
    autor_alias: "Karen V.",
    calificacion: 5,
    titulo: "Almodóvar puro",
    texto: "Emotiva, divertida y trágica a la vez. Cecilia Roth está perfecta.",
    fecha: ISODate("2026-10-08T05:24:00-05:00"),
    verificada: true,
    etiquetas: [ "fotografía", "actuaciones" ],
    votos_utiles: 15,
    respuesta_empresa: {
      id_staff: 12,
      texto: "¡Gracias por acompañarnos! Nos alegra que haya disfrutado la función. Lo esperamos en la próxima.",
      fecha: ISODate("2026-10-10T21:24:00-05:00")
    },
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 2,
    codigo_pelicula: "PA-PEL-002",
    id_espectador: 16,
    id_venta: 15,
    autor_alias: "Yesenia P.",
    calificacion: 4,
    texto: "Me encantó el foro de cineclub al final, le dio otra dimensión a la película.",
    fecha: ISODate("2026-10-10T09:31:00-05:00"),
    verificada: true,
    calificaciones_detalle: { imagen: 5, sonido: 4, comodidad: 4 },
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 9,
    codigo_pelicula: "PA-PEL-009",
    id_espectador: 6,
    id_venta: 16,
    autor_alias: "Jhon D.",
    calificacion: 5,
    titulo: "Necesaria",
    texto: "Daniela Vega sostiene la película con una fuerza enorme. Una historia que todos deberían ver.",
    fecha: ISODate("2026-10-08T13:38:00-05:00"),
    verificada: true,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 7,
    codigo_pelicula: "PA-PEL-007",
    id_espectador: 4,
    id_venta: 17,
    autor_alias: "Camilo M.",
    calificacion: 4,
    texto: "Muy buena; la proyección tuvo un corte de unos minutos pero la reanudaron rápido.",
    fecha: ISODate("2026-10-08T08:45:00-05:00"),
    verificada: true,
    etiquetas: [ "familia" ],
    respuesta_empresa: {
      id_staff: 12,
      texto: "¡Gracias por acompañarnos! Nos alegra que haya disfrutado la función. Lo esperamos en la próxima.",
      fecha: ISODate("2026-10-11T03:45:00-05:00")
    },
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 8,
    codigo_pelicula: "PA-PEL-008",
    id_espectador: 31,
    id_venta: 18,
    autor_alias: "Leonardo L.",
    calificacion: 5,
    titulo: "Final inolvidable",
    texto: "El plano secuencia del estadio es de las mejores escenas del cine latinoamericano.",
    fecha: ISODate("2026-10-08T12:52:00-05:00"),
    verificada: true,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 1,
    codigo_pelicula: "PA-PEL-001",
    id_espectador: 7,
    id_venta: 19,
    autor_alias: "Daniel T.",
    calificacion: 5,
    texto: "Vista en la sala premium con Dolby Atmos: la escena de la lluvia se siente encima de uno.",
    fecha: ISODate("2026-10-10T10:59:00-05:00"),
    verificada: true,
    calificaciones_detalle: { imagen: 5, sonido: 5, comodidad: 4 },
    votos_utiles: 20,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 11,
    codigo_pelicula: "PA-PEL-011",
    id_espectador: 34,
    id_venta: 22,
    autor_alias: "Liliana S.",
    calificacion: 5,
    titulo: "Conmovedora",
    texto: "Fernanda Montenegro es una fuerza de la naturaleza. Salí llorando.",
    fecha: ISODate("2026-10-09T14:06:00-05:00"),
    verificada: true,
    etiquetas: [ "fotografía", "actuaciones" ],
    respuesta_empresa: {
      id_staff: 12,
      texto: "¡Gracias por acompañarnos! Nos alegra que haya disfrutado la función. Lo esperamos en la próxima.",
      fecha: ISODate("2026-10-12T12:06:00-05:00")
    },
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 9,
    codigo_pelicula: "PA-PEL-009",
    id_espectador: 23,
    id_venta: 24,
    autor_alias: "Edwin M.",
    calificacion: 5,
    titulo: "Necesaria",
    texto: "Daniela Vega sostiene la película con una fuerza enorme. Una historia que todos deberían ver.",
    fecha: ISODate("2026-10-08T18:13:00-05:00"),
    verificada: true,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 8,
    codigo_pelicula: "PA-PEL-008",
    id_espectador: 15,
    id_venta: 25,
    autor_alias: "Cristian G.",
    calificacion: 4,
    texto: "Darín nunca falla. El sonido estuvo perfecto en la sala Candelaria.",
    fecha: ISODate("2026-10-07T20:20:00-05:00"),
    verificada: true,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 5,
    codigo_pelicula: "PA-PEL-005",
    id_espectador: 17,
    id_venta: 26,
    autor_alias: "Fabián C.",
    calificacion: 5,
    titulo: "Hay que verla",
    texto: "La vi con mis hijos adolescentes y abrió una conversación enorme sobre la colonización.",
    fecha: ISODate("2026-10-10T21:27:00-05:00"),
    verificada: true,
    etiquetas: [ "familia" ],
    calificaciones_detalle: { imagen: 5, sonido: 5, comodidad: 4 },
    respuesta_empresa: {
      id_staff: 12,
      texto: "¡Gracias por acompañarnos! Nos alegra que haya disfrutado la función. Lo esperamos en la próxima.",
      fecha: ISODate("2026-10-13T22:27:00-05:00")
    },
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 10,
    codigo_pelicula: "PA-PEL-010",
    id_espectador: 12,
    id_venta: 28,
    autor_alias: "Melissa C.",
    calificacion: 4,
    texto: "Muy violenta pero brillante. La imagen en la sala Bolívar estuvo algo oscura.",
    fecha: ISODate("2026-10-08T19:34:00-05:00"),
    verificada: true,
    votos_utiles: 25,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 12,
    codigo_pelicula: "PA-PEL-012",
    id_espectador: 20,
    id_venta: 35,
    autor_alias: "Diana S.",
    calificacion: 4,
    titulo: "Clásico de terror",
    texto: "Atmósfera perfecta, sin sustos baratos. El conversatorio con Amenábar fue un lujo.",
    fecha: ISODate("2026-10-09T02:41:00-05:00"),
    verificada: true,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 3,
    codigo_pelicula: "PA-PEL-003",
    id_espectador: 20,
    id_venta: 42,
    autor_alias: "Diana S.",
    calificacion: 2,
    titulo: "No es para niños",
    texto: "Pensé que era una película infantil por el fauno; es muy violenta. Debieron advertirlo mejor en taquilla.",
    fecha: ISODate("2026-10-10T03:48:00-05:00"),
    verificada: true,
    etiquetas: [ "fotografía", "actuaciones" ],
    respuesta_empresa: {
      id_staff: 12,
      texto: "Lamentamos mucho su experiencia. Ya escalamos el caso al equipo técnico de la sala y le enviamos al correo una boleta de cortesía.",
      fecha: ISODate("2026-10-11T08:48:00-05:00")
    },
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 6,
    codigo_pelicula: "PA-PEL-006",
    id_espectador: 3,
    id_venta: 46,
    autor_alias: "Karen V.",
    calificacion: 3,
    texto: "Interesante pero confusa. Hay que estar muy atento para entender quién es quién.",
    fecha: ISODate("2026-10-11T04:55:00-05:00"),
    verificada: true,
    calificaciones_detalle: { imagen: 4, sonido: 3, comodidad: 4 },
    respuesta_empresa: {
      id_staff: 12,
      texto: "Gracias por su comentario. Tendremos en cuenta sus observaciones para mejorar la experiencia en nuestras salas.",
      fecha: ISODate("2026-10-13T11:55:00-05:00")
    },
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 4,
    codigo_pelicula: "PA-PEL-004",
    id_espectador: 36,
    id_venta: 47,
    autor_alias: "Stephanie Z.",
    calificacion: 5,
    texto: "Gael García Bernal impresionante. La función con invitado especial valió cada peso.",
    fecha: ISODate("2026-10-10T23:02:00-05:00"),
    verificada: true,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 1,
    codigo_pelicula: "PA-PEL-001",
    id_espectador: 9,
    id_venta: null,
    autor_alias: "Sergio S.",
    calificacion: 5,
    titulo: "Mi favorita del ciclo",
    texto: "La había visto en casa pero en pantalla grande es otra película. Volveré con mis amigos.",
    fecha: ISODate("2026-10-06T21:00:00-05:00"),
    verificada: false,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 3,
    codigo_pelicula: "PA-PEL-003",
    id_espectador: 13,
    id_venta: null,
    autor_alias: "Hernán O.",
    calificacion: 4,
    texto: "Me gustó mucho, aunque esperaba que la proyectaran también doblada para mi mamá.",
    fecha: ISODate("2026-10-07T21:13:00-05:00"),
    verificada: false,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 5,
    codigo_pelicula: "PA-PEL-005",
    id_espectador: 14,
    id_venta: null,
    autor_alias: "Viviana P.",
    calificacion: 5,
    titulo: "Hermosa",
    texto: "Qué bueno que Pantalla Azul programe cine colombiano en horario estelar.",
    fecha: ISODate("2026-10-08T21:26:00-05:00"),
    verificada: false,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 8,
    codigo_pelicula: "PA-PEL-008",
    id_espectador: 2,
    id_venta: null,
    autor_alias: "Juan C.",
    calificacion: 3,
    texto: "Buena película pero la fila de confitería era eterna y casi me pierdo el inicio.",
    fecha: ISODate("2026-10-09T21:39:00-05:00"),
    verificada: false,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 10,
    codigo_pelicula: "PA-PEL-010",
    id_espectador: null,
    id_venta: null,
    autor_alias: "CinefiloBogota",
    calificacion: 5,
    titulo: "Clásico absoluto",
    texto: "Montaje, música y actuaciones al máximo nivel. Diez de diez.",
    fecha: ISODate("2026-10-10T21:52:00-05:00"),
    verificada: false,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 12,
    codigo_pelicula: "PA-PEL-012",
    id_espectador: null,
    id_venta: null,
    autor_alias: "LaCriticaDeLaSeptima",
    calificacion: 1,
    titulo: "Spoiler: el final",
    texto: "No me gustó el final, cuando se revela que la familia... no lo voy a contar completo pero es predecible.",
    fecha: ISODate("2026-10-11T22:05:00-05:00"),
    verificada: false,
    spoiler: true,
    estado_moderacion: "EN_REVISION"
  },
  {
    id_contrato: 1,
    codigo_pelicula: "PA-PEL-001",
    id_espectador: null,
    id_venta: null,
    autor_alias: "ana_m",
    calificacion: 4,
    texto: "Bien, aunque los comerciales antes de la función duraron demasiado.",
    fecha: ISODate("2026-10-12T22:18:00-05:00"),
    verificada: false,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 7,
    codigo_pelicula: "PA-PEL-007",
    id_espectador: null,
    id_venta: null,
    autor_alias: "Pepe_Cine",
    calificacion: 2,
    titulo: "Experiencia regular",
    texto: "La película es buena, pero el aire acondicionado no funcionaba y hacía muchísimo calor en la sala.",
    fecha: ISODate("2026-10-13T22:31:00-05:00"),
    verificada: false,
    estado_moderacion: "PUBLICADA",
    respuesta_empresa: {
      id_staff: 12,
      texto: "Lamentamos mucho su experiencia. Ya escalamos el caso al equipo técnico de la sala y le enviamos al correo una boleta de cortesía.",
      fecha: ISODate("2026-10-14T18:31:00-05:00")
    }
  },
  {
    id_contrato: 3,
    codigo_pelicula: "PA-PEL-003",
    id_espectador: null,
    id_venta: null,
    autor_alias: "Laura R.",
    calificacion: 5,
    texto: "La vi dos veces. La música de Javier Navarrete es preciosa.",
    fecha: ISODate("2026-10-14T22:44:00-05:00"),
    verificada: false,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 4,
    codigo_pelicula: "PA-PEL-004",
    id_espectador: null,
    id_venta: null,
    autor_alias: "spamcinema",
    calificacion: 1,
    titulo: "OFERTA",
    texto: "Compre boletas baratas en mi página web, envíe mensaje para más información de descuentos.",
    fecha: ISODate("2026-10-15T22:57:00-05:00"),
    verificada: false,
    estado_moderacion: "OCULTA"
  },
  {
    id_contrato: 9,
    codigo_pelicula: "PA-PEL-009",
    id_espectador: null,
    id_venta: null,
    autor_alias: "Mateo_T",
    calificacion: 4,
    texto: "Valiente y muy bien actuada. Merece más funciones.",
    fecha: ISODate("2026-10-16T23:10:00-05:00"),
    verificada: false,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 11,
    codigo_pelicula: "PA-PEL-011",
    id_espectador: null,
    id_venta: null,
    autor_alias: "Rosa Elvira",
    calificacion: 5,
    titulo: "Para llorar",
    texto: "Me recordó a mi abuela. Gracias por traer estas películas a la ciudad.",
    fecha: ISODate("2026-10-17T23:23:00-05:00"),
    verificada: false,
    estado_moderacion: "PUBLICADA"
  },
  {
    id_contrato: 2,
    codigo_pelicula: "PA-PEL-002",
    id_espectador: null,
    id_venta: null,
    autor_alias: "jcamilo",
    calificacion: 4,
    texto: "Fotografía impresionante, la mejor experiencia de sonido que he tenido en Bogotá.",
    fecha: ISODate("2026-10-06T23:36:00-05:00"),
    verificada: false,
    estado_moderacion: "PUBLICADA"
  }
]);





// 4. REPORTES_INCIDENTES (33 documentos)
// Fallas técnicas, quejas de servicio e incidentes de seguridad

db.reportes_incidentes.deleteMany({});   // limpia la colección para poder ejecutar el script varias veces

db.reportes_incidentes.insertMany([
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
      {
        fecha: ISODate("2026-10-02T13:00:00-05:00"),
        id_staff: 2,
        accion: "Se verificó la venta; la tarifa estaba bien aplicada (factor 0,60)."
      }
    ],
    fecha_cierre: ISODate("2026-10-02T13:00:00-05:00")
  },
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
      {
        fecha: ISODate("2026-10-05T14:58:00-05:00"),
        id_staff: 8,
        accion: "Se recargó el archivo SMPTE-TT y se reanudó la función."
      },
      {
        fecha: ISODate("2026-10-06T09:00:00-05:00"),
        id_staff: 12,
        accion: "Caso cerrado; se agregó verificación de subtítulos al checklist."
      }
    ],
    fecha_cierre: ISODate("2026-10-06T09:00:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0003",
    tipo: "QUEJA_SERVICIO",
    fecha_reporte: ISODate("2026-10-05T16:30:00-05:00"),
    id_sala: 6,
    id_funcion: 2,
    reportado_por: { rol: "ESPECTADOR", id_espectador: 10 },
    severidad: "BAJA",
    estado: "CERRADO",
    descripcion: "Butacas de la sala de autor incómodas, varias con el espaldar flojo.",
    detalle: { area: "ACOMODACION", canal_queja: "WEB", compensacion: { tipo: "NINGUNA", valor: 0 } },
    seguimiento: [ { fecha: ISODate("2026-10-07T09:00:00-05:00"), id_staff: 12, accion: "Mantenimiento ajustó 9 butacas." } ],
    fecha_cierre: ISODate("2026-10-07T09:00:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0004",
    tipo: "FALLA_TECNICA",
    fecha_reporte: ISODate("2026-10-05T20:41:00-05:00"),
    id_sala: 5,
    id_funcion: 3,
    reportado_por: { rol: "STAFF", id_staff: 9 },
    severidad: "BAJA",
    estado: "CERRADO",
    descripcion: "Ruido de fondo en un altavoz de techo durante la función premium.",
    detalle: {
      categoria: "AUDIO",
      equipo: "Altavoz de techo Dolby Atmos #14",
      minutos_interrupcion: 0,
      funcion_reprogramada: false,
      repuestos: [ { pieza: "Cable XLR 10 m", cantidad: 1, costo: 85000 } ]
    },
    seguimiento: [
      { fecha: ISODate("2026-10-06T10:00:00-05:00"), id_staff: 9, accion: "Cable reemplazado y altavoz recalibrado." }
    ],
    fecha_cierre: ISODate("2026-10-06T10:00:00-05:00")
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
      {
        fecha: ISODate("2026-10-05T21:50:00-05:00"),
        id_staff: 12,
        accion: "Paramédicos atendieron; el espectador se retiró por sus propios medios."
      }
    ],
    fecha_cierre: ISODate("2026-10-05T22:00:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0006",
    tipo: "FALLA_TECNICA",
    fecha_reporte: ISODate("2026-10-06T17:20:00-05:00"),
    id_sala: 4,
    id_funcion: 5,
    reportado_por: { rol: "STAFF", id_staff: 9 },
    severidad: "ALTA",
    estado: "CERRADO",
    descripcion: "El polarizador 3D se sobrecalentó y la imagen perdió brillo.",
    detalle: {
      categoria: "SISTEMA_3D",
      equipo: "Polarizador RealD XL sala 4",
      codigo_error: "RD-TEMP-07",
      minutos_interrupcion: 14,
      funcion_reprogramada: false
    },
    seguimiento: [
      { fecha: ISODate("2026-10-06T17:34:00-05:00"), id_staff: 9, accion: "Se pasó a proyección 2D para terminar la función." },
      {
        fecha: ISODate("2026-10-07T11:00:00-05:00"),
        id_staff: 12,
        accion: "Proveedor reemplazó el ventilador del polarizador."
      }
    ],
    fecha_cierre: ISODate("2026-10-07T11:00:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0007",
    tipo: "QUEJA_SERVICIO",
    fecha_reporte: ISODate("2026-10-06T19:50:00-05:00"),
    id_sala: null,
    id_funcion: 6,
    reportado_por: { rol: "ESPECTADOR", id_espectador: 16 },
    severidad: "MEDIA",
    estado: "CERRADO",
    descripcion: "Fila de confitería de más de 25 minutos; la espectadora perdió el inicio.",
    detalle: { area: "CONFITERIA", canal_queja: "APP", id_venta: 7, compensacion: { tipo: "BONO_CONFITERIA", valor: 15000 } },
    seguimiento: [
      {
        fecha: ISODate("2026-10-07T10:00:00-05:00"),
        id_staff: 12,
        accion: "Se envió bono de confitería y se reforzó el turno de 20:00."
      }
    ],
    fecha_cierre: ISODate("2026-10-07T10:00:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0008",
    tipo: "FALLA_TECNICA",
    fecha_reporte: ISODate("2026-10-07T14:35:00-05:00"),
    id_sala: 3,
    id_funcion: 7,
    reportado_por: { rol: "STAFF", id_staff: 6 },
    severidad: "ALTA",
    estado: "CERRADO",
    descripcion: "Corte de imagen por reinicio del servidor de cine.",
    detalle: {
      categoria: "PROYECCION",
      equipo: "Servidor de cine IMS3000 sala 3",
      codigo_error: "IMS-REBOOT",
      minutos_interrupcion: 9,
      funcion_reprogramada: false
    },
    seguimiento: [
      {
        fecha: ISODate("2026-10-07T14:44:00-05:00"),
        id_staff: 9,
        accion: "Servidor reiniciado, función reanudada en el minuto 31."
      },
      { fecha: ISODate("2026-10-08T08:30:00-05:00"), id_staff: 12, accion: "Actualización de firmware programada." }
    ],
    fecha_cierre: ISODate("2026-10-08T08:30:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0009",
    tipo: "SEGURIDAD",
    fecha_reporte: ISODate("2026-10-07T18:20:00-05:00"),
    id_sala: null,
    reportado_por: { rol: "STAFF", id_staff: 10 },
    severidad: "MEDIA",
    estado: "CERRADO",
    descripcion: "Hurto de un celular en la zona de confitería.",
    detalle: {
      categoria: "HURTO",
      personas_involucradas: 2,
      requirio_evacuacion: false,
      autoridades_notificadas: [ "Policía Nacional - CAI cercano" ]
    },
    seguimiento: [
      {
        fecha: ISODate("2026-10-07T18:30:00-05:00"),
        id_staff: 12,
        accion: "Se entregaron grabaciones de cámaras a la Policía."
      }
    ],
    fecha_cierre: ISODate("2026-10-08T10:00:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0010",
    tipo: "FALLA_TECNICA",
    fecha_reporte: ISODate("2026-10-07T20:05:00-05:00"),
    id_sala: 1,
    id_funcion: 9,
    reportado_por: { rol: "ESPECTADOR", id_espectador: 6 },
    severidad: "MEDIA",
    estado: "RESUELTO",
    descripcion: "Espectador reporta imagen oscura en la sala Bolívar.",
    detalle: {
      categoria: "PROYECCION",
      equipo: "Proyector Barco SP4K-15 sala 1",
      minutos_interrupcion: 0,
      funcion_reprogramada: false
    },
    seguimiento: [
      {
        fecha: ISODate("2026-10-08T10:00:00-05:00"),
        id_staff: 8,
        accion: "Se midieron 11 fL; se ajustó la potencia del láser a 14 fL."
      }
    ],
    fecha_cierre: null
  },
  {
    codigo_incidente: "INC-2026-0011",
    tipo: "QUEJA_SERVICIO",
    fecha_reporte: ISODate("2026-10-07T21:40:00-05:00"),
    id_sala: 1,
    id_funcion: 9,
    reportado_por: { rol: "ESPECTADOR", id_espectador: 23 },
    severidad: "BAJA",
    estado: "CERRADO",
    descripcion: "Sala con restos de crispetas de la función anterior.",
    detalle: { area: "ASEO", canal_queja: "PRESENCIAL", id_venta: 24, compensacion: { tipo: "NINGUNA", valor: 0 } },
    seguimiento: [ { fecha: ISODate("2026-10-07T21:50:00-05:00"), id_staff: 5, accion: "Se reforzó el aseo entre funciones." } ],
    fecha_cierre: ISODate("2026-10-07T21:50:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0012",
    tipo: "SEGURIDAD",
    fecha_reporte: ISODate("2026-10-08T17:40:00-05:00"),
    id_sala: 6,
    id_funcion: 11,
    reportado_por: { rol: "STAFF", id_staff: 7 },
    severidad: "MEDIA",
    estado: "CERRADO",
    descripcion: "Discusión entre dos espectadores por puestos durante el cineclub.",
    detalle: { categoria: "ALTERCADO", personas_involucradas: 2, requirio_evacuacion: false, lesionados: 0 },
    seguimiento: [
      { fecha: ISODate("2026-10-08T17:45:00-05:00"), id_staff: 7, accion: "Se reubicó a uno de los espectadores." }
    ],
    fecha_cierre: ISODate("2026-10-08T17:45:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0013",
    tipo: "FALLA_TECNICA",
    fecha_reporte: ISODate("2026-10-08T20:10:00-05:00"),
    id_sala: 5,
    id_funcion: 12,
    reportado_por: { rol: "STAFF", id_staff: 9 },
    severidad: "ALTA",
    estado: "CERRADO",
    descripcion: "Distorsión en graves del sistema Dolby Atmos durante Los otros.",
    detalle: {
      categoria: "AUDIO",
      equipo: "Procesador Dolby CP950A",
      codigo_error: "ATMOS-BASS-CLIP",
      minutos_interrupcion: 0,
      funcion_reprogramada: false
    },
    seguimiento: [
      { fecha: ISODate("2026-10-09T09:00:00-05:00"), id_staff: 9, accion: "Recalibración completa de subwoofers." },
      { fecha: ISODate("2026-10-09T12:00:00-05:00"), id_staff: 12, accion: "Se respondió a las reseñas relacionadas." }
    ],
    fecha_cierre: ISODate("2026-10-09T12:00:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0014",
    tipo: "QUEJA_SERVICIO",
    fecha_reporte: ISODate("2026-10-08T22:10:00-05:00"),
    id_sala: 5,
    id_funcion: 12,
    reportado_por: { rol: "ESPECTADOR", id_espectador: 20 },
    severidad: "ALTA",
    estado: "CERRADO",
    descripcion: "Mala calidad de audio en función premium; solicita reembolso.",
    detalle: { area: "ACOMODACION", canal_queja: "WEB", id_venta: 35, compensacion: { tipo: "BOLETA_CORTESIA", valor: 32000 } },
    seguimiento: [
      { fecha: ISODate("2026-10-09T12:00:00-05:00"), id_staff: 12, accion: "Se entregó boleta de cortesía para sala premium." }
    ],
    fecha_cierre: ISODate("2026-10-09T12:00:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0015",
    tipo: "QUEJA_SERVICIO",
    fecha_reporte: ISODate("2026-10-09T15:10:00-05:00"),
    id_sala: null,
    reportado_por: { rol: "ESPECTADOR", id_espectador: 3 },
    severidad: "MEDIA",
    estado: "CERRADO",
    descripcion: "Se cobró dos veces una compra web.",
    detalle: { area: "VENTA_WEB", canal_queja: "CORREO", id_venta: 46, compensacion: { tipo: "REEMBOLSO", valor: 54000 } },
    seguimiento: [
      { fecha: ISODate("2026-10-09T16:00:00-05:00"), id_staff: 12, accion: "Se verificó el doble cobro con la pasarela." },
      { fecha: ISODate("2026-10-11T10:00:00-05:00"), id_staff: 12, accion: "Reembolso aplicado." }
    ],
    fecha_cierre: ISODate("2026-10-11T10:00:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0016",
    tipo: "FALLA_TECNICA",
    fecha_reporte: ISODate("2026-10-09T17:05:00-05:00"),
    id_sala: 4,
    id_funcion: 14,
    reportado_por: { rol: "STAFF", id_staff: 9 },
    severidad: "MEDIA",
    estado: "CERRADO",
    descripcion: "Aire acondicionado de la sala Guadalupe sin enfriar.",
    detalle: {
      categoria: "CLIMATIZACION",
      equipo: "Unidad manejadora de aire UMA-4",
      minutos_interrupcion: 0,
      funcion_reprogramada: false,
      repuestos: [ { pieza: "Correa del ventilador", cantidad: 1, costo: 120000 } ]
    },
    seguimiento: [
      { fecha: ISODate("2026-10-10T08:00:00-05:00"), id_staff: 12, accion: "Técnico externo reemplazó la correa." }
    ],
    fecha_cierre: ISODate("2026-10-10T08:00:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0017",
    tipo: "SEGURIDAD",
    fecha_reporte: ISODate("2026-10-09T20:15:00-05:00"),
    id_sala: 3,
    id_funcion: 15,
    reportado_por: { rol: "STAFF", id_staff: 6 },
    severidad: "CRITICA",
    estado: "CERRADO",
    descripcion: "Activación de la alarma de humo; se evacua la sala Monserrate.",
    detalle: {
      categoria: "EVACUACION",
      personas_involucradas: 96,
      requirio_evacuacion: true,
      lesionados: 0,
      autoridades_notificadas: [ "Bomberos Bogotá" ]
    },
    seguimiento: [
      { fecha: ISODate("2026-10-09T20:16:00-05:00"), id_staff: 6, accion: "Evacuación completada en 4 minutos." },
      {
        fecha: ISODate("2026-10-09T20:40:00-05:00"),
        id_staff: 12,
        accion: "Bomberos confirman falsa alarma por máquina de humo de evento."
      },
      { fecha: ISODate("2026-10-09T20:55:00-05:00"), id_staff: 9, accion: "Función reanudada." }
    ],
    fecha_cierre: ISODate("2026-10-09T21:00:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0018",
    tipo: "FALLA_TECNICA",
    fecha_reporte: ISODate("2026-10-10T11:15:00-05:00"),
    id_sala: null,
    reportado_por: { rol: "STAFF", id_staff: 1 },
    severidad: "CRITICA",
    estado: "CERRADO",
    descripcion: "Caída de la pasarela de pagos de la venta web durante 40 minutos.",
    detalle: {
      categoria: "SISTEMA_VENTAS",
      equipo: "Pasarela de pagos web/app",
      codigo_error: "PAY-503",
      minutos_interrupcion: 40,
      funcion_reprogramada: false
    },
    seguimiento: [
      { fecha: ISODate("2026-10-10T11:20:00-05:00"), id_staff: 12, accion: "Se activó la venta solo por taquilla." },
      { fecha: ISODate("2026-10-10T11:55:00-05:00"), id_staff: 12, accion: "Proveedor restableció el servicio." }
    ],
    fecha_cierre: ISODate("2026-10-10T12:30:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0019",
    tipo: "QUEJA_SERVICIO",
    fecha_reporte: ISODate("2026-10-10T11:35:00-05:00"),
    id_sala: null,
    reportado_por: { rol: "ESPECTADOR", id_espectador: 27 },
    severidad: "MEDIA",
    estado: "CERRADO",
    descripcion: "No pudo comprar en la web durante la caída de la pasarela.",
    detalle: { area: "VENTA_WEB", canal_queja: "WEB", compensacion: { tipo: "NINGUNA", valor: 0 } },
    seguimiento: [
      { fecha: ISODate("2026-10-10T12:40:00-05:00"), id_staff: 12, accion: "Se informó que el servicio fue restablecido." }
    ],
    fecha_cierre: ISODate("2026-10-10T12:40:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0020",
    tipo: "FALLA_TECNICA",
    fecha_reporte: ISODate("2026-10-10T13:40:00-05:00"),
    id_sala: 3,
    id_funcion: 16,
    reportado_por: { rol: "STAFF", id_staff: 6 },
    severidad: "BAJA",
    estado: "CERRADO",
    descripcion: "La sala Monserrate quedó fría por exceso de aire acondicionado.",
    detalle: { categoria: "CLIMATIZACION", equipo: "Termostato sala 3", minutos_interrupcion: 0, funcion_reprogramada: false },
    seguimiento: [ { fecha: ISODate("2026-10-10T13:55:00-05:00"), id_staff: 6, accion: "Termostato ajustado a 22 °C." } ],
    fecha_cierre: ISODate("2026-10-10T13:55:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0021",
    tipo: "QUEJA_SERVICIO",
    fecha_reporte: ISODate("2026-10-10T18:00:00-05:00"),
    id_sala: 2,
    id_funcion: 17,
    reportado_por: { rol: "ESPECTADOR", id_espectador: 17 },
    severidad: "BAJA",
    estado: "CERRADO",
    descripcion: "El acomodador no estaba en la entrada de la sala al iniciar la función.",
    detalle: { area: "ACOMODACION", canal_queja: "PRESENCIAL", id_venta: 26, compensacion: { tipo: "NINGUNA", valor: 0 } },
    seguimiento: [
      {
        fecha: ISODate("2026-10-11T09:00:00-05:00"),
        id_staff: 12,
        accion: "Se ajustó el turno de acomodadores para la sala 2."
      }
    ],
    fecha_cierre: ISODate("2026-10-11T09:00:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0022",
    tipo: "QUEJA_SERVICIO",
    fecha_reporte: ISODate("2026-10-11T09:30:00-05:00"),
    id_sala: null,
    reportado_por: { rol: "ESPECTADOR", id_espectador: 28 },
    severidad: "BAJA",
    estado: "RESUELTO",
    descripcion: "La app no muestra el código QR de la boleta comprada.",
    detalle: { area: "APP", canal_queja: "APP", id_venta: 29, compensacion: { tipo: "NINGUNA", valor: 0 } },
    seguimiento: [
      { fecha: ISODate("2026-10-11T10:15:00-05:00"), id_staff: 12, accion: "Se reenvió la boleta al correo del espectador." }
    ],
    fecha_cierre: null
  },
  {
    codigo_incidente: "INC-2026-0023",
    tipo: "SEGURIDAD",
    fecha_reporte: ISODate("2026-10-11T16:40:00-05:00"),
    id_sala: 6,
    id_funcion: 20,
    reportado_por: { rol: "STAFF", id_staff: 12 },
    severidad: "ALTA",
    estado: "CERRADO",
    descripcion: "Persona sin acreditación intentó ingresar al camerino del artista invitado.",
    detalle: { categoria: "ACCESO_NO_AUTORIZADO", personas_involucradas: 1, requirio_evacuacion: false },
    seguimiento: [
      {
        fecha: ISODate("2026-10-11T16:45:00-05:00"),
        id_staff: 12,
        accion: "Se reforzó el control de acceso con un supervisor."
      }
    ],
    fecha_cierre: ISODate("2026-10-11T16:45:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0024",
    tipo: "FALLA_TECNICA",
    fecha_reporte: ISODate("2026-10-12T19:30:00-05:00"),
    id_sala: 3,
    id_funcion: 24,
    reportado_por: { rol: "STAFF", id_staff: 9 },
    severidad: "MEDIA",
    estado: "EN_PROCESO",
    descripcion: "Lámpara de emergencia del pasillo izquierdo parpadea durante la función.",
    detalle: {
      categoria: "ELECTRICA",
      equipo: "Luminaria de emergencia L-3-07",
      minutos_interrupcion: 0,
      funcion_reprogramada: false
    },
    seguimiento: [ { fecha: ISODate("2026-10-13T09:00:00-05:00"), id_staff: 12, accion: "Se solicitó repuesto al proveedor." } ],
    fecha_cierre: null
  },
  {
    codigo_incidente: "INC-2026-0025",
    tipo: "SEGURIDAD",
    fecha_reporte: ISODate("2026-10-12T20:30:00-05:00"),
    id_sala: 3,
    id_funcion: 24,
    reportado_por: { rol: "STAFF", id_staff: 6 },
    severidad: "MEDIA",
    estado: "RESUELTO",
    descripcion: "Caída de una espectadora en las escaleras por iluminación deficiente.",
    detalle: { categoria: "EMERGENCIA_MEDICA", personas_involucradas: 1, requirio_evacuacion: false, lesionados: 1 },
    seguimiento: [
      {
        fecha: ISODate("2026-10-12T20:35:00-05:00"),
        id_staff: 6,
        accion: "Atención de primeros auxilios; golpe leve en la rodilla."
      }
    ],
    fecha_cierre: null
  },
  {
    codigo_incidente: "INC-2026-0026",
    tipo: "FALLA_TECNICA",
    fecha_reporte: ISODate("2026-10-14T18:45:00-05:00"),
    id_sala: 5,
    id_funcion: 30,
    reportado_por: { rol: "STAFF", id_staff: 9 },
    severidad: "CRITICA",
    estado: "CERRADO",
    descripcion: "Falla de la tarjeta de un proyector láser IMAX; la función se cancela.",
    detalle: {
      categoria: "PROYECCION",
      equipo: "Proyector láser IMAX (unidad B)",
      codigo_error: "IMAX-LSR-B-FAIL",
      minutos_interrupcion: 0,
      funcion_reprogramada: true,
      repuestos: [ { pieza: "Tarjeta controladora láser", cantidad: 1, costo: 9800000 } ]
    },
    seguimiento: [
      {
        fecha: ISODate("2026-10-14T18:50:00-05:00"),
        id_staff: 12,
        accion: "Se cancela la función 30 y se anulan las ventas en PostgreSQL."
      },
      { fecha: ISODate("2026-10-17T15:00:00-05:00"), id_staff: 9, accion: "Tarjeta instalada y certificación IMAX revalidada." }
    ],
    fecha_cierre: ISODate("2026-10-17T15:00:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0027",
    tipo: "QUEJA_SERVICIO",
    fecha_reporte: ISODate("2026-10-14T19:05:00-05:00"),
    id_sala: 5,
    id_funcion: 30,
    reportado_por: { rol: "ESPECTADOR", id_espectador: 35 },
    severidad: "ALTA",
    estado: "CERRADO",
    descripcion: "Función cancelada: solicita devolución del dinero (venta anulada).",
    detalle: {
      area: "TAQUILLA",
      canal_queja: "PRESENCIAL",
      id_venta: 21,
      id_staff_involucrado: 3,
      compensacion: { tipo: "REEMBOLSO", valor: 64000 }
    },
    seguimiento: [
      { fecha: ISODate("2026-10-14T19:10:00-05:00"), id_staff: 3, accion: "Venta 21 anulada en PostgreSQL." },
      { fecha: ISODate("2026-10-15T10:00:00-05:00"), id_staff: 12, accion: "Reembolso confirmado." }
    ],
    fecha_cierre: ISODate("2026-10-15T10:00:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0028",
    tipo: "QUEJA_SERVICIO",
    fecha_reporte: ISODate("2026-10-14T19:20:00-05:00"),
    id_sala: 5,
    id_funcion: 30,
    reportado_por: { rol: "ESPECTADOR", id_espectador: 30 },
    severidad: "ALTA",
    estado: "CERRADO",
    descripcion: "Función cancelada: solicita reprogramación en lugar de reembolso.",
    detalle: {
      area: "TAQUILLA",
      canal_queja: "PRESENCIAL",
      id_venta: 37,
      id_staff_involucrado: 3,
      compensacion: { tipo: "BOLETA_CORTESIA", valor: 32000 }
    },
    seguimiento: [
      { fecha: ISODate("2026-10-14T19:30:00-05:00"), id_staff: 3, accion: "Venta 37 anulada; se emite boleta de cortesía." }
    ],
    fecha_cierre: ISODate("2026-10-14T19:30:00-05:00")
  },
  {
    codigo_incidente: "INC-2026-0029",
    tipo: "QUEJA_SERVICIO",
    fecha_reporte: ISODate("2026-10-15T13:00:00-05:00"),
    id_sala: null,
    reportado_por: { rol: "ESPECTADOR", id_espectador: 34 },
    severidad: "BAJA",
    estado: "ABIERTO",
    descripcion: "Precio de combo de confitería distinto al publicado en la app.",
    detalle: { area: "CONFITERIA", canal_queja: "APP", compensacion: { tipo: "NINGUNA", valor: 0 } },
    seguimiento: [],
    fecha_cierre: null
  },
  {
    codigo_incidente: "INC-2026-0030",
    tipo: "FALLA_TECNICA",
    fecha_reporte: ISODate("2026-10-15T16:50:00-05:00"),
    id_sala: 4,
    id_funcion: 32,
    reportado_por: { rol: "STAFF", id_staff: 9 },
    severidad: "BAJA",
    estado: "ABIERTO",
    descripcion: "Inventario de gafas 3D por debajo del mínimo requerido (faltan 12).",
    detalle: { categoria: "SISTEMA_3D", equipo: "Gafas RealD pasivas", minutos_interrupcion: 0, funcion_reprogramada: false },
    seguimiento: [],
    fecha_cierre: null
  },
  {
    codigo_incidente: "INC-2026-0031",
    tipo: "SEGURIDAD",
    fecha_reporte: ISODate("2026-10-15T17:30:00-05:00"),
    id_sala: 4,
    id_funcion: 32,
    reportado_por: { rol: "STAFF", id_staff: 9 },
    severidad: "BAJA",
    estado: "ABIERTO",
    descripcion: "Puerta de emergencia de la sala Guadalupe no cierra correctamente.",
    detalle: { categoria: "ACCESO_NO_AUTORIZADO", personas_involucradas: 0, requirio_evacuacion: false },
    seguimiento: [],
    fecha_cierre: null
  },
  {
    codigo_incidente: "INC-2026-0032",
    tipo: "QUEJA_SERVICIO",
    fecha_reporte: ISODate("2026-10-16T12:00:00-05:00"),
    id_sala: null,
    reportado_por: { rol: "ESPECTADOR", id_espectador: 31 },
    severidad: "MEDIA",
    estado: "EN_PROCESO",
    descripcion: "Solicita factura electrónica que no llegó al correo.",
    detalle: { area: "VENTA_WEB", canal_queja: "CORREO", id_venta: 34 },
    seguimiento: [ { fecha: ISODate("2026-10-16T15:00:00-05:00"), id_staff: 12, accion: "Se escaló al área de contabilidad." } ],
    fecha_cierre: null
  },
  {
    codigo_incidente: "INC-2026-0033",
    tipo: "FALLA_TECNICA",
    fecha_reporte: ISODate("2026-10-16T13:30:00-05:00"),
    id_sala: 3,
    id_funcion: 34,
    reportado_por: { rol: "STAFF", id_staff: 9 },
    severidad: "MEDIA",
    estado: "ABIERTO",
    descripcion: "Sincronía de subtítulos pendiente de verificación antes de la función.",
    detalle: {
      categoria: "PROYECCION",
      equipo: "Servidor de cine IMS3000 sala 3",
      minutos_interrupcion: 0,
      funcion_reprogramada: false
    },
    seguimiento: [],
    fecha_cierre: null
  }
]);


// 5. CONTEO Y VERIFICACIÓN DE IDENTIFICADORES COMPARTIDOS
// Cuenta los documentos de cada colección y revisa que los ids que
// apuntan a PostgreSQL.

print("\n== Documentos cargados ==");
["fichas_tecnicas_peliculas", "requisitos_proyeccion", "resenas_peliculas", "reportes_incidentes"]
  .forEach(function (c) { print(" - " + c.padEnd(28) + db.getCollection(c).countDocuments()); });

const RANGOS_PG = { id_sala: 6, id_artista: 40, id_contrato: 14, id_funcion: 36, id_espectador: 36, id_staff: 12, id_venta: 53 };
const CAMPOS = [

  ["fichas_tecnicas_peliculas", "id_contrato", "id_contrato"], ["fichas_tecnicas_peliculas", "elenco.id_artista", "id_artista"],
  ["fichas_tecnicas_peliculas", "direccion.id_artista", "id_artista"],
  ["requisitos_proyeccion", "id_funcion", "id_funcion"], ["requisitos_proyeccion", "id_sala", "id_sala"],
  ["requisitos_proyeccion", "id_contrato", "id_contrato"], ["requisitos_proyeccion", "checklist.id_staff", "id_staff"],
  ["resenas_peliculas", "id_contrato", "id_contrato"], ["resenas_peliculas", "id_espectador", "id_espectador"],
  ["resenas_peliculas", "id_venta", "id_venta"], ["resenas_peliculas", "respuesta_empresa.id_staff", "id_staff"],
  ["reportes_incidentes", "id_sala", "id_sala"], ["reportes_incidentes", "id_funcion", "id_funcion"],
  ["reportes_incidentes", "reportado_por.id_staff", "id_staff"], ["reportes_incidentes", "reportado_por.id_espectador", "id_espectador"],
  ["reportes_incidentes", "detalle.id_venta", "id_venta"]
];
print("\n== Verificación de identificadores compartidos con PostgreSQL ==");

CAMPOS.forEach(function ([col, campo, pk]) {
  const valores = db.getCollection(col).distinct(campo).filter(v => v !== null);
  const fuera = valores.filter(v => v < 1 || v > RANGOS_PG[pk]);
  print("  " + (fuera.length ? "[REVISAR]" : "[OK]") + " " + (col + "." + campo).padEnd(52) + " -> " + pk.padEnd(14) +
        valores.length + " valores distintos" + (fuera.length ? "; fuera de rango: " + fuera : ""));
});

