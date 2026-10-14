

-- 1. SALAS


CREATE TABLE salas (
    id_sala INT GENERATED ALWAYS AS IDENTITY,
    nombre VARCHAR(40) NOT NULL,
    capacidad INT NOT NULL,
    tipo_sala VARCHAR(10) NOT NULL,
    estado VARCHAR(15) NOT NULL DEFAULT 'ACTIVA',

    CONSTRAINT pk_salas
        PRIMARY KEY (id_sala),

    CONSTRAINT uq_salas_nombre
        UNIQUE (nombre),

    CONSTRAINT ck_salas_nombre
        CHECK (LENGTH(TRIM(nombre)) > 0),

    CONSTRAINT ck_salas_capacidad
        CHECK (capacidad BETWEEN 20 AND 400),

    CONSTRAINT ck_salas_tipo
        CHECK (tipo_sala IN (
            '2D',
            '3D',
            'PREMIUM',
            'AUTOR'
        )),

    CONSTRAINT ck_salas_estado
        CHECK (estado IN (
            'ACTIVA',
            'MANTENIMIENTO',
            'INACTIVA'
        ))
);


-- 2. ACTORES_DIRECTORES


CREATE TABLE actores_directores (
    id_artista INT GENERATED ALWAYS AS IDENTITY,
    nombres VARCHAR(60) NOT NULL,
    apellidos VARCHAR(60) NOT NULL,
    nacionalidad VARCHAR(40) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    rol VARCHAR(10) NOT NULL,
    email VARCHAR(100),
    activo BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT pk_actores_directores
        PRIMARY KEY (id_artista),

    CONSTRAINT uq_artista_email
        UNIQUE (email),

    CONSTRAINT ck_artista_nombres
        CHECK (
            LENGTH(TRIM(nombres)) > 0
            AND LENGTH(TRIM(apellidos)) > 0
        ),

    CONSTRAINT ck_artista_nacionalidad
        CHECK (LENGTH(TRIM(nacionalidad)) > 0),

    CONSTRAINT ck_artista_rol
        CHECK (rol IN (
            'ACTOR',
            'DIRECTOR',
            'AMBOS'
        )),

    CONSTRAINT ck_artista_nacimiento
        CHECK (fecha_nacimiento < CURRENT_DATE),

    CONSTRAINT ck_artista_email
        CHECK (
            email IS NULL
            OR email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
        )
);


-- 3. CONTRATOS
-- Un contrato vincula .


CREATE TABLE contratos (
    id_contrato INT GENERATED ALWAYS AS IDENTITY,
    id_artista INT NOT NULL,
    titulo_obra VARCHAR(120) NOT NULL,
    genero VARCHAR(30) NOT NULL,
    duracion_min INT NOT NULL,
    clasificacion VARCHAR(4) NOT NULL,
    tipo_contrato VARCHAR(25) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    valor NUMERIC(12,2) NOT NULL,
    estado VARCHAR(12) NOT NULL DEFAULT 'VIGENTE',

    CONSTRAINT pk_contratos
        PRIMARY KEY (id_contrato),

    CONSTRAINT fk_contratos_artista
        FOREIGN KEY (id_artista)
        REFERENCES actores_directores (id_artista)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT ck_contratos_titulo
        CHECK (LENGTH(TRIM(titulo_obra)) > 0),

    CONSTRAINT ck_contratos_genero
        CHECK (LENGTH(TRIM(genero)) > 0),

    CONSTRAINT ck_contratos_duracion
        CHECK (duracion_min BETWEEN 40 AND 300),

    CONSTRAINT ck_contratos_clasificacion
        CHECK (clasificacion IN (
            'TP',
            '7+',
            '12+',
            '15+',
            '18+'
        )),

    CONSTRAINT ck_contratos_tipo
        CHECK (tipo_contrato IN (
            'EXHIBICION_PELICULA',
            'PARTICIPACION_EVENTO'
        )),

    CONSTRAINT ck_contratos_fechas
        CHECK (fecha_fin >= fecha_inicio),

    CONSTRAINT ck_contratos_valor
        CHECK (valor > 0),

    CONSTRAINT ck_contratos_estado
        CHECK (estado IN (
            'VIGENTE',
            'FINALIZADO',
            'CANCELADO'
        ))
);


-- 4. FUNCIONES


