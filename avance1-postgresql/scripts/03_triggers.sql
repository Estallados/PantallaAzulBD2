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