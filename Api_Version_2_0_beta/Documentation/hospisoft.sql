-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-05-2024 a las 19:14:10
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
-- Base de datos: `hospisoft`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `buscarCorreo` (IN `email` VARCHAR(255))   SELECT emailMedico from medicos WHERE emailMedico = email$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `buscarUsuario` (IN `id` INT)   select * from users where idUser = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crearCita` (IN `descripcion` VARCHAR(255), IN `direccion` VARCHAR(255), IN `fecha` DATE, IN `idPaciente` INT, IN `idMedico` INT, IN `horaInicio` TIME, IN `horaFin` TIME)   INSERT INTO citas VALUES (null,
        descripcion ,
        direccion ,
        fecha,
        idPaciente,
        idMedico,
        horaInicio,
        horaFin)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crearMedicamento` (IN `descripcion` VARCHAR(255), IN `existencia` VARCHAR(100000000))   INSERT INTO medicamentos VALUES (null,descripcion,existencia)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crearMedico` (IN `nombre` VARCHAR(255), IN `apellido` VARCHAR(255), IN `email` VARCHAR(255), IN `especialidad` VARCHAR(255))   INSERT INTO medicos VALUES (null,nombre,apellido,email,especialidad)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crearPaciente` (IN `name` VARCHAR(150), IN `apellido` VARCHAR(150), IN `email` VARCHAR(150), IN `telefono` VARCHAR(50), IN `movil` VARCHAR(50), IN `fecha` DATE, IN `eps` VARCHAR(255), IN `pass` VARCHAR(10000), IN `idPaciente` BIGINT)   INSERT INTO pacientes VALUES(idPaciente,name,apellido,email,telefono,movil,fecha,eps,pass)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crearUsuario` (IN `name` VARCHAR(255), IN `email` VARCHAR(255), IN `password` VARCHAR(10000))   INSERT INTO users VALUES('',name,email,password)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarCitas` (IN `id` INT, IN `descripcion` VARCHAR(255), IN `direccion` VARCHAR(255), IN `fecha` DATE, IN `idPaciente` INT, IN `idMedico` INT, IN `horaInicio` TIME, IN `horaFin` TIME)   UPDATE citas SET 
descripcion = descripcion , 
direccion = direccion , 
fecha = fecha ,
id_Paciente = idPaciente , 
id_Medico = idMedico , 
horaInicio = horaInicio ,
horaFin = horaFin
WHERE idCita = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarMedicamento` (IN `id` INT, IN `descripcion` VARCHAR(255), IN `existencia` VARCHAR(100000000))   UPDATE medicamentos 
SET descripcion = descripcion,
existencia = existencia  WHERE idMedicamento = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarMedico` (IN `id` INT, IN `name` VARCHAR(255), IN `apellido` VARCHAR(255), IN `email` VARCHAR(255), IN `especialidad` VARCHAR(255))   UPDATE medicos 
SET nombreMedico = name, 
apellidoMedico = apellido,
emailMedico = email,
especialidad = especialidad
WHERE idMedico = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarPaciente` (IN `id` INT, IN `name` VARCHAR(150), IN `apellido` VARCHAR(150), IN `email` VARCHAR(150), IN `telefono` VARCHAR(50), IN `movil` VARCHAR(50), IN `fecha` DATE, IN `eps` VARCHAR(255))   UPDATE pacientes
SET pacientes.nombrePaciente = name,
pacientes.apellidoPaciente = apellido,
pacientes.emailPaciente = email,
pacientes.telefonoPaciente = telefono,
pacientes.movilPaciente = movil,
pacientes.fechaNacimiento = fecha,
pacientes.epsPaciente = eps
WHERE pacientes.idPaciente = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarUsuario` (IN `id` INT, IN `name` VARCHAR(255), IN `email` VARCHAR(255), IN `password` VARCHAR(10000))   UPDATE users 
SET users.userName = name,
users.emailUser = email,
users.password = password
WHERE idUser = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminarCita` (IN `id` INT)   DELETE FROM citas WHERE idCita = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminarMedicamento` (IN `id` INT)   delete from medicamentos where idMedicamento =id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminarMedico` (IN `id` INT)   DELETE FROM medicos WHERE idMedico= id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminarPaciente` (IN `id` INT)   DELETE FROM pacientes WHERE idPaciente = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminarUsuario` (IN `id` INT)   delete from users where idUser = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `listaMedicos` ()   select idMedico as id, nombreMedico as nombre, apellidoMedico as apellido, emailMedico as email , especialidad from medicos$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `listarCitas` ()   SELECT citas.idCita,citas.descripcion,citas.direccion, citas.fecha,citas.horaInicio,citas.horaFin , pacientes.idPaciente, pacientes.nombrePaciente, medicos.idMedico , medicos.nombreMedico FROM citas INNER JOIN pacientes ON citas.id_Paciente = pacientes.idPaciente INNER JOIN medicos ON citas.id_Medico = medicos.idMedico$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `listarMedicamentos` ()   Select idMedicamento as id, descripcion as descripcion, existencia as stock From medicamentos$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `listarPacientes` ()   SELECT * FROM pacientes$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `listarUsuarios` ()   select * from users$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `mostrarMedicoId` (IN `id` INT)   select * from medicos where idMedico = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `mostrarPacienteId` (IN `id` INT)   SELECT citas.descripcion,citas.direccion, citas.fecha, citas.id_Paciente, pacientes.nombrePaciente, pacientes.apellidoPaciente, pacientes.emailPaciente, pacientes.telefonoPaciente, pacientes.fechaNacimiento, pacientes.epsPaciente, medicos.nombreMedico, medicos.apellidoMedico, medicos.emailMedico, medicos.especialidad FROM citas INNER JOIN pacientes ON citas.id_Paciente = pacientes.idPaciente RIGHT JOIN medicos ON citas.id_Medico = medicos.idMedico WHERE idPaciente = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pacientesAtendidosMes` (IN `mes` INT)   SELECT nombreMedico as Nombre , apellidoMedico as Apellido , COUNT(*) as Total_Pacientes FROM citas INNER JOIN medicos on id_Medico = idMedico Where MONTH(fecha) = mes$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pacientesAtentidos` ()   SELECT * FROM citas ORDER BY id_Paciente$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `verificarCita` (IN `horaInicio` TIME, IN `horaFin` TIME, IN `fecha` DATE)   SELECT * from citas where citas.horaInicio BETWEEN  horaInicio AND horaFin 
  AND citas.fecha = fecha or citas.horaFin BETWEEN horaInicio AND horaFin and citas.fecha = fecha$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `idCita` int(11) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `id_Paciente` int(11) DEFAULT NULL,
  `id_Medico` int(11) DEFAULT NULL,
  `horaInicio` time DEFAULT NULL,
  `horaFin` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`idCita`, `descripcion`, `direccion`, `fecha`, `id_Paciente`, `id_Medico`, `horaInicio`, `horaFin`) VALUES
(1, 'ddd', 'ddd', '2024-04-08', 2, 2, '16:00:34', '24:00:34'),
(11, 'mochar bicho', 'pipas', '2024-06-01', 4, 2, '14:06:00', '15:06:00'),
(12, 'Diligenciar el ojo', 'peperoni', '2024-05-08', 6, 11, '21:35:00', '22:35:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleformula`
--

