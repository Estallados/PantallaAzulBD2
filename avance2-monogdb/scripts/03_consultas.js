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


// Consulta 2(aggregation) · Ranking de películas por calificación
// Promedio de estrellas y número de reseñas por película. Con $lookup
print("\consulta 2: ranking de películas por calificación");
printjson(
  db.resenas_peliculas.aggregate([
    { $match: { estado_moderacion: "PUBLICADA" } },
    { $group: {
        _id: "$id_contrato",
        promedio: { $avg: "$calificacion" },
        total_resenas: { $sum: 1 }
    } },
    { $lookup: {
        from: "fichas_tecnicas_peliculas",
        localField: "_id",
        foreignField: "id_contrato",
        as: "ficha"
    } },
    { $unwind: "$ficha" },
    { $project: {
        _id: 0,
        id_contrato: "$_id",
        titulo: "$ficha.titulo",
        promedio: { $round: ["$promedio", 2] },
        total_resenas: 1
    } },
    { $sort: { promedio: -1, total_resenas: -1 } }
  ]).toArray()
);