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

-- PROCEDIMIENTO 3 - MANTENIMIENTO DE SALA
-- Aqui se coloca una sala en mantenimiento
-- y se cancelan las funciones programadas en esas fechas

CREATE OR REPLACE PROCEDURE mantenimiento_sala(
    p_id_sala INTEGER,
    p_fecha_inicio DATE,
    p_fecha_fin DATE
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_estado VARCHAR(15);
    v_canceladas INTEGER := 0;
    v_pendientes INTEGER := 0;
BEGIN

    -- Se revisa que las fechas sean correctas
    IF p_fecha_inicio IS NULL OR p_fecha_fin IS NULL THEN
        RAISE EXCEPTION
        'Debe indicar las dos fechas del mantenimiento';
    END IF;

    IF p_fecha_fin < p_fecha_inicio THEN
        RAISE EXCEPTION
        'La fecha final no puede ser anterior a la inicial';
    END IF;

    -- No se permite iniciar el mantenimiento en el pasado
    IF p_fecha_inicio < CURRENT_DATE THEN
        RAISE EXCEPTION
        'La fecha de inicio no puede estar en el pasado';
    END IF;

    -- Aqui se busca la sala
    SELECT estado
    INTO v_estado
    FROM salas
    WHERE id_sala = p_id_sala
    FOR UPDATE;

    -- Se revisa que la sala exista
    IF NOT FOUND THEN
        RAISE EXCEPTION
        'La sala % no existe',
        p_id_sala;
    END IF;

    -- Se revisa si ya esta en mantenimiento
    IF v_estado = 'MANTENIMIENTO' THEN
        RAISE EXCEPTION
        'La sala % ya esta en mantenimiento',
        p_id_sala;
    END IF;

    -- Aqui se cancelan las funciones programadas
    -- que se encuentren dentro de las fechas indicadas
    UPDATE funciones
    SET estado = 'CANCELADA'
    WHERE id_sala = p_id_sala
      AND estado = 'PROGRAMADA'
      AND fecha_hora >= p_fecha_inicio
      AND fecha_hora < (p_fecha_fin + INTERVAL '1 day');

    -- Aqui se cuentan las funciones canceladas
    GET DIAGNOSTICS v_canceladas = ROW_COUNT;

    -- Se revisa que no queden funciones futuras programadas
    SELECT COUNT(*)
    INTO v_pendientes
    FROM funciones
    WHERE id_sala = p_id_sala
      AND estado = 'PROGRAMADA'
      AND fecha_hora >= CURRENT_TIMESTAMP;

    IF v_pendientes > 0 THEN
        RAISE EXCEPTION
        'La sala todavia tiene % funcion(es) programada(s) fuera del mantenimiento',
        v_pendientes;
    END IF;

    -- Aqui se coloca la sala en mantenimiento
    UPDATE salas
    SET estado = 'MANTENIMIENTO'
    WHERE id_sala = p_id_sala;

    RAISE NOTICE
    'Sala % colocada en mantenimiento. Funciones canceladas: %',
    p_id_sala,
    v_canceladas;

-- Aqui se manejan los errores
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE
        'Ocurrio un error en el mantenimiento: %',
        SQLERRM;
--    RAISE;
-- Se comenta el RAISE para que al ejecutarse un error, no se detenga el programa.  
END;
$$;

-- Prueba del caso exitoso
-- Se utiliza una transaccion para dejar los datos como estaban

BEGIN;

CALL mantenimiento_sala(
    4,
    CURRENT_DATE,
    CURRENT_DATE
);

ROLLBACK;

-- Prueba del caso de error
-- Se indica una fecha final anterior a la inicial

CALL mantenimiento_sala(
    4,
    CURRENT_DATE + 5,
    CURRENT_DATE + 2
);

-- PROCEDIMIENTO 4 - VENDER BOLETAS
-- Aqui se hace el proceso para registrar una venta
-- revisando que los datos sean validos

DROP PROCEDURE IF EXISTS vender_boletas(
    INTEGER, INTEGER, INTEGER, INTEGER, VARCHAR, INTEGER
);

CREATE OR REPLACE PROCEDURE vender_boletas(
    p_id_espectador INTEGER,
    p_id_funcion INTEGER,
    p_id_tipo_boleta INTEGER,
    p_cantidad INTEGER,
    p_canal VARCHAR(10),
    OUT p_id_venta INTEGER,
    p_id_staff INTEGER DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_funcion RECORD;
    v_tipo RECORD;
    v_edad INTEGER;
    v_edad_minima INTEGER;
    v_vendidas INTEGER;
    v_disponibles INTEGER;
    v_precio NUMERIC(10,2);
    v_cargo VARCHAR(25);
    v_staff_activo BOOLEAN;
BEGIN

    -- Se revisa la cantidad de boletas
    IF p_cantidad IS NULL OR p_cantidad < 1 OR p_cantidad > 10 THEN
        RAISE EXCEPTION
        'La cantidad debe estar entre 1 y 10';
    END IF;

    -- Aqui se revisa el canal de la venta
    IF p_canal IS NULL
       OR p_canal NOT IN ('TAQUILLA', 'WEB') THEN
        RAISE EXCEPTION
        'Canal invalido: %',
        p_canal;
    END IF;

    -- Se revisa que el espectador exista
    PERFORM 1
    FROM espectadores
    WHERE id_espectador = p_id_espectador;

    IF NOT FOUND THEN
        RAISE EXCEPTION
        'El espectador % no existe',
        p_id_espectador;
    END IF;

    -- Aqui se obtiene la informacion de la funcion
    SELECT
        f.fecha_hora,
        f.precio_base,
        f.estado AS estado_funcion,
        s.capacidad,
        s.estado AS estado_sala,
        c.clasificacion,
        c.titulo_obra,
        c.estado AS estado_contrato,
        a.activo AS artista_activo
    INTO v_funcion
    FROM funciones f
    JOIN salas s
        ON s.id_sala = f.id_sala
    JOIN contratos c
        ON c.id_contrato = f.id_contrato
    JOIN actores_directores a
        ON a.id_artista = c.id_artista
    WHERE f.id_funcion = p_id_funcion
    FOR UPDATE OF f;

    -- Se revisa que la funcion exista
    IF NOT FOUND THEN
        RAISE EXCEPTION
        'La funcion % no existe',
        p_id_funcion;
    END IF;

    -- Solo se venden funciones programadas
    IF v_funcion.estado_funcion <> 'PROGRAMADA' THEN
        RAISE EXCEPTION
        'La funcion % esta en estado %',
        p_id_funcion,
        v_funcion.estado_funcion;
    END IF;

    -- Se revisa que la funcion no haya comenzado
    IF v_funcion.fecha_hora <= NOW() THEN
        RAISE EXCEPTION
        'La funcion % ya inicio',
        p_id_funcion;
    END IF;

    -- Se revisa que la sala este activa
    IF v_funcion.estado_sala <> 'ACTIVA' THEN
        RAISE EXCEPTION
        'La sala esta en estado %',
        v_funcion.estado_sala;
    END IF;

    -- Se revisa que el contrato este vigente
    IF v_funcion.estado_contrato <> 'VIGENTE' THEN
        RAISE EXCEPTION
        'El contrato de % no esta vigente',
        v_funcion.titulo_obra;
    END IF;

    -- Se revisa que el artista este activo
    IF NOT v_funcion.artista_activo THEN
        RAISE EXCEPTION
        'El artista se encuentra inactivo';
    END IF;

    -- Aqui se calcula la edad del espectador
    SELECT DATE_PART(
        'year',
        AGE(CURRENT_DATE, fecha_nacimiento)
    )::INTEGER
    INTO v_edad
    FROM espectadores
    WHERE id_espectador = p_id_espectador;

    -- Aqui se obtiene la edad minima de la pelicula
    v_edad_minima :=
        CASE v_funcion.clasificacion
            WHEN 'TP' THEN 0
            WHEN '7+' THEN 7
            WHEN '12+' THEN 12
            WHEN '15+' THEN 15
            WHEN '18+' THEN 18
        END;

    -- Se revisa que la edad sea suficiente
    IF v_edad_minima IS NULL THEN
        RAISE EXCEPTION
        'La clasificacion % no es valida',
        v_funcion.clasificacion;
    END IF;

    IF v_edad IS NULL OR v_edad < v_edad_minima THEN
        RAISE EXCEPTION
        'Clasificacion %: el espectador tiene % años y necesita minimo %',
        v_funcion.clasificacion,
        v_edad,
        v_edad_minima;
    END IF;

    -- Aqui se busca el tipo de boleta
    SELECT factor_precio, activo
    INTO v_tipo
    FROM tipos_boleta
    WHERE id_tipo_boleta = p_id_tipo_boleta;

    -- Se revisa que el tipo de boleta exista
    IF NOT FOUND THEN
        RAISE EXCEPTION
        'El tipo de boleta % no existe',
        p_id_tipo_boleta;
    END IF;

    -- Se revisa que el tipo de boleta este activo
    IF NOT v_tipo.activo THEN
        RAISE EXCEPTION
        'El tipo de boleta % esta inactivo',
        p_id_tipo_boleta;
    END IF;

    -- Si la venta es por taquilla debe tener un empleado
    IF p_canal = 'TAQUILLA' THEN

        IF p_id_staff IS NULL THEN
            RAISE EXCEPTION
            'Una venta por taquilla debe tener un empleado';
        END IF;

        -- Aqui se busca el empleado
        SELECT cargo, activo
        INTO v_cargo, v_staff_activo
        FROM staff
        WHERE id_staff = p_id_staff;

        -- Se revisa que el empleado exista
        IF NOT FOUND THEN
            RAISE EXCEPTION
            'El empleado % no existe',
            p_id_staff;
        END IF;

        -- Se revisa que el empleado este activo
        IF NOT v_staff_activo THEN
            RAISE EXCEPTION
            'El empleado esta inactivo';
        END IF;

        -- Solo un taquillero puede registrar esta venta
        IF v_cargo <> 'TAQUILLERO' THEN
            RAISE EXCEPTION
            'El empleado debe ser TAQUILLERO';
        END IF;
    END IF;

    -- Aqui se cuentan las boletas que ya se vendieron
    SELECT COALESCE(SUM(cantidad), 0)
    INTO v_vendidas
    FROM ventas
    WHERE id_funcion = p_id_funcion
      AND estado = 'PAGADA';

    -- Aqui se calculan las sillas disponibles
    v_disponibles := v_funcion.capacidad - v_vendidas;

    -- Se revisa que haya suficientes sillas
    IF p_cantidad > v_disponibles THEN
        RAISE EXCEPTION
        'Sillas insuficientes: % disponibles y % solicitadas',
        v_disponibles,
        p_cantidad;
    END IF;

    -- Aqui se calcula el precio de cada boleta
    v_precio := ROUND(
        v_funcion.precio_base * v_tipo.factor_precio,
        2
    );

    -- Aqui se registra la venta
    INSERT INTO ventas (
        id_espectador,
        id_funcion,
        id_tipo_boleta,
        id_staff,
        cantidad,
        valor_unitario,
        canal,
        estado
    )
    VALUES (
        p_id_espectador,
        p_id_funcion,
        p_id_tipo_boleta,
        p_id_staff,
        p_cantidad,
        v_precio,
        p_canal,
        'PAGADA'
    )
    RETURNING id_venta INTO p_id_venta;

    RAISE NOTICE
    'Venta % registrada: % boleta(s) a $% cada una',
    p_id_venta,
    p_cantidad,
    v_precio;

-- Aqui se manejan los errores
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE
        'Ocurrio un error al realizar la venta: %',
        SQLERRM;
--    RAISE;
-- Se comenta el RAISE para que al ejecutarse un error,
-- no se detenga el programa.

END;
$$;


-- Prueba del caso exitoso
-- Se usa una transaccion para recuperar los datos al final

BEGIN;

CALL vender_boletas(
    1,
    31,
    1,
    2,
    'WEB',
    NULL,
    NULL
);

ROLLBACK;


-- Prueba del caso de error
-- Se intenta registrar una venta con un canal invalido

CALL vender_boletas(
    1,
    31,
    1,
    2,
    'TELEFONO',
    NULL,
    NULL
);