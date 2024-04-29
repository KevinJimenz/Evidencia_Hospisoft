-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2024 at 05:53 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospisoft`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `buscarCorreo` (IN `email` VARCHAR(255))   SELECT emailMedico from medicos WHERE emailMedico = email$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `buscarUsuario` (IN `id` INT)   select * from users where idUser = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crearCita` (IN `descripcion` VARCHAR(255), IN `direccion` VARCHAR(255), IN `fecha` DATE, IN `idPaciente` INT, IN `idMedico` INT, IN `horaInicio` TIME, IN `horaFin` TIME)   INSERT INTO citas VALUES ('',
        descripcion ,
        direccion ,
        fecha,
        idPaciente,
        idMedico,
        horaInicio,
        horaFin)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crearMedicamento` (IN `descripcion` VARCHAR(255))   INSERT INTO medicamentos VALUES ('',descripcion,1)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crearMedico` (IN `nombre` INT(255), IN `apellido` INT(255), IN `email` INT(255), IN `especialidad` INT(255))   INSERT INTO medicos VALUES ('',nombre,apellido,email,especialidad)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crearPaciente` (IN `name` VARCHAR(150), IN `apellido` VARCHAR(150), IN `email` VARCHAR(150), IN `telefono` VARCHAR(50), IN `movil` VARCHAR(50), IN `fecha` DATE, IN `eps` VARCHAR(255), IN `usuario` INT, IN `password` VARCHAR(10000))   INSERT INTO pacientes VALUES('',name,apellido,email,telefono,movil,fecha,eps,usuario,password)$$

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarMedicamento` (IN `id` INT, IN `descripcion` VARCHAR(255), IN `existencia` TINYINT)   UPDATE medicamentos 
SET descripcion = descripcion,
existencia = existencia  WHERE idMedicamento = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarMedico` (IN `id` INT, IN `name` VARCHAR(255), IN `apellido` VARCHAR(255), IN `email` VARCHAR(255), IN `especialidad` VARCHAR(255))   UPDATE medicos 
SET nombreMedico = name, 
apellidoMedico = apellido,
emailMedico = email,
especialidad = especialidad
WHERE idMedico = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editarPaciente` (IN `id` INT, IN `name` VARCHAR(150), IN `apellido` VARCHAR(150), IN `email` VARCHAR(150), IN `telefono` VARCHAR(50), IN `movil` VARCHAR(50), IN `fecha` DATE, IN `eps` VARCHAR(255), IN `usuario` INT, IN `password` VARCHAR(10000))   UPDATE pacientes
SET pacientes.nombrePaciente = name,
pacientes.apellidoPaciente = apellido,
pacientes.emailPaciente = email,
pacientes.telefonoPaciente = telefono,
pacientes.movilPaciente = movil,
pacientes.fechaNacimiento = fecha,
pacientes.epsPaciente = eps,
pacientes.usuarioPaciente = usuario,
pacientes.passwordPaciente = password 
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `verificarCita` (IN `horaInicio` TIME, IN `horaFin` TIME, IN `fecha` DATE)   SELECT * from citas where horaInicio BETWEEN horaInicio AND horaFin AND fecha = fecha or horaFin BETWEEN 
    horaInicio AND horaFin and fecha = fecha$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `citas`
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
-- Dumping data for table `citas`
--

INSERT INTO `citas` (`idCita`, `descripcion`, `direccion`, `fecha`, `id_Paciente`, `id_Medico`, `horaInicio`, `horaFin`) VALUES
(1, 'ddd', 'ddd', '2024-04-08', 2, 2, '16:00:34', '24:00:34'),
(6, 'lo que sea', 'dkaKDADAD', '2024-04-26', 5, 2, '10:36:00', '11:36:00');

-- --------------------------------------------------------

--
-- Table structure for table `detalleformula`
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
-- Table structure for table `formulas`
--

