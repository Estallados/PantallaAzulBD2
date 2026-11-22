-- TRIGGER 1
-- Validar que la fecha de nacimiento no sea futura

DROP TRIGGER IF EXISTS trg_validar_fecha_artista
ON actores_directores;

CREATE OR REPLACE FUNCTION fn_validar_fecha_artista()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.fecha_nacimiento > CURRENT_DATE THEN
        RAISE EXCEPTION
        'La fecha de nacimiento del artista no puede ser futura';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Crear el trigger

CREATE TRIGGER trg_validar_fecha_artista
BEFORE INSERT OR UPDATE
ON actores_directores
FOR EACH ROW
EXECUTE FUNCTION fn_validar_fecha_artista();


-- PRUEBA CORRECTA

DO $$
BEGIN
    BEGIN
        INSERT INTO actores_directores
        (nombres, apellidos, nacionalidad, fecha_nacimiento, rol, email, activo)
        VALUES
        ('Kevin', 'Prueba', 'Colombiana', '1994-05-10', 'ACTOR', NULL, TRUE);

        RAISE NOTICE 'CASO DE EXITO: El artista fue registrado correctamente.';

    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE 'ERROR EN LA PRUEBA CORRECTA: %', SQLERRM;
    END;
END;
$$;


-- PRUEBA DE ERROR
-- Se intenta registrar un artista con fecha futura

DO $$
BEGIN
    BEGIN
        INSERT INTO actores_directores
        (nombres, apellidos, nacionalidad, fecha_nacimiento, rol, email, activo)
        VALUES
        ('Pedro', 'Prueba', 'Colombiana', '2030-01-01', 'ACTOR', NULL, TRUE);

        RAISE NOTICE 'La insercion fue aceptada.';

    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE 'CASO DE ERROR: %', SQLERRM;
    END;
END;
$$;

-- TRIGGER 2: VALIDAR CAPACIDAD DE LA SALA

DROP TRIGGER IF EXISTS trg_bloquear_cupos ON ventas;

CREATE OR REPLACE FUNCTION fn_bloquear_cupos()
RETURNS TRIGGER AS $$
DECLARE
    v_capacidad INT;
    v_vendidos INT;
    v_disponibles INT;
BEGIN
    -- Si la venta no esta pagada, no se cuenta
    IF NEW.estado <> 'PAGADA' THEN
        RETURN NEW;
    END IF;

    -- Obtener capacidad de la sala
    SELECT s.capacidad
    INTO v_capacidad
    FROM funciones f
    JOIN salas s ON s.id_sala = f.id_sala
    WHERE f.id_funcion = NEW.id_funcion;

    -- Verificar que la funcion exista
    IF v_capacidad IS NULL THEN
        RAISE EXCEPTION
        'La funcion con ID % no existe', NEW.id_funcion;
    END IF;

    -- Contar boletas pagadas de la funcion
    SELECT COALESCE(SUM(cantidad), 0)
    INTO v_vendidos
    FROM ventas
    WHERE id_funcion = NEW.id_funcion
      AND estado = 'PAGADA'
      AND id_venta <> COALESCE(NEW.id_venta, 0);

    -- Calcular cupos disponibles
    v_disponibles := v_capacidad - v_vendidos;

    -- Validar disponibilidad
    IF NEW.cantidad > v_disponibles THEN
        RAISE EXCEPTION
        'No hay suficientes puestos disponibles. Disponibles: %, solicitados: %',
        v_disponibles, NEW.cantidad;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger
CREATE TRIGGER trg_bloquear_cupos
BEFORE INSERT OR UPDATE ON ventas
FOR EACH ROW
EXECUTE FUNCTION fn_bloquear_cupos();


-- CASO DE EXITO: CONSULTAR CUPOS

SELECT
    f.id_funcion,
    s.capacidad,
    COALESCE(SUM(v.cantidad) FILTER (
        WHERE v.estado = 'PAGADA'
    ), 0) AS boletas_vendidas,
    s.capacidad - COALESCE(SUM(v.cantidad) FILTER (
        WHERE v.estado = 'PAGADA'
    ), 0) AS cupos_disponibles
FROM funciones f
JOIN salas s ON s.id_sala = f.id_sala
LEFT JOIN ventas v ON v.id_funcion = f.id_funcion
GROUP BY f.id_funcion, s.capacidad
ORDER BY f.id_funcion;


-- CASO DE ERROR: INTENTAR SUPERAR LA CAPACIDAD
-- El error se captura para permitir que el script continue

