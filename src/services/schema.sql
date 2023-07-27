CREATE DATABASE cursideslearn;

USE cursideslearn;
--
-- Estructura de tabla para la tabla `capitulo`
--

CREATE TABLE `capitulo` (
  `id_capitulo` int(11) NOT NULL,
  `nombre_capitulo` varchar(50) NOT NULL,
  `duracion_capitulo` int(11) NOT NULL
);

--
-- Volcado de datos para la tabla `capitulo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(50) NOT NULL
);

--
-- Volcado de datos para la tabla `categoria`
--



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `id_curso` int(11) NOT NULL,
  `nombre_curso` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `n_horas` int(11) NOT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `id_docente` int(11) DEFAULT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
);

--
-- Volcado de datos para la tabla `curso`
--



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente`
--

CREATE TABLE `docente` (
  `id_docente` int(11) NOT NULL,
  `nombre_docente` varchar(50) NOT NULL,
  `id_especializacion` int(11) DEFAULT NULL
);

--
-- Volcado de datos para la tabla `docente`
--



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especializacion`
--

CREATE TABLE `especializacion` (
  `id_especializacion` int(11) NOT NULL,
  `nombre_especializacion` varchar(50) NOT NULL
);

--
-- Volcado de datos para la tabla `especializacion`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_leccion`
--

CREATE TABLE `estado_leccion` (
  `id_estado` int(11) NOT NULL,
  `nombre_estado` varchar(50) NOT NULL
);

--
-- Volcado de datos para la tabla `estado_leccion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion`
--

CREATE TABLE `inscripcion` (
  `id_inscripcion` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `inscrito_en` timestamp NOT NULL DEFAULT current_timestamp()
);

--
-- Volcado de datos para la tabla `inscripcion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `leccion`
--

CREATE TABLE `leccion` (
  `id_leccion` int(11) NOT NULL,
  `nombre_leccion` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `duracion` int(11) NOT NULL,
  `id_estado_leccion` int(11) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `id_capitulo` int(11) DEFAULT NULL
);

--
-- Volcado de datos para la tabla `leccion`
--



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `progreso`
--

CREATE TABLE `progreso` (
  `id_progreso` int(11) NOT NULL,
  `puntuacion` int(11) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_ultimo_acceso` date DEFAULT NULL,
  `id_inscripcion` int(11) DEFAULT NULL,
  `id_leccion` int(11) DEFAULT NULL
); 

--
-- Volcado de datos para la tabla `progreso`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `email_usuario` varchar(50) NOT NULL,
  `contraseña_usuario` varchar(100) NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
);

--
-- Volcado de datos para la tabla `usuario`
--

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `capitulo`
--
ALTER TABLE `capitulo`
  ADD PRIMARY KEY (`id_capitulo`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id_curso`),
  ADD UNIQUE KEY `nombre_curso` (`nombre_curso`),
  ADD KEY `fk_docente_curso` (`id_docente`),
  ADD KEY `fk_categoria_curso` (`id_categoria`);

--
-- Indices de la tabla `docente`
--
ALTER TABLE `docente`
  ADD PRIMARY KEY (`id_docente`),
  ADD KEY `fk_especializacion_docente` (`id_especializacion`);

--
-- Indices de la tabla `especializacion`
--
ALTER TABLE `especializacion`
  ADD PRIMARY KEY (`id_especializacion`);

--
-- Indices de la tabla `estado_leccion`
--
ALTER TABLE `estado_leccion`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD PRIMARY KEY (`id_inscripcion`),
  ADD KEY `fk_usuario_inscripcion` (`id_usuario`),
  ADD KEY `fk_curso_inscripcion` (`id_curso`);

--
-- Indices de la tabla `leccion`
--
ALTER TABLE `leccion`
  ADD PRIMARY KEY (`id_leccion`),
  ADD KEY `fk_curso_leccion` (`id_curso`),
  ADD KEY `fk_estado_leccion` (`id_estado_leccion`),
  ADD KEY `fk_capitulo_leccion` (`id_capitulo`);

--
-- Indices de la tabla `progreso`
--
ALTER TABLE `progreso`
  ADD PRIMARY KEY (`id_progreso`),
  ADD KEY `fk_leccion_progreso` (`id_leccion`),
  ADD KEY `fk_inscripcion_progreso` (`id_inscripcion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email_usuario` (`email_usuario`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `capitulo`
--
ALTER TABLE `capitulo`
  MODIFY `id_capitulo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `docente`
--
ALTER TABLE `docente`
  MODIFY `id_docente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `especializacion`
--
ALTER TABLE `especializacion`
  MODIFY `id_especializacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `estado_leccion`
--
ALTER TABLE `estado_leccion`
  MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  MODIFY `id_inscripcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `leccion`
--
ALTER TABLE `leccion`
  MODIFY `id_leccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `progreso`
--
ALTER TABLE `progreso`
  MODIFY `id_progreso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE usuario
  MODIFY id_usuario int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `curso`
--
ALTER TABLE `curso`
  ADD CONSTRAINT `fk_categoria_curso` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  ADD CONSTRAINT `fk_docente_curso` FOREIGN KEY (`id_docente`) REFERENCES `docente` (`id_docente`);

--
-- Filtros para la tabla `docente`
--
ALTER TABLE `docente`
  ADD CONSTRAINT `fk_especializacion_docente` FOREIGN KEY (`id_especializacion`) REFERENCES `especializacion` (`id_especializacion`);

--
-- Filtros para la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD CONSTRAINT `fk_curso_inscripcion` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`),
  ADD CONSTRAINT `fk_usuario_inscripcion` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `leccion`
