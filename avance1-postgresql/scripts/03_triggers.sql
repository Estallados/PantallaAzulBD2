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