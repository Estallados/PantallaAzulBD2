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



// ---------------------------------------------------------------------
// CONSULTA 3 (find) · Reseñas publicadas de una película
// se busca por id_contrato, además de traer el id espectador, autro_aias_calificacion, texto, fecha con el valor de 1
// Orden: de la reseña más reciente a la más antigua.

print("\n CONSULTA 3 find: reseñas publicadas de Parasite id_1");
printjson(
  db.resenas_peliculas.find(
    { id_contrato: 1, estado_moderacion: "PUBLICADA" },
    { _id: 0, id_espectador: 1, autor_alias: 1, calificacion: 1, texto: 1, fecha: 1 }
  ).sort({ fecha: -1 }).toArray()
);

// ---------------------------------------------------------------------
// CONSULTA 4 (aggregate) · Calificación promedio por película
// Promedio y total de reseñas publicadas por película, de mejor a peor.
// ---------------------------------------------------------------------
print("\n=== CONSULTA 4 (aggregate): calificación promedio por película ===");
printjson(
  db.resenas_peliculas.aggregate([
    { $match: { estado_moderacion: "PUBLICADA" } },
    { $group: {
        _id: "$id_contrato",
        promedio: { $avg: "$calificacion" },
        total_resenas: { $sum: 1 }
    } },
    { $sort: { promedio: -1 } }
  ]).toArray()
);

// ---------------------------------------------------------------------
// CONSULTA 5 (aggregate) · Fallas técnicas por sala
// Total de fallas y minutos de interrupción acumulados por sala,
// ordenados de mayor a menor según la cantidad de fallas.
// ---------------------------------------------------------------------
print("\n=== CONSULTA 5 (aggregate): fallas técnicas por sala ===");
printjson(
  db.reportes_incidentes.aggregate([
    { $match: { tipo: "FALLA_TECNICA" } },
    { $group: {
        _id: "$id_sala",
        total_fallas: { $sum: 1 },
        minutos_interrupcion: { $sum: "$detalle.minutos_interrupcion" }
    } },
    { $sort: { total_fallas: -1 } }
  ]).toArray()
);
