const express = require("express");
const citas = express.Router();
const conexion = require("./data");

citas.get("/citas/medicos/pacientesAtendidos/:mes", (req, res) => {
  let mes = req.params.mes;
  let consulta =
    "SELECT nombreMedico as Nombre , apellidoMedico as Apellido , COUNT(*) as Total_Pacientes FROM citas INNER JOIN medicos on id_Medico = idMedico Where MONTH(fecha) = " +
    mes;
  conexion.query(consulta, (error, resultado) => {
    try {
      res.status(200).send(resultado);
    } catch (error) {
      res.status(400).send({
        status: "error",
        message: "Error al Mostrar pacientes",
      });
    }
  });
});
citas.all("/cita/eliminarCita/:idCita", (req, res) => {
  let idCita = req.params.idCita;
  conexion.query(
    "DELETE FROM citas WHERE idCita=" + idCita,
    (error, resultado) => {
      try {
        res.status(200).send({
          message: "El medico ha sido eliminado correctamente",
        });
      } catch (error) {
        res.status(400).send({
          status: "error",
          message: "Error al eliminar el medico",
        });
      }
    }
  );
});
citas.get("/citas/pacientesAtendidos", (req, res) => {
  conexion.query(
    "SELECT * FROM citas ORDER BY id_Paciente",
    (error, resultado) => {
      try {
        res.status(200).send(resultado);
      } catch (error) {
        res.status(400).send({
          status: "error",
          message: "Error al Mostrar pacientes",
        });
      }
    }
  );
});
citas.get("/citas/mostrarPacienteId/:idPaciente", (req, res) => {
  let idPaciente = req.params.idPaciente;
  let consulta =
    "SELECT citas.descripcion,citas.direccion, citas.fecha, citas.id_Paciente, pacientes.nombrePaciente, pacientes.apellidoPaciente, pacientes.emailPaciente, pacientes.telefonoPaciente, pacientes.fechaNacimiento, pacientes.epsPaciente, medicos.nombreMedico, medicos.apellidoMedico, medicos.emailMedico, medicos.especialidad FROM citas INNER JOIN pacientes ON citas.id_Paciente = pacientes.idPaciente RIGHT JOIN medicos ON citas.id_Medico = medicos.idMedico WHERE idPaciente = " +
    idPaciente;

  conexion.query(consulta, (error, resultado) => {
    try {
      res.status(200).send(resultado);
    } catch (error) {
      res.status(400).send({
        status: "error",
        message: "Error al Mostrar el paciente",
      });
    }
  });
});
//mostrar citas
citas.get("/citas/mostrarCitas", (req, res) => {
  let consulta =
    "SELECT citas.idCita,citas.descripcion,citas.direccion, citas.fecha,citas.horaInicio,citas.horaFin , pacientes.idPaciente, pacientes.nombrePaciente, medicos.idMedico , medicos.nombreMedico FROM citas INNER JOIN pacientes ON citas.id_Paciente = pacientes.idPaciente INNER JOIN medicos ON citas.id_Medico = medicos.idMedico;";

  conexion.query(consulta, (error, resultado) => {
    try {
      res.status(200).send(resultado);
    } catch (error) {
      res.status(400).send({
        status: "error",
        message: "Error al Mostrar el paciente",
      });
    }
  });
});
citas.get("/citas/verificarCita/:horaInicio/:horaFin/:fecha", (req, res) => {
  let horaInicio = req.params.horaInicio;
  let horaFin = req.params.horaFin;
  let fecha = req.params.fecha;
  let consulta =
    "SELECT * from citas where horaInicio BETWEEN '" +
    horaInicio +
    "' AND '" +
    horaFin +
    "' AND fecha = '" +
    fecha +
    "' or horaFin BETWEEN '" +
    horaInicio +
    "' AND '" +
    horaFin +
    "' and fecha = '" +
    fecha +
    "'";

  conexion.query(consulta, (error, resultado) => {
    try {
      res.status(200).send(resultado);
    } catch (error) {
      res.status(400).send({
        status: "error",
        message: "Error al Mostrar el paciente",
      });
    }
  });
});

citas.all(
  "/citas/crearCita/:descripcion/:direccion/:fecha/:idPaciente/:idMedico/:horaInicio/:horaFin",
  (req, res) => {
    let descripcion = req.params.descripcion;
    let direccion = req.params.direccion;
    let fecha = req.params.fecha;
    let idPaciente = req.params.idPaciente;
    let idMedico = req.params.idMedico;
    let horaInicio = req.params.horaInicio;
    let horaFin = req.params.horaFin;

    conexion.query(
      "INSERT INTO citas VALUES ('','" +
        descripcion +
        "','" +
        direccion +
        "', '" +
        fecha +
        "' , " +
        idPaciente +
        ",  " +
        idMedico +
        ",  '" +
        horaInicio +
        "', '" +
        horaFin +
        "')",
      (error, resultado) => {
        try {
          res.status(200).send({
            message: "Cita Creada",
          });
        } catch (error) {
          res.status(400).send({
            status: "error",
            message: "Error al crear cita",
          });
        }
      }
    );
  }
);

citas.all(
  "/citas/editarCitas/:idCita/:descripcion/:direccion/:fecha/:idPaciente/:idMedico/:horaInicio/:horaFin",
  (req, res) => {
    let idCita = req.params.idCita;
    let descripcion = req.params.descripcion;
    let direccion = req.params.direccion;
    let fecha = req.params.fecha;
    let idPaciente = req.params.idPaciente;
    let idMedico = req.params.idMedico;
    let horaInicio = req.params.horaInicio;
    let horaFin = req.params.horaFin;
    console.log(
      idCita,
      descripcion,
      direccion,
      fecha,
      idPaciente,
      idMedico,
      horaInicio,
      horaFin
    );
    conexion.query(
      "UPDATE citas SET descripcion = '" +
        descripcion +
        "', direccion = '" +
        direccion +
        "', fecha ='" +
        fecha +
        "', id_Paciente = " +
        idPaciente +
        ", id_Medico = " +
        idMedico +
        " , horaInicio = '" +
        horaInicio +
        "', horaFin = '" +
        horaFin +
        "' WHERE idCita = " +
        idCita,
      (error, resultado) => {
        try {
          res.status(200).send({
            message: "cita actualizada",
          });
        } catch (error) {
          res.status(200).send({
            status: "error",
            message: "Error al actualizar cita",
          });
        }
      }
    );
  }
);

module.exports = citas;
