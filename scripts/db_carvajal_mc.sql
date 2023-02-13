-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-02-2023 a las 13:31:34
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_carvajal_mc`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `country` varchar(100) NOT NULL,
  `cell_phone` int(11) NOT NULL,
  `address` varchar(200) NOT NULL,
  `type_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `last_name`, `email`, `country`, `cell_phone`, `address`, `type_id`, `user_id`, `createdAt`, `updatedAt`) VALUES
(26, 'Miguel Angel', 'Camacho Ramirez', '', '', 0, '', 1, 14, '2023-02-13 01:06:50', '2023-02-13 01:06:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_contacts`
--

CREATE TABLE `type_contacts` (
  `id` int(11) NOT NULL,
  `type` varchar(200) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `type_contacts`
--

INSERT INTO `type_contacts` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 'FAMILIAR', '2023-02-12 08:15:42', '2023-02-12 08:15:42'),
(2, 'AMIGOS', '2023-02-12 08:15:42', '2023-02-12 08:15:42'),
(3, 'TRABAJADORES', '2023-02-13 00:13:03', '2023-02-13 00:13:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `country` varchar(100) DEFAULT NULL,
  `cell_phone` int(11) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `image` longtext DEFAULT NULL,
  `password` longtext NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `last_name`, `email`, `country`, `cell_phone`, `address`, `image`, `password`, `state`, `createdAt`, `updatedAt`) VALUES
(14, 'Miguel angel', 'Camacho', 'miguel@mail.com', NULL, NULL, NULL, NULL, '$2a$10$Vl5VhCLnFXd7WBR03Qd5Cun4v7MFg0f3rSAtIgVIzLlyyurGaTX3i', 1, '2023-02-12 18:22:15', '2023-02-12 18:22:15'),;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type` (`type_id`),
  ADD KEY `user` (`user_id`);

--
-- Indices de la tabla `type_contacts`
--
ALTER TABLE `type_contacts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type` (`type`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `type_contacts`
--
ALTER TABLE `type_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `type_contacts` (`id`),
  ADD CONSTRAINT `contacts_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
