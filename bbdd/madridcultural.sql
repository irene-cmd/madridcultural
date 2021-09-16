-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-09-2021 a las 18:28:28
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `madridcultural`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `lugar` varchar(45) NOT NULL,
  `fecha` datetime NOT NULL,
  `descripcion` text NOT NULL,
  `fk_preferencia` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `nombre`, `lugar`, `fecha`, `descripcion`, `fk_preferencia`, `estado`) VALUES
(16, 'Heavy metal', 'Teatro Real', '2021-09-24 23:00:00', 'Concierto heavy metal', 27, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preferencias`
--

CREATE TABLE `preferencias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `preferencias`
--

INSERT INTO `preferencias` (`id`, `nombre`, `estado`) VALUES
(23, 'cine', 1),
(25, 'arte', 1),
(27, 'música', 1),
(29, 'deportes', 1),
(31, 'teatro', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbi_usuarios_eventos`
--

CREATE TABLE `tbi_usuarios_eventos` (
  `id` int(11) NOT NULL,
  `propietario` tinyint(1) DEFAULT NULL,
  `fk_usuario` int(11) NOT NULL,
  `fk_evento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbi_usuarios_eventos`
--

INSERT INTO `tbi_usuarios_eventos` (`id`, `propietario`, `fk_usuario`, `fk_evento`) VALUES
(3, 18, 18, 16),
(5, 0, 19, 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(60) NOT NULL,
  `direccion` mediumtext NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `sexo` enum('F','M','O') NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `direccion`, `fecha_nacimiento`, `email`, `password`, `sexo`, `estado`) VALUES
(2, 'Irene', 'Alarcón', 'Avenida de la Albufera', '2021-08-11', 'irene@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'F', 1),
(18, 'Macarena', 'Lopez', 'Calle Valverde 5', '0000-00-00', 'macarena@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'F', 1),
(19, 'Raul', 'Gomez', 'Calle Gran Via 12', '0000-00-00', 'raul@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'M', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_preferencia` (`fk_preferencia`);

--
-- Indices de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbi_usuarios_eventos`
--
ALTER TABLE `tbi_usuarios_eventos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario` (`fk_usuario`),
  ADD KEY `fk_evento` (`fk_evento`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `tbi_usuarios_eventos`
--
ALTER TABLE `tbi_usuarios_eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`fk_preferencia`) REFERENCES `preferencias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbi_usuarios_eventos`
--
ALTER TABLE `tbi_usuarios_eventos`
  ADD CONSTRAINT `tbi_usuarios_eventos_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbi_usuarios_eventos_ibfk_2` FOREIGN KEY (`fk_evento`) REFERENCES `eventos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