DO $$
BEGIN
    BEGIN
        INSERT INTO ventas (
            id_funcion,
            cantidad,
            estado
        )
        VALUES (
            1,
            1000,
            'PAGADA'
        );

        RAISE NOTICE
        'La venta fue aceptada. La capacidad disponible era suficiente.';

    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE
            'CASO DE ERROR: %', SQLERRM;
    END;
END;
$$;

-- TRIGGER 3
-- Validar que una sala no se coloque inactiva o en mantenimiento
-- si tiene funciones programadas

DROP TRIGGER IF EXISTS trg_validar_estado_sala ON salas;

CREATE OR REPLACE FUNCTION fn_validar_estado_sala()
RETURNS TRIGGER AS $$
DECLARE
    v_funciones INT;
BEGIN
    -- Revisar si la sala cambia de estado
    IF OLD.estado = 'ACTIVA'
       AND NEW.estado IN ('INACTIVA', 'MANTENIMIENTO') THEN

        -- Contar las funciones programadas
        SELECT COUNT(*)
        INTO v_funciones
        FROM funciones
        WHERE id_sala = NEW.id_sala
          AND estado = 'PROGRAMADA'
          AND fecha_hora >= CURRENT_TIMESTAMP;

        -- Impedir el cambio si existen funciones programadas
        IF v_funciones > 0 THEN
            RAISE EXCEPTION
            'La sala % tiene % funcion(es) programada(s) y no puede cambiar de estado',
            NEW.nombre,
            v_funciones;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Crear el trigger

CREATE TRIGGER trg_validar_estado_sala
BEFORE UPDATE OF estado
ON salas
FOR EACH ROW
EXECUTE FUNCTION fn_validar_estado_sala();


-- CASO DE EXITO
-- Consultar las salas activas que tienen 2 funciones programadas futuras

SELECT
    s.id_sala,
    s.nombre,
    s.estado,
    COUNT(f.id_funcion) AS funciones_programadas
FROM salas s
LEFT JOIN funciones f
    ON f.id_sala = s.id_sala
    AND f.estado = 'PROGRAMADA'
    AND f.fecha_hora >= CURRENT_TIMESTAMP
WHERE s.estado = 'ACTIVA'
GROUP BY s.id_sala, s.nombre, s.estado
HAVING COUNT(f.id_funcion) = 2
ORDER BY s.id_sala;


-- CASO DE ERROR
-- Intentar desactivar una sala ACTIVA con funciones programadas futuras

DO $$
DECLARE
    v_id_sala INT;
BEGIN
    SELECT s.id_sala
    INTO v_id_sala
    FROM salas s
    WHERE s.estado = 'ACTIVA'
      AND EXISTS (
          SELECT 1
          FROM funciones f
          WHERE f.id_sala = s.id_sala
            AND f.estado = 'PROGRAMADA'
            AND f.fecha_hora >= CURRENT_TIMESTAMP
      )
    LIMIT 1;

    IF v_id_sala IS NULL THEN
        RAISE NOTICE
        'CASO DE ERROR NO EJECUTADO: No existe una sala ACTIVA con funciones programadas futuras.';
    ELSE
        BEGIN
            UPDATE salas
            SET estado = 'INACTIVA'
            WHERE id_sala = v_id_sala;

            RAISE NOTICE
            'La sala cambio de estado, no se produjo el error esperado.';

        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE 'CASO DE ERROR: %', SQLERRM;
        END;
    END IF;
END;
$$;

-- TRIGGER 4
-- Validar que no existan funciones cruzadas en la misma sala

DROP TRIGGER IF EXISTS trg_validar_cruce_funciones ON funciones;

CREATE OR REPLACE FUNCTION fn_validar_cruce_funciones()
RETURNS TRIGGER AS $$
DECLARE
    v_duracion_nueva INT;
    v_cruces INT;
BEGIN
    -- Obtener la duracion de la pelicula
    SELECT duracion_min
    INTO v_duracion_nueva
    FROM contratos
    WHERE id_contrato = NEW.id_contrato;

    -- Verificar que el contrato exista
    IF v_duracion_nueva IS NULL THEN
        RAISE EXCEPTION
        'No se encontro la duracion del contrato %',
        NEW.id_contrato;
    END IF;

    -- Las funciones canceladas no ocupan la sala
    IF NEW.estado <> 'CANCELADA' THEN

        -- Revisar si existe otra funcion cruzada
        SELECT COUNT(*)
        INTO v_cruces
        FROM funciones f
        JOIN contratos c
            ON c.id_contrato = f.id_contrato
        WHERE f.id_sala = NEW.id_sala
          AND f.id_funcion <> COALESCE(NEW.id_funcion, 0)
          AND f.estado <> 'CANCELADA'
          AND NEW.fecha_hora <
              f.fecha_hora + (c.duracion_min * INTERVAL '1 minute')
          AND NEW.fecha_hora +
              (v_duracion_nueva * INTERVAL '1 minute')
              > f.fecha_hora;

        -- Impedir el cruce de horarios
        IF v_cruces > 0 THEN
            RAISE EXCEPTION
            'La sala % ya tiene una funcion que se cruza con este horario',
            NEW.id_sala;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Crear el trigger

