-- Trigger 1
-- Aqui se valida que la fecha de nacimiento del artista
-- no sea una fecha futura

CREATE OR REPLACE FUNCTION fn_validar_fecha_artista()
RETURNS TRIGGER AS $$
BEGIN

    -- Se revisa la fecha de nacimiento
    IF NEW.fecha_nacimiento > CURRENT_DATE THEN

        RAISE EXCEPTION
        'La fecha de nacimiento del artista no puede ser futura';

    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


-- Aqui se crea el trigger

CREATE TRIGGER trg_validar_fecha_artista
BEFORE INSERT OR UPDATE
ON actores_directores
FOR EACH ROW
EXECUTE FUNCTION fn_validar_fecha_artista();