CREATE TABLE funciones (
    id_funcion INT GENERATED ALWAYS AS IDENTITY,
    id_sala INT NOT NULL,
    id_contrato INT NOT NULL,
    fecha_hora TIMESTAMP NOT NULL,
    idioma VARCHAR(12) NOT NULL DEFAULT 'SUBTITULADA',
    precio_base NUMERIC(10,2) NOT NULL,
    estado VARCHAR(12) NOT NULL DEFAULT 'PROGRAMADA',

    CONSTRAINT pk_funciones
        PRIMARY KEY (id_funcion),

    CONSTRAINT fk_funciones_sala
        FOREIGN KEY (id_sala)
        REFERENCES salas (id_sala)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_funciones_contrato
        FOREIGN KEY (id_contrato)
        REFERENCES contratos (id_contrato)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_funciones_sala_hora
        UNIQUE (id_sala, fecha_hora),

    CONSTRAINT ck_funciones_idioma
        CHECK (idioma IN (
            'ORIGINAL',
            'SUBTITULADA',
            'DOBLADA'
        )),

    CONSTRAINT ck_funciones_precio
        CHECK (precio_base BETWEEN 5000 AND 100000),

    CONSTRAINT ck_funciones_estado
        CHECK (estado IN (
            'PROGRAMADA',
            'EN_CURSO',
            'FINALIZADA',
            'CANCELADA'
        ))
);


-- 5. TIPOS_BOLETA


CREATE TABLE tipos_boleta (
    id_tipo_boleta INT GENERATED ALWAYS AS IDENTITY,
    nombre VARCHAR(30) NOT NULL,
    descripcion VARCHAR(150),
    factor_precio NUMERIC(3,2) NOT NULL DEFAULT 1.00,
    activo BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT pk_tipos_boleta
        PRIMARY KEY (id_tipo_boleta),

    CONSTRAINT uq_tipos_boleta_nombre
        UNIQUE (nombre),

    CONSTRAINT ck_tipos_boleta_nombre
        CHECK (LENGTH(TRIM(nombre)) > 0),

    CONSTRAINT ck_tipos_boleta_descripcion
        CHECK (
            descripcion IS NULL
            OR LENGTH(TRIM(descripcion)) > 0
        ),

    CONSTRAINT ck_tipos_boleta_factor
        CHECK (factor_precio > 0 AND factor_precio <= 1.50)
);


-- 6. ESPECTADORES


CREATE TABLE espectadores (
    id_espectador INT GENERATED ALWAYS AS IDENTITY,
    tipo_documento VARCHAR(3) NOT NULL,
    numero_documento VARCHAR(20) NOT NULL,
    nombres VARCHAR(60) NOT NULL,
    apellidos VARCHAR(60) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    fecha_nacimiento DATE NOT NULL,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_espectadores
        PRIMARY KEY (id_espectador),

    CONSTRAINT uq_espectadores_doc
        UNIQUE (tipo_documento, numero_documento),

    CONSTRAINT uq_espectadores_email
        UNIQUE (email),

    CONSTRAINT ck_espectadores_tipodoc
        CHECK (tipo_documento IN (
            'CC',
            'TI',
            'CE',
            'PAS'
        )),

    CONSTRAINT ck_espectadores_documento
        CHECK (LENGTH(TRIM(numero_documento)) > 0),

    CONSTRAINT ck_espectadores_nombres
        CHECK (
            LENGTH(TRIM(nombres)) > 0
            AND LENGTH(TRIM(apellidos)) > 0
        ),

    CONSTRAINT ck_espectadores_email
        CHECK (
            email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
        ),

    CONSTRAINT ck_espectadores_telefono
        CHECK (
            telefono IS NULL
            OR LENGTH(TRIM(telefono)) > 0
        ),

    CONSTRAINT ck_espectadores_nacimiento
        CHECK (fecha_nacimiento < CURRENT_DATE),

    CONSTRAINT ck_espectadores_registro
        CHECK (fecha_registro <= CURRENT_TIMESTAMP)
);


-- 7. STAFF


