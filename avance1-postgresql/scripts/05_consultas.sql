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

    -- Consulta 3
-- Muestra los espectadores que gastaron mas que el promedio

SELECT
    e.id_espectador,
    e.nombres,
    e.apellidos,
    COUNT(v.id_venta) AS ventas_realizadas,

    -- Se calcula cuanto gasto cada espectador
    SUM(v.cantidad * v.valor_unitario) AS total_gastado

FROM espectadores e

JOIN ventas v
    ON v.id_espectador = e.id_espectador

WHERE v.estado = 'PAGADA'

GROUP BY
    e.id_espectador,
    e.nombres,
    e.apellidos

-- Se compara el gasto del espectador con el promedio general
HAVING SUM(v.cantidad * v.valor_unitario) >
(
    SELECT AVG(total_cliente)

    FROM
    (
        -- Aqui se calcula el gasto total de cada cliente
        SELECT
            SUM(cantidad * valor_unitario) AS total_cliente

        FROM ventas

        WHERE estado = 'PAGADA'

        GROUP BY id_espectador

    ) AS gastos
)

ORDER BY
    total_gastado DESC;