CREATE TABLE `detalleformula` (
  `idDetalle` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `posologia` varchar(250) DEFAULT NULL,
  `consecutivoFormula` int(11) DEFAULT NULL,
  `idMedicamento` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formulas`
--

CREATE TABLE `formulas` (
  `consecutivo` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `idPaciente` int(11) DEFAULT NULL,
  `idMedico` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamentos`
--

CREATE TABLE `medicamentos` (
  `idMedicamento` int(11) NOT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `existencia` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicamentos`
--

INSERT INTO `medicamentos` (`idMedicamento`, `descripcion`, `existencia`) VALUES
(2, 'Paracetamol', '10000'),
(5, 'mareol', '1'),
(6, 'Paracetamol', '45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `idMedico` int(11) NOT NULL,
  `nombreMedico` varchar(150) DEFAULT NULL,
  `apellidoMedico` varchar(150) DEFAULT NULL,
  `emailMedico` varchar(150) DEFAULT NULL,
  `especialidad` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`idMedico`, `nombreMedico`, `apellidoMedico`, `emailMedico`, `especialidad`) VALUES
(2, 'Kevin', 'Jimenez', 'kevincamilo56@gmail.com', 'neurocirujano'),
(11, 'Camilo', 'Jiménez Gordillo', 'kevincamilo56@gmail.com', 'NeuroCirujano'),
(13, 'JHON ALEXANDER', 'Narvez', 'nar@gmail.com', 'Eliminar Prepucion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `idPaciente` int(11) NOT NULL,
  `nombrePaciente` varchar(150) DEFAULT NULL,
  `apellidoPaciente` varchar(150) DEFAULT NULL,
  `emailPaciente` varchar(150) DEFAULT NULL,
  `telefonoPaciente` varchar(50) DEFAULT NULL,
  `movilPaciente` varchar(50) DEFAULT NULL,
  `fechaNacimiento` date DEFAULT NULL,
  `epsPaciente` varchar(250) DEFAULT NULL,
  `passwordPaciente` varchar(10000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`idPaciente`, `nombrePaciente`, `apellidoPaciente`, `emailPaciente`, `telefonoPaciente`, `movilPaciente`, `fechaNacimiento`, `epsPaciente`, `passwordPaciente`) VALUES
(4, 'Pepe ', 'Pepito Perez', 'PepitoPerez12@gmail.com', '123456', '654321', '2002-10-01', 'Ñeros Unidos', 'w'),
(5, 'Juan', 'Davison', 'juanSEX@gmail.com', '3232', '322', '2004-02-01', 'IPS', '123'),
(6, 'Kevin', 'Narvaz', 'kevincamilo56@gmail.len', '33131', '3131', '2005-05-14', 'Comfandi', '123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `userName` varchar(150) DEFAULT NULL,
  `emailUser` varchar(150) DEFAULT NULL,
  `password` varchar(10000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idUser`, `userName`, `emailUser`, `password`) VALUES
(1, 'paciente', 'paciente@gmail.com', '123'),
(2, 'Juan Davison', 'JuanSEX@gmail.com', '123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`idCita`),
  ADD KEY `fk_pacient` (`id_Paciente`),
  ADD KEY `fk_medic` (`id_Medico`);

--
-- Indices de la tabla `detalleformula`
--
ALTER TABLE `detalleformula`
  ADD PRIMARY KEY (`idDetalle`),
  ADD KEY `fk_consecutivo` (`consecutivoFormula`),
  ADD KEY `fk_medicamento` (`idMedicamento`);

--
-- Indices de la tabla `formulas`
--
ALTER TABLE `formulas`
  ADD PRIMARY KEY (`consecutivo`),
  ADD KEY `fk_paciente` (`idPaciente`),
  ADD KEY `fk_medico` (`idMedico`);

--
-- Indices de la tabla `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD PRIMARY KEY (`idMedicamento`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`idMedico`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `idCita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `detalleformula`
--
ALTER TABLE `detalleformula`
  MODIFY `idDetalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `medicamentos`
--
ALTER TABLE `medicamentos`
  MODIFY `idMedicamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `idMedico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
