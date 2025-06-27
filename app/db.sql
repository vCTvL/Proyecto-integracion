-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-06-2025 a las 00:39:30
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

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
-- Estructura de tabla para la tabla `componentes`
--

CREATE TABLE `componentes` (
  `id` int(11) NOT NULL,
  `idGabinete` int(11) DEFAULT NULL,
  `idGPU` int(11) DEFAULT NULL,
  `idProcesador` int(11) DEFAULT NULL,
  `idMobo` int(11) DEFAULT NULL,
  `idHdd` int(11) DEFAULT NULL,
  `idSsd` int(11) DEFAULT NULL,
  `idRam` int(11) DEFAULT NULL,
  `idFuente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleventa`
--

CREATE TABLE `detalleventa` (
  `idDetalle` int(11) NOT NULL,
  `idVenta` int(11) DEFAULT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `anio_lanzamiento` int(11) NOT NULL,
  `precio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fuentes`
--

INSERT INTO `fuentes` (`id`, `nombre`, `marca`, `watts`, `modular`, `anio_lanzamiento`, `precio`) VALUES
(1, 'RM750x', 'Corsair', 750, 'Sí', 2019, 120),
(2, 'HX1200', 'Corsair', 1200, 'Sí', 2020, 220),
(3, 'SF750', 'Corsair', 750, 'Sí', 2019, 160),
(4, 'AX1600i', 'Corsair', 1600, 'Sí', 2018, 450),
(5, 'CX650', 'Corsair', 650, 'No', 2017, 80),
(6, 'SuperNOVA 850 G6', 'EVGA', 850, 'Sí', 2021, 130),
(7, 'SuperNOVA 1000 P2', 'EVGA', 1000, 'Sí', 2016, 200),
(8, 'SuperNOVA 650 GT', 'EVGA', 650, 'Semi', 2020, 100),
(9, 'BQ 600', 'EVGA', 600, 'No', 2017, 60),
(10, 'SuperNOVA 1600 T2', 'EVGA', 1600, 'Sí', 2016, 280);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gabinetes`
--

CREATE TABLE `gabinetes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `tamanio` varchar(20) NOT NULL COMMENT 'ATX, Micro ATX, Mini ITX',
  `anio_lanzamiento` int(11) NOT NULL,
  `precio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gabinetes`
--

INSERT INTO `gabinetes` (`id`, `nombre`, `marca`, `tamanio`, `anio_lanzamiento`, `precio`) VALUES
(1, 'H510', 'NZXT', 'ATX', 2019, 80),
(2, 'H710', 'NZXT', 'ATX', 2020, 130),
(3, 'H210', 'NZXT', 'Mini ITX', 2019, 90),
(4, 'H510 Flow', 'NZXT', 'ATX', 2021, 95),
(5, 'H1', 'NZXT', 'Mini ITX', 2020, 140),
(6, 'MasterBox Q300L', 'Cooler Master', 'Micro ATX', 2018, 50),
(7, 'MasterCase H500', 'Cooler Master', 'ATX', 2019, 110),
(8, 'MasterBox NR200', 'Cooler Master', 'Mini ITX', 2020, 100),
(9, 'Cosmos C700M', 'Cooler Master', 'ATX', 2018, 250),
(10, 'MasterBox TD500', 'Cooler Master', 'ATX', 2019, 120);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gpus`
--

CREATE TABLE `gpus` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `memoria` int(11) NOT NULL COMMENT 'GB',
  `anio_lanzamiento` int(11) NOT NULL,
  `precio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gpus`
--

INSERT INTO `gpus` (`id`, `nombre`, `marca`, `memoria`, `anio_lanzamiento`, `precio`) VALUES
(1, 'GeForce RTX 3060', 'NVIDIA', 12, 2021, 330),
(2, 'GeForce RTX 3070', 'NVIDIA', 8, 2020, 450),
(3, 'GeForce RTX 3080', 'NVIDIA', 10, 2020, 600),
(4, 'GeForce RTX 3090', 'NVIDIA', 24, 2020, 1200),
(5, 'GeForce RTX 4090', 'NVIDIA', 24, 2022, 1600),
(6, 'Radeon RX 6600', 'AMD', 8, 2021, 230),
(7, 'Radeon RX 6700 XT', 'AMD', 12, 2021, 320),
(8, 'Radeon RX 6800', 'AMD', 16, 2020, 450),
(9, 'Radeon RX 6900 XT', 'AMD', 16, 2020, 550),
(10, 'Radeon RX 7900 XTX', 'AMD', 24, 2022, 1000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hdd`
--

CREATE TABLE `hdd` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `capacidad` int(11) NOT NULL COMMENT 'TB',
  `anio_lanzamiento` int(11) NOT NULL,
  `precio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hdd`
--

INSERT INTO `hdd` (`id`, `nombre`, `marca`, `capacidad`, `anio_lanzamiento`, `precio`) VALUES
(1, 'BarraCuda', 'Seagate', 1, 2016, 40),
(2, 'IronWolf', 'Seagate', 4, 2017, 80),
(3, 'SkyHawk', 'Seagate', 8, 2018, 120),
(4, 'FireCuda', 'Seagate', 2, 2019, 60),
(5, 'Exos', 'Seagate', 16, 2020, 220),
(6, 'Blue', 'Western Digital', 1, 2015, 45),
(7, 'Black', 'Western Digital', 4, 2017, 85),
(8, 'Red', 'Western Digital', 6, 2018, 100),
(9, 'Gold', 'Western Digital', 10, 2019, 150),
(10, 'Purple', 'Western Digital', 12, 2020, 160);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mobo`
--

CREATE TABLE `mobo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `tamanio` varchar(20) NOT NULL COMMENT 'ATX, Micro ATX, Mini ITX',
  `anio_lanzamiento` int(11) NOT NULL,
  `socket` varchar(20) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mobo`
--

INSERT INTO `mobo` (`id`, `nombre`, `marca`, `tamanio`, `anio_lanzamiento`, `socket`, `precio`) VALUES
(1, 'ROG Strix Z690-E', 'ASUS', 'ATX', 2021, 'LGA1700', 350),
(2, 'TUF Gaming B550-PLUS', 'ASUS', 'ATX', 2020, 'AM4', 190),
(3, 'ROG Strix X570-I', 'ASUS', 'Mini ITX', 2019, 'AM4', 220),
(4, 'Prime B660M-A', 'ASUS', 'Micro ATX', 2022, 'LGA1700', 180),
(5, 'ROG Crosshair VIII Hero', 'ASUS', 'ATX', 2019, 'AM4', 350),
(6, 'Z690 AORUS Elite', 'Gigabyte', 'ATX', 2021, 'LGA1700', 250),
(7, 'B550 AORUS PRO AC', 'Gigabyte', 'ATX', 2020, 'AM4', 200),
(8, 'B660M DS3H', 'Gigabyte', 'Micro ATX', 2022, 'LGA1700', 170),
(9, 'X570 I AORUS Pro', 'Gigabyte', 'Mini ITX', 2019, 'AM4', 230),
(10, 'Z790 AORUS Master', 'Gigabyte', 'ATX', 2022, 'LGA1700', 480),
(12, 'Placa madre penca', 'pencamadre', 'ATX', 2022, 'LGA 1151', 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `procesadores`
--

CREATE TABLE `procesadores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `marca` varchar(30) NOT NULL,
  `nucleos` int(11) NOT NULL,
  `socket` varchar(20) DEFAULT NULL,
  `frecuencia_base` int(11) DEFAULT NULL COMMENT 'MHz',
  `precio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `procesadores`
--

INSERT INTO `procesadores` (`id`, `nombre`, `marca`, `nucleos`, `socket`, `frecuencia_base`, `precio`) VALUES
(1, 'Ryzen 9 7950X', 'AMD', 16, 'AM5', 4500, 600),
(2, 'Ryzen 7 7800X3D', 'AMD', 8, 'AM5', 4200, 450),
(3, 'Ryzen 5 7600X', 'AMD', 6, 'AM5', 4700, 300),
(4, 'Ryzen Threadripper 7970X', 'AMD', 32, 'sTR5', 4000, 800),
(5, 'Ryzen 9 7900X', 'AMD', 12, 'AM5', 4700, 480),
(6, 'Core i9-13900K', 'Intel', 24, 'LGA1700', 3000, 570),
(7, 'Core i7-13700K', 'Intel', 16, 'LGA1700', 3400, 450),
(8, 'Core i5-13600K', 'Intel', 14, 'LGA1700', 3500, 350),
(9, 'Core i9-12900KS', 'Intel', 16, 'LGA1700', 3200, 520),
(10, 'Core i7-12700K', 'Intel', 12, 'LGA1700', 3600, 390),
(15, 'i3 9100f', 'Intel', 4, 'LGA 1151', 3000, 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rams`
--

CREATE TABLE `rams` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `frecuencia` int(11) NOT NULL COMMENT 'MHz',
  `anio_lanzamiento` int(11) NOT NULL,
  `GB` int(11) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rams`
--

INSERT INTO `rams` (`id`, `nombre`, `marca`, `frecuencia`, `anio_lanzamiento`, `GB`, `precio`) VALUES
(1, 'Vengeance LPX', 'Corsair', 3200, 2019, 16, 60),
(2, 'Dominator Platinum', 'Corsair', 3600, 2020, 32, 120),
(3, 'Vengeance RGB Pro', 'Corsair', 4000, 2021, 32, 130),
(4, 'Dominator Platinum RGB', 'Corsair', 4800, 2022, 32, 180),
(5, 'Vengeance Pro SL', 'Corsair', 5200, 2023, 32, 200),
(6, 'HyperX Fury', 'Kingston', 2666, 2018, 16, 50),
(7, 'HyperX Predator', 'Kingston', 3200, 2019, 16, 70),
(8, 'Fury Beast', 'Kingston', 3600, 2020, 32, 100),
(9, 'Fury Renegade', 'Kingston', 4000, 2021, 32, 110),
(10, 'HyperX Fury RGB', 'Kingston', 5200, 2022, 32, 140);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ssd`
--

CREATE TABLE `ssd` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `capacidad` int(11) NOT NULL COMMENT 'GB',
  `anio_lanzamiento` int(11) NOT NULL,
  `precio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ssd`
--

INSERT INTO `ssd` (`id`, `nombre`, `marca`, `capacidad`, `anio_lanzamiento`, `precio`) VALUES
(1, '870 EVO', 'Samsung', 500, 2021, 60),
(2, '980 PRO', 'Samsung', 1000, 2020, 100),
(3, '970 EVO Plus', 'Samsung', 2000, 2019, 130),
(4, '860 EVO', 'Samsung', 4000, 2018, 180),
(5, '990 PRO', 'Samsung', 2000, 2022, 150),
(6, 'MX500', 'Crucial', 500, 2017, 55),
(7, 'P2', 'Crucial', 1000, 2020, 75),
(8, 'P5', 'Crucial', 2000, 2020, 110),
(9, 'BX500', 'Crucial', 1000, 2018, 65),
(10, 'P5 Plus', 'Crucial', 2000, 2021, 120);

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
(7, 'usuario', 'usuario@normal.com', '$2b$05$kmN46XtoQvOHfO.vge.rReHiGbp5sikH2EYznBWbv/04TfEV4HjfG', '2025-06-20 00:31:26'),
(8, 'user', 'user@user.com', '$2b$05$kS97b4KUTOs2PNLUVx9E7.DCHqvxQ55b5YhBJf7rWz0ipTI/hIw.K', '2025-06-23 21:58:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventamaestra`
--

CREATE TABLE `ventamaestra` (
  `idVenta` int(11) NOT NULL,
  `idDetalle` int(11) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `componentes`
--
ALTER TABLE `componentes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idGabinete` (`idGabinete`),
  ADD KEY `idGPU` (`idGPU`),
  ADD KEY `idProcesador` (`idProcesador`),
  ADD KEY `idMobo` (`idMobo`),
  ADD KEY `idHdd` (`idHdd`),
  ADD KEY `idSsd` (`idSsd`),
  ADD KEY `idRam` (`idRam`),
  ADD KEY `idFuente` (`idFuente`);

--
-- Indices de la tabla `detalleventa`
--
ALTER TABLE `detalleventa`
  ADD PRIMARY KEY (`idDetalle`),
  ADD KEY `idVenta` (`idVenta`);

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
-- Indices de la tabla `ventamaestra`
--
ALTER TABLE `ventamaestra`
  ADD PRIMARY KEY (`idVenta`),
  ADD KEY `fk_usuario` (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `componentes`
--
ALTER TABLE `componentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalleventa`
--
ALTER TABLE `detalleventa`
  MODIFY `idDetalle` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `procesadores`
--
ALTER TABLE `procesadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `ventamaestra`
--
ALTER TABLE `ventamaestra`
  MODIFY `idVenta` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `componentes`
--
ALTER TABLE `componentes`
  ADD CONSTRAINT `componentes_ibfk_1` FOREIGN KEY (`idGabinete`) REFERENCES `gabinetes` (`id`),
  ADD CONSTRAINT `componentes_ibfk_2` FOREIGN KEY (`idGPU`) REFERENCES `gpus` (`id`),
  ADD CONSTRAINT `componentes_ibfk_3` FOREIGN KEY (`idProcesador`) REFERENCES `procesadores` (`id`),
  ADD CONSTRAINT `componentes_ibfk_4` FOREIGN KEY (`idMobo`) REFERENCES `mobo` (`id`),
  ADD CONSTRAINT `componentes_ibfk_5` FOREIGN KEY (`idHdd`) REFERENCES `hdd` (`id`),
  ADD CONSTRAINT `componentes_ibfk_6` FOREIGN KEY (`idSsd`) REFERENCES `ssd` (`id`),
  ADD CONSTRAINT `componentes_ibfk_7` FOREIGN KEY (`idRam`) REFERENCES `rams` (`id`),
  ADD CONSTRAINT `componentes_ibfk_8` FOREIGN KEY (`idFuente`) REFERENCES `fuentes` (`id`);

--
-- Filtros para la tabla `detalleventa`
--
ALTER TABLE `detalleventa`
  ADD CONSTRAINT `detalleventa_ibfk_1` FOREIGN KEY (`idVenta`) REFERENCES `ventamaestra` (`idVenta`);

--
-- Filtros para la tabla `ventamaestra`
--
ALTER TABLE `ventamaestra`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