CREATE TRIGGER trg_validar_cruce_funciones
BEFORE INSERT OR UPDATE
ON funciones
FOR EACH ROW
EXECUTE FUNCTION fn_validar_cruce_funciones();

-- CASO DE EXITO
-- Consultar las funciones registradas por sala

SELECT
    f.id_funcion,
    f.id_sala,
    f.id_contrato,
    f.fecha_hora,
    c.duracion_min,
    f.fecha_hora +
        (c.duracion_min * INTERVAL '1 minute') AS hora_final,
    f.estado
FROM funciones f
JOIN contratos c
    ON c.id_contrato = f.id_contrato
WHERE f.estado <> 'CANCELADA'
ORDER BY f.id_sala, f.fecha_hora;


-- CASO DE ERROR
-- Intentar crear una funcion en un horario que se cruza
-- con otra funcion de la misma sala

DO $$
DECLARE
    v_id_sala INT;
    v_id_contrato INT;
    v_fecha_hora TIMESTAMP;
BEGIN
    -- Buscar una sala con una funcion no cancelada
    SELECT f.id_sala, f.fecha_hora
    INTO v_id_sala, v_fecha_hora
    FROM funciones f
    WHERE f.estado <> 'CANCELADA'
    LIMIT 1;

    -- Buscar un contrato disponible
    SELECT id_contrato
    INTO v_id_contrato
    FROM contratos
    LIMIT 1;

    IF v_id_sala IS NULL OR v_id_contrato IS NULL THEN
        RAISE NOTICE
        'No se pudo realizar la prueba: faltan funciones o contratos registrados.';
    ELSE
        BEGIN
            INSERT INTO funciones (
                id_sala,
                id_contrato,
                fecha_hora,
                estado
            )
            VALUES (
                v_id_sala,
                v_id_contrato,
                v_fecha_hora + INTERVAL '30 minutes',
                'PROGRAMADA'
            );

            RAISE NOTICE
            'La funcion fue registrada; no se produjo el error esperado.';

        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE 'CASO DE ERROR: %', SQLERRM;
        END;
    END IF;
END;
$$;

-- TRIGGER 5
-- Validar que no se desactive un tipo de boleta
-- que ya tenga ventas pagadas

DROP TRIGGER IF EXISTS trg_validar_desactivar_tipo_boleta
ON tipos_boleta;

CREATE OR REPLACE FUNCTION fn_validar_desactivar_tipo_boleta()
RETURNS TRIGGER AS $$
DECLARE
    v_ventas INT;
BEGIN
    -- Revisar si el tipo de boleta se quiere desactivar
    IF OLD.activo = TRUE
       AND NEW.activo = FALSE THEN

        -- Contar las ventas pagadas
        SELECT COUNT(*)
        INTO v_ventas
        FROM ventas
        WHERE id_tipo_boleta = NEW.id_tipo_boleta
          AND estado = 'PAGADA';

        -- Impedir la desactivacion si tiene ventas pagadas
        IF v_ventas > 0 THEN
            RAISE EXCEPTION
            'No se puede desactivar el tipo de boleta %, tiene % venta(s) pagada(s)',
            NEW.nombre,
            v_ventas;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Crear el trigger

CREATE TRIGGER trg_validar_desactivar_tipo_boleta
BEFORE UPDATE OF activo
ON tipos_boleta
FOR EACH ROW
EXECUTE FUNCTION fn_validar_desactivar_tipo_boleta();


-- CASO DE EXITO
-- Consultar los tipos de boleta activos que no tienen ventas pagadas

SELECT
    tb.id_tipo_boleta,
    tb.nombre,
    tb.activo,
    COUNT(v.id_venta) AS ventas_pagadas
FROM tipos_boleta tb
LEFT JOIN ventas v
    ON v.id_tipo_boleta = tb.id_tipo_boleta
    AND v.estado = 'PAGADA'
GROUP BY
    tb.id_tipo_boleta,
    tb.nombre,
    tb.activo
ORDER BY tb.id_tipo_boleta;


