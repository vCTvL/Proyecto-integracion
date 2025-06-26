-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-06-2025 a las 08:32:44
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `auth_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fuentes`
--

CREATE TABLE `fuentes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `watts` int(11) NOT NULL,
  `modular` varchar(10) NOT NULL COMMENT 'Sí/No',
  `anio_lanzamiento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fuentes`
--

INSERT INTO `fuentes` (`id`, `nombre`, `marca`, `watts`, `modular`, `anio_lanzamiento`) VALUES
(1, 'RM750x', 'Corsair', 750, 'Sí', 2019),
(2, 'HX1200', 'Corsair', 1200, 'Sí', 2020),
(3, 'SF750', 'Corsair', 750, 'Sí', 2019),
(4, 'AX1600i', 'Corsair', 1600, 'Sí', 2018),
(5, 'CX650', 'Corsair', 650, 'No', 2017),
(6, 'SuperNOVA 850 G6', 'EVGA', 850, 'Sí', 2021),
(7, 'SuperNOVA 1000 P2', 'EVGA', 1000, 'Sí', 2016),
(8, 'SuperNOVA 650 GT', 'EVGA', 650, 'Semi', 2020),
(9, 'BQ 600', 'EVGA', 600, 'No', 2017),
(10, 'SuperNOVA 1600 T2', 'EVGA', 1600, 'Sí', 2016);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gabinetes`
--

CREATE TABLE `gabinetes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `tamanio` varchar(20) NOT NULL COMMENT 'ATX, Micro ATX, Mini ITX',
  `anio_lanzamiento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gabinetes`
--

INSERT INTO `gabinetes` (`id`, `nombre`, `marca`, `tamanio`, `anio_lanzamiento`) VALUES
(1, 'H510', 'NZXT', 'ATX', 2019),
(2, 'H710', 'NZXT', 'ATX', 2020),
(3, 'H210', 'NZXT', 'Mini ITX', 2019),
(4, 'H510 Flow', 'NZXT', 'ATX', 2021),
(5, 'H1', 'NZXT', 'Mini ITX', 2020),
(6, 'MasterBox Q300L', 'Cooler Master', 'Micro ATX', 2018),
(7, 'MasterCase H500', 'Cooler Master', 'ATX', 2019),
(8, 'MasterBox NR200', 'Cooler Master', 'Mini ITX', 2020),
(9, 'Cosmos C700M', 'Cooler Master', 'ATX', 2018),
(10, 'MasterBox TD500', 'Cooler Master', 'ATX', 2019);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gpus`
--

CREATE TABLE `gpus` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `memoria` int(11) NOT NULL COMMENT 'GB',
  `anio_lanzamiento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gpus`
--

INSERT INTO `gpus` (`id`, `nombre`, `marca`, `memoria`, `anio_lanzamiento`) VALUES
(1, 'GeForce RTX 3060', 'NVIDIA', 12, 2021),
(2, 'GeForce RTX 3070', 'NVIDIA', 8, 2020),
(3, 'GeForce RTX 3080', 'NVIDIA', 10, 2020),
(4, 'GeForce RTX 3090', 'NVIDIA', 24, 2020),
(5, 'GeForce RTX 4090', 'NVIDIA', 24, 2022),
(6, 'Radeon RX 6600', 'AMD', 8, 2021),
(7, 'Radeon RX 6700 XT', 'AMD', 12, 2021),
(8, 'Radeon RX 6800', 'AMD', 16, 2020),
(9, 'Radeon RX 6900 XT', 'AMD', 16, 2020),
(10, 'Radeon RX 7900 XTX', 'AMD', 24, 2022);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hdd`
--

CREATE TABLE `hdd` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `capacidad` int(11) NOT NULL COMMENT 'TB',
  `anio_lanzamiento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hdd`
--

INSERT INTO `hdd` (`id`, `nombre`, `marca`, `capacidad`, `anio_lanzamiento`) VALUES
(1, 'BarraCuda', 'Seagate', 1, 2016),
(2, 'IronWolf', 'Seagate', 4, 2017),
(3, 'SkyHawk', 'Seagate', 8, 2018),
(4, 'FireCuda', 'Seagate', 2, 2019),
(5, 'Exos', 'Seagate', 16, 2020),
(6, 'Blue', 'Western Digital', 1, 2015),
(7, 'Black', 'Western Digital', 4, 2017),
(8, 'Red', 'Western Digital', 6, 2018),
(9, 'Gold', 'Western Digital', 10, 2019),
(10, 'Purple', 'Western Digital', 12, 2020);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mobo`
--