--
ALTER TABLE `leccion`
  ADD CONSTRAINT `fk_capitulo_leccion` FOREIGN KEY (`id_capitulo`) REFERENCES `capitulo` (`id_capitulo`),
  ADD CONSTRAINT `fk_curso_leccion` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`),
  ADD CONSTRAINT `fk_estado_leccion` FOREIGN KEY (`id_estado_leccion`) REFERENCES `estado_leccion` (`id_estado`);

--
-- Filtros para la tabla `progreso`
--
ALTER TABLE `progreso`
  ADD CONSTRAINT `fk_inscripcion_progreso` FOREIGN KEY (`id_inscripcion`) REFERENCES `inscripcion` (`id_inscripcion`),
  ADD CONSTRAINT `fk_leccion_progreso` FOREIGN KEY (`id_leccion`) REFERENCES `leccion` (`id_leccion`);


-- Insersiones de datos 

INSERT INTO `capitulo` (`id_capitulo`, `nombre_capitulo`, `duracion_capitulo`) VALUES
(1, 'Formulario', 1),
(2, 'Metadatos', 1);


INSERT INTO `categoria` (`id_categoria`, `nombre_categoria`) VALUES
(1, 'Diseño de Bases de datos'),
(3, 'UX|UI'),
(4, 'infraestructura'),
(5, 'Ciberseguridad');


INSERT INTO `curso` (`id_curso`, `nombre_curso`, `descripcion`, `n_horas`, `id_categoria`, `id_docente`, `creado_en`) VALUES
(1, 'HTML', 'Aprende a crear paginas web, Estudia HTML!', 10, 3, 2, '2023-07-21 00:15:33');


INSERT INTO `docente` (`id_docente`, `nombre_docente`, `id_especializacion`) VALUES
(1, 'Jolhver', 2),
(2, 'Miguel', 1),
(3, 'Bermen', 2);


INSERT INTO `especializacion` (`id_especializacion`, `nombre_especializacion`) VALUES
(1, 'Frontend'),
(2, 'Backend'),
(3, 'DevOps');


INSERT INTO `estado_leccion` (`id_estado`, `nombre_estado`) VALUES
(1, 'Completada'),
(2, 'Incompleta'),
(3, 'No iniciada');


INSERT INTO `inscripcion` (`id_inscripcion`, `id_usuario`, `id_curso`, `inscrito_en`) VALUES
(1, 7, 1, '2023-07-21 01:27:50'),
(2, 55903, 1, '2023-07-21 04:22:55'),
(4, 54731, 1, '2023-07-24 01:49:36');

INSERT INTO `leccion` (`id_leccion`, `nombre_leccion`, `descripcion`, `duracion`, `id_estado_leccion`, `id_curso`, `id_capitulo`) VALUES
(1, 'Inputs', 'Creacion de entradas de texto y sus caracteristicas', 40, 2, 1, 1),
(2, 'Meta', 'Diferentes tipos y utilidades', 30, 2, 1, 2),
(3, 'Redireccionamiento', 'Enviar formularios por los distintos metodos HTTP', 40, 1, 1, 1);


INSERT INTO `progreso` (`id_progreso`, `puntuacion`, `fecha_inicio`, `fecha_ultimo_acceso`, `id_inscripcion`, `id_leccion`) VALUES
(6, 0, '2023-07-23', NULL, 4, 1);


INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `email_usuario`, `contraseña_usuario`, `creado_en`) VALUES
(7, 'miller', 'kalednarino@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$KSEObh025XXWc2Ujw+3AaQ$qAdQ+2kmnEdlTHabUvE7t2mgttNqUOnbc+SLzU+OeRU', '2023-07-20 18:19:16'),
(54731, 'jorgeEliasCalderon', 'jorgeEl@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$ipOeiPPbyrfJ1mN2zlAJVA$0HCunKDW8W+alQEJLRAwBFFB9ZMZBfRXQuTBO2pHdgw', '2023-07-24 01:37:13'),
(55903, 'estebanGameplay', 'jose@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$4B4bXkBsaTYBZwleCw6brg$SI8uhTl0WCLplnnWyq46iQQlvcEOULerjMlJLMSAEVI', '2023-07-21 04:19:11');