-- CASO DE ERROR
-- Intentar desactivar un tipo de boleta
-- que tenga ventas pagadas

DO $$
DECLARE
    v_id_tipo_boleta INT;
BEGIN
    -- Buscar un tipo de boleta activo que tenga ventas pagadas
    SELECT tb.id_tipo_boleta
    INTO v_id_tipo_boleta
    FROM tipos_boleta tb
    JOIN ventas v
        ON v.id_tipo_boleta = tb.id_tipo_boleta
    WHERE tb.activo = TRUE
      AND v.estado = 'PAGADA'
    GROUP BY tb.id_tipo_boleta
    LIMIT 1;

    IF v_id_tipo_boleta IS NULL THEN
        RAISE NOTICE
        'CASO DE ERROR NO EJECUTADO: No hay tipos de boleta activos con ventas pagadas.';
    ELSE
        BEGIN
            UPDATE tipos_boleta
            SET activo = FALSE
            WHERE id_tipo_boleta = v_id_tipo_boleta;

            RAISE NOTICE
            'La desactivacion fue aceptada; no se produjo el error esperado.';

        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE 'CASO DE ERROR: %', SQLERRM;
        END;
    END IF;
END;
$$;

-- TRIGGER 6
-- Validar las fechas del espectador

DROP TRIGGER IF EXISTS trg_validar_fechas_espectador
ON espectadores;

CREATE OR REPLACE FUNCTION fn_validar_fechas_espectador()
RETURNS TRIGGER AS $$
BEGIN
    -- Validar que la fecha de nacimiento no sea futura
    IF NEW.fecha_nacimiento > CURRENT_DATE THEN
        RAISE EXCEPTION
        'La fecha de nacimiento del espectador no puede ser futura';
    END IF;

    -- Validar que la fecha de registro no sea futura
    IF NEW.fecha_registro > CURRENT_TIMESTAMP THEN
        RAISE EXCEPTION
        'La fecha de registro del espectador no puede ser futura';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Crear el trigger

CREATE TRIGGER trg_validar_fechas_espectador
BEFORE INSERT OR UPDATE
ON espectadores
FOR EACH ROW
EXECUTE FUNCTION fn_validar_fechas_espectador();


-- CASO DE EXITO
-- Consultar los espectadores y sus fechas registradas

SELECT
    id_espectador,
    nombres,
    apellidos,
    fecha_nacimiento,
    fecha_registro
FROM espectadores
ORDER BY id_espectador;


-- CASO DE ERROR
-- Intentar registrar un espectador con fecha de nacimiento futura

DO $$
BEGIN
    BEGIN
        INSERT INTO espectadores (
            nombres,
            apellidos,
            fecha_nacimiento,
            fecha_registro
        )
        VALUES (
            'Pedro',
            'Prueba',
            '2030-01-01',
            CURRENT_TIMESTAMP
        );

        RAISE NOTICE
        'La insercion fue aceptada; no se produjo el error esperado.';

    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE 'CASO DE ERROR: %', SQLERRM;
    END;
END;
$$;

-- TRIGGER 7
-- Validar que un empleado no tenga una fecha de ingreso futura

DROP TRIGGER IF EXISTS trg_validar_fecha_staff ON staff;

CREATE OR REPLACE FUNCTION fn_validar_fecha_staff()
RETURNS TRIGGER AS $$
BEGIN
    -- Revisar la fecha de ingreso
    IF NEW.fecha_ingreso > CURRENT_DATE THEN
        RAISE EXCEPTION
        'La fecha de ingreso del empleado no puede ser futura';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Crear el trigger

CREATE TRIGGER trg_validar_fecha_staff
BEFORE INSERT OR UPDATE
ON staff
FOR EACH ROW
EXECUTE FUNCTION fn_validar_fecha_staff();


-- CASO DE EXITO
-- Consultar los empleados y sus fechas de ingreso

SELECT
    *
FROM staff
ORDER BY fecha_ingreso;


-- CASO DE ERROR
-- Intentar registrar un empleado con fecha de ingreso futura

DO $$
BEGIN
    BEGIN
        INSERT INTO staff (fecha_ingreso)
        VALUES ('2030-01-01');

        RAISE NOTICE
        'La insercion fue aceptada; no se produjo el error esperado.';

    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE 'CASO DE ERROR: %', SQLERRM;
    END;
END;
$$;
-- TRIGGER 8
-- Validar las ventas y calcular automaticamente el valor de la boleta

DROP TRIGGER IF EXISTS trg_validar_venta ON ventas;