CREATE TABLE `mobo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `tamanio` varchar(20) NOT NULL COMMENT 'ATX, Micro ATX, Mini ITX',
  `anio_lanzamiento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mobo`
--

INSERT INTO `mobo` (`id`, `nombre`, `marca`, `tamanio`, `anio_lanzamiento`) VALUES
(1, 'ROG Strix Z690-E', 'ASUS', 'ATX', 2021),
(2, 'TUF Gaming B550-PLUS', 'ASUS', 'ATX', 2020),
(3, 'ROG Strix X570-I', 'ASUS', 'Mini ITX', 2019),
(4, 'Prime B660M-A', 'ASUS', 'Micro ATX', 2022),
(5, 'ROG Crosshair VIII Hero', 'ASUS', 'ATX', 2019),
(6, 'Z690 AORUS Elite', 'Gigabyte', 'ATX', 2021),
(7, 'B550 AORUS PRO AC', 'Gigabyte', 'ATX', 2020),
(8, 'B660M DS3H', 'Gigabyte', 'Micro ATX', 2022),
(9, 'X570 I AORUS Pro', 'Gigabyte', 'Mini ITX', 2019),
(10, 'Z790 AORUS Master', 'Gigabyte', 'ATX', 2022);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `procesadores`
--

CREATE TABLE `procesadores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `marca` varchar(30) NOT NULL,
  `nucleos` int(11) NOT NULL,
  `frecuencia_base` decimal(4,2) NOT NULL,
  `socket` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `procesadores`
--

INSERT INTO `procesadores` (`id`, `nombre`, `marca`, `nucleos`, `frecuencia_base`, `socket`) VALUES
(1, 'Ryzen 9 7950X', 'AMD', 16, 4.50, 'AM5'),
(2, 'Ryzen 7 7800X3D', 'AMD', 8, 4.40, 'AM5'),
(3, 'Ryzen 5 7600X', 'AMD', 6, 4.70, 'AM5'),
(4, 'Ryzen Threadripper 7970X', 'AMD', 32, 4.20, 'sTRX4'),
(5, 'Ryzen 9 7900X', 'AMD', 12, 4.70, 'AM5'),
(6, 'Core i9-13900K', 'Intel', 24, 3.00, 'LGA1700'),
(7, 'Core i7-13700K', 'Intel', 16, 3.40, 'LGA1700'),
(8, 'Core i5-13600K', 'Intel', 14, 3.70, 'LGA1700'),
(9, 'Core i9-12900KS', 'Intel', 16, 3.20, 'LGA1700'),
(10, 'Core i7-12700K', 'Intel', 12, 3.60, 'LGA1700');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rams`
--

CREATE TABLE `rams` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `frecuencia` int(11) NOT NULL COMMENT 'MHz',
  `anio_lanzamiento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rams`
--

INSERT INTO `rams` (`id`, `nombre`, `marca`, `frecuencia`, `anio_lanzamiento`) VALUES
(1, 'Vengeance LPX', 'Corsair', 3200, 2019),
(2, 'Dominator Platinum', 'Corsair', 3600, 2020),
(3, 'Vengeance RGB Pro', 'Corsair', 4000, 2021),
(4, 'Dominator Platinum RGB', 'Corsair', 4800, 2022),
(5, 'Vengeance Pro SL', 'Corsair', 5200, 2023),
(6, 'HyperX Fury', 'Kingston', 2666, 2018),
(7, 'HyperX Predator', 'Kingston', 3200, 2019),
(8, 'Fury Beast', 'Kingston', 3600, 2020),
(9, 'Fury Renegade', 'Kingston', 4000, 2021),
(10, 'HyperX Fury RGB', 'Kingston', 5200, 2022);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ssd`
--

CREATE TABLE `ssd` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `capacidad` int(11) NOT NULL COMMENT 'GB',
  `anio_lanzamiento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ssd`
--

INSERT INTO `ssd` (`id`, `nombre`, `marca`, `capacidad`, `anio_lanzamiento`) VALUES
(1, '870 EVO', 'Samsung', 500, 2021),
(2, '980 PRO', 'Samsung', 1000, 2020),
(3, '970 EVO Plus', 'Samsung', 2000, 2019),
(4, '860 EVO', 'Samsung', 4000, 2018),
(5, '990 PRO', 'Samsung', 2000, 2022),
(6, 'MX500', 'Crucial', 500, 2017),
(7, 'P2', 'Crucial', 1000, 2020),
(8, 'P5', 'Crucial', 2000, 2020),
(9, 'BX500', 'Crucial', 1000, 2018),
(10, 'P5 Plus', 'Crucial', 2000, 2021);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `user`, `email`, `password`, `created_at`) VALUES
(6, 'Vicente', 'vicente-viel@hotmail.com', '$2b$05$W/OT2zEq7uGXhQSY8G0xo.YOckqN9hWrQwxcDww5ZaFCfzrJqIPze', '2025-06-19 23:55:12'),
(7, 'usuario', 'usuario@normal.com', '$2b$05$kmN46XtoQvOHfO.vge.rReHiGbp5sikH2EYznBWbv/04TfEV4HjfG', '2025-06-20 00:31:26');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `fuentes`
--
ALTER TABLE `fuentes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gabinetes`
--
ALTER TABLE `gabinetes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gpus`
--
ALTER TABLE `gpus`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `hdd`
--
ALTER TABLE `hdd`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mobo`
--
ALTER TABLE `mobo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `procesadores`
--
ALTER TABLE `procesadores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rams`
--
ALTER TABLE `rams`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ssd`
--
ALTER TABLE `ssd`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user` (`user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `fuentes`
--
ALTER TABLE `fuentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `gabinetes`
--
ALTER TABLE `gabinetes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `gpus`
--
ALTER TABLE `gpus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `hdd`
--
ALTER TABLE `hdd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `mobo`
--
ALTER TABLE `mobo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `procesadores`
--
ALTER TABLE `procesadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `rams`
--
ALTER TABLE `rams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `ssd`
--
ALTER TABLE `ssd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