CREATE TABLE staff (
    id_staff INT GENERATED ALWAYS AS IDENTITY,
    documento VARCHAR(20) NOT NULL,
    nombres VARCHAR(60) NOT NULL,
    apellidos VARCHAR(60) NOT NULL,
    cargo VARCHAR(25) NOT NULL,
    id_sala INT,
    fecha_ingreso DATE NOT NULL,
    salario NUMERIC(12,2) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT pk_staff
        PRIMARY KEY (id_staff),

    CONSTRAINT uq_staff_documento
        UNIQUE (documento),

    CONSTRAINT fk_staff_sala
        FOREIGN KEY (id_sala)
        REFERENCES salas (id_sala)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT ck_staff_documento
        CHECK (LENGTH(TRIM(documento)) > 0),

    CONSTRAINT ck_staff_nombres
        CHECK (
            LENGTH(TRIM(nombres)) > 0
            AND LENGTH(TRIM(apellidos)) > 0
        ),

    CONSTRAINT ck_staff_cargo
        CHECK (cargo IN (
            'TAQUILLERO',
            'ACOMODADOR',
            'PROYECCIONISTA',
            'CONFITERIA',
            'ADMINISTRADOR',
            'SUPERVISOR',
            'SERVICIOS_GENERALES',
            'MANTENIMIENTO',
            'CONTABILIDAD'
        )),

    CONSTRAINT ck_staff_fecha_ingreso
        CHECK (fecha_ingreso <= CURRENT_DATE),

    CONSTRAINT ck_staff_salario
        CHECK (salario > 0)
);


-- 8. VENTAS
-- Cada registro representa una operacion de compra.



CREATE TABLE ventas (
    id_venta INT GENERATED ALWAYS AS IDENTITY,
    id_espectador INT NOT NULL,
    id_funcion INT NOT NULL,
    id_tipo_boleta INT NOT NULL,
    id_staff INT,
    cantidad INT NOT NULL,
    valor_unitario NUMERIC(10,2) NOT NULL,
    total NUMERIC(12,2)
        GENERATED ALWAYS AS (cantidad * valor_unitario) STORED,
    fecha_venta TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    canal VARCHAR(10) NOT NULL,
    estado VARCHAR(10) NOT NULL DEFAULT 'PAGADA',

    CONSTRAINT pk_ventas
        PRIMARY KEY (id_venta),

    CONSTRAINT fk_ventas_espectador
        FOREIGN KEY (id_espectador)
        REFERENCES espectadores (id_espectador)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_ventas_funcion
        FOREIGN KEY (id_funcion)
        REFERENCES funciones (id_funcion)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_ventas_tipo
        FOREIGN KEY (id_tipo_boleta)
        REFERENCES tipos_boleta (id_tipo_boleta)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_ventas_staff
        FOREIGN KEY (id_staff)
        REFERENCES staff (id_staff)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT ck_ventas_cantidad
        CHECK (cantidad BETWEEN 1 AND 10),

    CONSTRAINT ck_ventas_valor
        CHECK (valor_unitario > 0),

    CONSTRAINT ck_ventas_canal
        CHECK (canal IN (
            'TAQUILLA',
            'WEB',
            'APP'
        )),

    CONSTRAINT ck_ventas_estado
        CHECK (estado IN (
            'PAGADA',
            'ANULADA'
        )),

    CONSTRAINT ck_ventas_taquilla
        CHECK (canal <> 'TAQUILLA' OR id_staff IS NOT NULL)
);


-- 9. INDICES BASICOS


CREATE INDEX idx_contratos_artista
    ON contratos (id_artista);

CREATE INDEX idx_contratos_titulo
    ON contratos (titulo_obra);

CREATE INDEX idx_contratos_estado
    ON contratos (estado);

CREATE INDEX idx_funciones_contrato
    ON funciones (id_contrato);

CREATE INDEX idx_funciones_fecha
    ON funciones (fecha_hora);

CREATE INDEX idx_funciones_estado_fecha
    ON funciones (estado, fecha_hora);

CREATE INDEX idx_staff_sala
    ON staff (id_sala);

CREATE INDEX idx_staff_cargo_activo
    ON staff (cargo, activo);

CREATE INDEX idx_ventas_espectador_fecha
    ON ventas (id_espectador, fecha_venta);

CREATE INDEX idx_ventas_funcion
    ON ventas (id_funcion);

CREATE INDEX idx_ventas_tipo_boleta
    ON ventas (id_tipo_boleta);

CREATE INDEX idx_ventas_staff
    ON ventas (id_staff);

CREATE INDEX idx_ventas_estado_fecha
    ON ventas (estado, fecha_venta);