CREATE OR REPLACE FUNCTION fn_validar_venta()
RETURNS TRIGGER AS $$
DECLARE
    v_estado_funcion VARCHAR(12);
    v_precio_base NUMERIC(10,2);
    v_factor NUMERIC(3,2);
    v_tipo_activo BOOLEAN;
    v_cargo VARCHAR(25);
    v_staff_activo BOOLEAN;
BEGIN
    -- Obtener informacion de la funcion
    SELECT estado, precio_base
    INTO v_estado_funcion, v_precio_base
    FROM funciones
    WHERE id_funcion = NEW.id_funcion;

    IF v_estado_funcion IS NULL THEN
        RAISE EXCEPTION 'La funcion % no existe', NEW.id_funcion;
    END IF;

    IF v_estado_funcion = 'CANCELADA' THEN
        RAISE EXCEPTION 'No se pueden realizar ventas para una funcion cancelada';
    END IF;

    IF v_estado_funcion = 'FINALIZADA' THEN
        RAISE EXCEPTION 'No se pueden realizar nuevas ventas para una funcion finalizada';
    END IF;

    -- Obtener el tipo de boleta
    SELECT factor_precio, activo
    INTO v_factor, v_tipo_activo
    FROM tipos_boleta
    WHERE id_tipo_boleta = NEW.id_tipo_boleta;

    IF v_factor IS NULL THEN
        RAISE EXCEPTION 'El tipo de boleta % no existe', NEW.id_tipo_boleta;
    END IF;

    IF v_tipo_activo = FALSE THEN
        RAISE EXCEPTION 'El tipo de boleta seleccionado se encuentra inactivo';
    END IF;

    -- Calcular el valor unitario
    NEW.valor_unitario := ROUND(v_precio_base * v_factor, 2);

    -- Validar ventas por taquilla
    IF NEW.canal = 'TAQUILLA' THEN
        IF NEW.id_staff IS NULL THEN
            RAISE EXCEPTION 'Una venta por taquilla debe registrar el empleado responsable';
        END IF;

        SELECT cargo, activo
        INTO v_cargo, v_staff_activo
        FROM staff
        WHERE id_staff = NEW.id_staff;

        IF v_cargo IS NULL THEN
            RAISE EXCEPTION 'El empleado indicado no existe';
        END IF;

        IF v_staff_activo = FALSE THEN
            RAISE EXCEPTION 'El empleado se encuentra inactivo';
        END IF;

        IF v_cargo <> 'TAQUILLERO' THEN
            RAISE EXCEPTION 'El empleado debe tener cargo TAQUILLERO para realizar ventas por taquilla';
        END IF;
    END IF;

    -- Las ventas web o app no necesitan empleado
    IF NEW.canal IN ('WEB', 'APP') THEN
        NEW.id_staff := NULL;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Crear el trigger

CREATE TRIGGER trg_validar_venta
BEFORE INSERT OR UPDATE
ON ventas
FOR EACH ROW
EXECUTE FUNCTION fn_validar_venta();


-- CASO DE EXITO
-- Consultar las ventas y los valores calculados

SELECT
    v.id_venta,
    v.id_funcion,
    v.id_tipo_boleta,
    v.cantidad,
    v.canal,
    v.estado,
    v.valor_unitario,
    ROUND(v.valor_unitario * v.cantidad, 2) AS valor_total
FROM ventas v
ORDER BY v.id_venta;


-- CASO DE ERROR
-- Intentar registrar una venta para una funcion cancelada

DO $$
DECLARE
    v_id_funcion INT;
    v_id_tipo_boleta INT;
BEGIN
    SELECT id_funcion
    INTO v_id_funcion
    FROM funciones
    WHERE estado = 'CANCELADA'
    LIMIT 1;

    SELECT id_tipo_boleta
    INTO v_id_tipo_boleta
    FROM tipos_boleta
    WHERE activo = TRUE
    LIMIT 1;

    IF v_id_funcion IS NULL OR v_id_tipo_boleta IS NULL THEN
        RAISE NOTICE
        'CASO DE ERROR NO EJECUTADO: Se necesita una funcion cancelada y un tipo de boleta activo.';
    ELSE
        BEGIN
            INSERT INTO ventas (
                id_funcion,
                id_tipo_boleta,
                cantidad,
                canal,
                estado
            )
            VALUES (
                v_id_funcion,
                v_id_tipo_boleta,
                1,
                'WEB',
                'PAGADA'
            );

            RAISE NOTICE
            'La venta fue aceptada; no se produjo el error esperado.';

        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE 'CASO DE ERROR: %', SQLERRM;
        END;
    END IF;
END;
$$;