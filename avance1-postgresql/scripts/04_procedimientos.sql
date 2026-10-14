-- PROCEDIMIENTO 1 - ANULAR VENTA
-- Aqui se anula una venta que este pagada
-- y se calcula cuanto dinero se debe devolver

CREATE OR REPLACE PROCEDURE anular_venta(
    p_id_venta INTEGER,
    p_motivo VARCHAR(150)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_estado VARCHAR(10);
    v_total NUMERIC(12,2);
    v_fecha_funcion TIMESTAMP;
    v_devolver NUMERIC(12,2);
BEGIN

    -- Se revisa que se escriba un motivo
    IF p_motivo IS NULL
       OR LENGTH(TRIM(p_motivo)) = 0 THEN
        RAISE EXCEPTION
        'Debe indicar un motivo para anular la venta';
    END IF;

    -- Aqui se busca la venta y la fecha de la funcion
    -- El total se calcula con cantidad por valor unitario
    SELECT
        v.estado,
        (v.cantidad * v.valor_unitario),
        f.fecha_hora
    INTO
        v_estado,
        v_total,
        v_fecha_funcion
    FROM ventas v
    JOIN funciones f
        ON f.id_funcion = v.id_funcion
    WHERE v.id_venta = p_id_venta
    FOR UPDATE OF v;

    -- Se revisa que la venta exista
    IF NOT FOUND THEN
        RAISE EXCEPTION
        'La venta % no existe',
        p_id_venta;
    END IF;

    -- Solo se pueden anular ventas pagadas
    IF v_estado <> 'PAGADA' THEN
        RAISE EXCEPTION
        'La venta % esta en estado % y no se puede anular',
        p_id_venta,
        v_estado;
    END IF;

    -- Si la funcion todavia no empieza se devuelve todo
    IF v_fecha_funcion > NOW() THEN
        v_devolver := v_total;
    ELSE
        -- Si ya paso se devuelve el 80 por ciento
        v_devolver := ROUND(v_total * 0.80, 2);
    END IF;

    -- Aqui se cambia el estado de la venta
    UPDATE ventas
    SET estado = 'ANULADA'
    WHERE id_venta = p_id_venta;

    RAISE NOTICE
    'Venta % anulada. Valor a devolver: $%',
    p_id_venta,
    v_devolver;

-- Aqui se manejan los errores
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE
        'Ocurrio un error al anular la venta: %',
        SQLERRM;
--    RAISE;
-- Se comenta el RAISE para que al ejecutarse un error, no se detenga el programa.      
END;
$$;

-- Prueba del caso exitoso
-- Se usa una transaccion para recuperar los datos al final

BEGIN;

CALL anular_venta(
    43,
    'El cliente no puede asistir'
);

ROLLBACK;

-- Prueba del caso de error
-- Se intenta anular una venta que no existe

CALL anular_venta(
    99999,
    'Prueba de venta inexistente'
);



-- PROCEDIMIENTO 2 - REPORTE DE FUNCION
-- Aqui se muestra cuantas boletas se vendieron
-- cuanto dinero se recaudo y la ocupacion de la sala

CREATE OR REPLACE PROCEDURE reporte_funcion(
    p_id_funcion INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_capacidad INTEGER;
    v_vendidas INTEGER := 0;
    v_recaudo NUMERIC(14,2) := 0;
    v_dato RECORD;
BEGIN

    -- Aqui se busca la capacidad de la sala
    SELECT s.capacidad
    INTO v_capacidad
    FROM funciones f
    JOIN salas s
        ON s.id_sala = f.id_sala
    WHERE f.id_funcion = p_id_funcion;

    -- Se revisa que la funcion exista
    IF NOT FOUND THEN
        RAISE EXCEPTION
        'La funcion % no existe',
        p_id_funcion;
    END IF;

    -- Aqui se calculan las boletas vendidas
    -- y el dinero recaudado
    SELECT
        COALESCE(SUM(cantidad), 0),
        COALESCE(SUM(cantidad * valor_unitario), 0)
    INTO
        v_vendidas,
        v_recaudo
    FROM ventas
    WHERE id_funcion = p_id_funcion
      AND estado = 'PAGADA';

    -- Se muestra la informacion general
    RAISE NOTICE
    'Funcion %: % de % sillas ocupadas',
    p_id_funcion,
    v_vendidas,
    v_capacidad;

    RAISE NOTICE
    'Ocupacion: % por ciento',
    ROUND(v_vendidas * 100.0 / v_capacidad, 1);

    RAISE NOTICE
    'Recaudo total: $%',
    v_recaudo;

    -- Aqui se muestra el recaudo por tipo de boleta
    FOR v_dato IN
        SELECT
            tb.nombre,
            SUM(v.cantidad) AS cantidad,
            SUM(v.cantidad * v.valor_unitario) AS recaudo
        FROM ventas v
        JOIN tipos_boleta tb
            ON tb.id_tipo_boleta = v.id_tipo_boleta
        WHERE v.id_funcion = p_id_funcion
          AND v.estado = 'PAGADA'
        GROUP BY tb.nombre
    LOOP
        RAISE NOTICE
        '%: % boletas | $%',
        v_dato.nombre,
        v_dato.cantidad,
        v_dato.recaudo;
    END LOOP;

-- Aqui se manejan los errores
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE
        'Ocurrio un error al generar el reporte: %',
        SQLERRM;
--    RAISE;
-- Se comenta el RAISE para que al ejecutarse un error, no se detenga el programa.   
END;
$$;

-- Prueba del caso exitoso
-- Se genera el reporte de una funcion existente

CALL reporte_funcion(31);

-- Prueba del caso de error
-- Se consulta una funcion que no existe

CALL reporte_funcion(99999);
