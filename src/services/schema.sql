
USE cursideslearn;
DROP DATABASE cursideslearn;

CREATE TABLE Usuario (
    id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(50) NOT NULL,
    email_usuario VARCHAR(50) UNIQUE NOT NULL,
    contraseña_usuario VARCHAR(50) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE Inscripcion (
    id_inscripcion INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT, 
    id_curso INT,
    inscrito_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Curso (
    id_curso INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre_curso VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT NOT NULL,
    n_horas INT NOT NULL,
    id_categoria INT,
    id_docente INT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Categoria (
    id_categoria INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(50) NOT NULL
); 

CREATE TABLE Docente (
    id_docente INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre_docente VARCHAR(50) NOT NULL,
    id_especializacion INT
);

CREATE TABLE Especializacion (
    id_especializacion INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre_especializacion VARCHAR(50) NOT NULL
);

CREATE TABLE Estado_leccion (
    id_estado INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre_estado VARCHAR(50) NOT NULL
); 

CREATE TABLE Leccion (
    id_leccion INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre_leccion VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    duracion VARCHAR(50) NOT NULL,
    id_estado_leccion INT,
    id_curso INT
);

CREATE TABLE Capitulo (
    id_capitulo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre_capitulo VARCHAR(50) NOT NULL,
    duracion_capitulo VARCHAR(50) NOT NULL,
    id_leccion INT
);


ALTER TABLE Inscripcion 
ADD CONSTRAINT fk_usuario_inscripcion
FOREIGN KEY(id_usuario)
REFERENCES Usuario(id_usuario);

ALTER TABLE Inscripcion 
ADD CONSTRAINT fk_curso_inscripcion
FOREIGN KEY (id_curso)
REFERENCES Curso(id_curso);

ALTER TABLE Curso 
ADD CONSTRAINT fk_docente_curso
FOREIGN KEY (id_docente) 
REFERENCES Docente(id_docente); 

ALTER TABLE Curso 
ADD CONSTRAINT fk_categoria_curso
FOREIGN KEY (id_categoria) 
REFERENCES Categoria(id_categoria); 

ALTER TABLE Docente 
ADD CONSTRAINT fk_especializacion_docente
FOREIGN KEY (id_especializacion)
REFERENCES Especializacion(id_especializacion);

ALTER TABLE Leccion 
ADD CONSTRAINT fk_curso_leccion
FOREIGN KEY (id_curso)
REFERENCES Curso(id_curso);


ALTER TABLE Leccion
ADD CONSTRAINT fk_estado_leccion
FOREIGN KEY (id_estado_leccion)
REFERENCES Estado_leccion(id_estado);

ALTER TABLE Capitulo
ADD CONSTRAINT fk_leccion_capitulo
FOREIGN KEY (id_leccion)
REFERENCES Leccion(id_leccion);


INSERT INTO Usuario (nombre_usuario, email_usuario, contraseña_usuario) VALUES ("miller", "kaled@narino.com", "miller2005");