CREATE TABLE `formulas` (
  `consecutivo` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `idPaciente` int(11) DEFAULT NULL,
  `idMedico` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `medicamentos`
--

CREATE TABLE `medicamentos` (
  `idMedicamento` int(11) NOT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `existencia` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicamentos`
--

INSERT INTO `medicamentos` (`idMedicamento`, `descripcion`, `existencia`) VALUES
(1, 'Acetaminofen', 0),
(2, 'Paracetamol', 1),
(5, 'mareol', 1);

-- --------------------------------------------------------

--
-- Table structure for table `medicos`
--

CREATE TABLE `medicos` (
  `idMedico` int(11) NOT NULL,
  `nombreMedico` varchar(150) DEFAULT NULL,
  `apellidoMedico` varchar(150) DEFAULT NULL,
  `emailMedico` varchar(150) DEFAULT NULL,
  `especialidad` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicos`
--

INSERT INTO `medicos` (`idMedico`, `nombreMedico`, `apellidoMedico`, `emailMedico`, `especialidad`) VALUES
(2, 'Kevin', 'Jimenez', 'kevincamilo56@gmail.com', 'neurocirujano'),
(11, 'Camilo', 'Jiménez Gordillo', 'kevincamilo56@gmail.com', 'NeuroCirujano');

-- --------------------------------------------------------

--
-- Table structure for table `pacientes`
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
  `usuarioPaciente` int(11) DEFAULT NULL,
  `passwordPaciente` varchar(10000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pacientes`
--

INSERT INTO `pacientes` (`idPaciente`, `nombrePaciente`, `apellidoPaciente`, `emailPaciente`, `telefonoPaciente`, `movilPaciente`, `fechaNacimiento`, `epsPaciente`, `usuarioPaciente`, `passwordPaciente`) VALUES
(4, 'Pepe ', 'Pepito Perez', 'PepitoPerez12@gmail.com', '123456', '654321', '2002-10-01', 'Ñeros Unidos', 1, 'w'),
(5, 'Juan', 'Davison', 'juanSEX@gmail.com', '3232', '322', '2004-02-01', 'IPS', 1, '123'),
(6, 'Kevin', 'Jimenez', 'kevincamilo56@gmail.com', '33131', '3131', '2005-05-14', 'Comfandi', 1, '123');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `userName` varchar(150) DEFAULT NULL,
  `emailUser` varchar(150) DEFAULT NULL,
  `password` varchar(10000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUser`, `userName`, `emailUser`, `password`) VALUES
(1, 'paciente', 'paciente@gmail.com', '123'),
(2, 'Juan Davison', 'JuanSEX@gmail.com', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`idCita`),
  ADD KEY `fk_pacient` (`id_Paciente`),
  ADD KEY `fk_medic` (`id_Medico`);

--
-- Indexes for table `detalleformula`
--
ALTER TABLE `detalleformula`
  ADD PRIMARY KEY (`idDetalle`),
  ADD KEY `fk_consecutivo` (`consecutivoFormula`),
  ADD KEY `fk_medicamento` (`idMedicamento`);

--
-- Indexes for table `formulas`
--
ALTER TABLE `formulas`
  ADD PRIMARY KEY (`consecutivo`),
  ADD KEY `fk_paciente` (`idPaciente`),
  ADD KEY `fk_medico` (`idMedico`);

--
-- Indexes for table `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD PRIMARY KEY (`idMedicamento`);

--
-- Indexes for table `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`idMedico`);

--
-- Indexes for table `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`idPaciente`),
  ADD KEY `fk_user` (`usuarioPaciente`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `citas`
--
ALTER TABLE `citas`
  MODIFY `idCita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `detalleformula`
--
ALTER TABLE `detalleformula`
  MODIFY `idDetalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `medicamentos`
--
ALTER TABLE `medicamentos`
  MODIFY `idMedicamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `medicos`
--
ALTER TABLE `medicos`
  MODIFY `idMedico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `idPaciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
