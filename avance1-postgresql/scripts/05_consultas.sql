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