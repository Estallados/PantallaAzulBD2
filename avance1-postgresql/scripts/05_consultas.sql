-- Consulta 1
-- Aqui se muestra cuanto dinero recaudo cada funcion
-- y cuantas boletas se vendieron

SELECT
    f.id_funcion,
    c.titulo_obra,
    s.nombre AS sala,

    SUM(v.cantidad) AS boletas_vendidas,

    SUM(
        v.cantidad * v.valor_unitario
    ) AS recaudo_total

FROM ventas v

JOIN funciones f
    ON f.id_funcion = v.id_funcion

JOIN contratos c
    ON c.id_contrato = f.id_contrato

JOIN salas s
    ON s.id_sala = f.id_sala

WHERE v.estado = 'PAGADA'

GROUP BY
    f.id_funcion,
    c.titulo_obra,
    s.nombre

ORDER BY
    recaudo_total DESC;


-- Consulta 2
-- Muestra la ocupacion y los puestos disponibles

SELECT
    f.id_funcion,
    c.titulo_obra,
    s.nombre AS sala,
    s.capacidad,

    -- Aca se cuentan los puestos ocupados
    COALESCE(
        SUM(v.cantidad)
        FILTER (WHERE v.estado = 'PAGADA'),
        0
    ) AS puestos_ocupados,

    -- Aqui se calculan los puestos disponibles
    s.capacidad -
    COALESCE(
        SUM(v.cantidad)
        FILTER (WHERE v.estado = 'PAGADA'),
        0
    ) AS puestos_disponibles,

    -- Aqui se calcula el porcentaje de ocupacion
    ROUND(
        COALESCE(
            SUM(v.cantidad)
            FILTER (WHERE v.estado = 'PAGADA'),
            0
        ) * 100.0 / s.capacidad,
        2
    ) AS porcentaje_ocupacion

FROM funciones f

JOIN salas s
    ON s.id_sala = f.id_sala

JOIN contratos c
    ON c.id_contrato = f.id_contrato

-- LEFT JOIN permite mostrar funciones sin ventas
LEFT JOIN ventas v
    ON v.id_funcion = f.id_funcion

GROUP BY
    f.id_funcion,
    c.titulo_obra,
    s.nombre,
    s.capacidad

ORDER BY
    porcentaje_ocupacion DESC;