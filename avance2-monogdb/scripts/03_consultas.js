//  Script 03: consultas
use("pantalla_azul");
// CONSULTA 1 (find) · Películas en cartelera con subtítulos en inglés
// Busca dentro del array embebido "subtitulos" sin necesidad de JOIN.
printjson(
  db.fichas_tecnicas_peliculas.find(
    { estado_catalogo: "EN_CARTELERA", subtitulos: "en" },
    { _id: 0, id_contrato: 1, titulo: 1, generos: 1, subtitulos: 1 }
  ).sort({ titulo: 1 }).toArray()
);