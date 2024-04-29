import { connection } from "../models/data";

export const pacientesAtendidosMes = async (req, res) => {
  let mes = req.params.mes;
  let sql = "Call pacientesAtendidosMes(?)";
  let [filas] = await connection.query(sql, [mes]);
  if (!filas) {
    return res.send({
      status: "error",
      message: "No hay registros de pacientes atendidos al mes",
    });
  }
  return res.send({
    status: "success",
    data: filas,
  });
};

export const pacientesAtendidos = async (req, res) => {
  let sql = "Call pacientesAtendidos";
  let [filas] = await connection.query(sql);
  if (!filas) {
    return res.send({
      status: "error",
      message: "No hay registros de pacientes atendidos",
    });
  }
  return res.send({
    status: "success",
    data: filas,
  });
};

export const EliminarCita = async (req, res) => {
  try {
    let idCita = req.params.idCita;

    const sql = "CALL eliminarCita(?)";

    await connection.query(sql, [idCita]);

    res.send({
      status: "200",
      message: "Cita Eliminada",
    });
  } catch (error) {
    res.send({
      status: "400",
      message: "Error al eliminar la cita",
    });

    console.log(error);
  }
};

export const mostrarPacientesId = async (req, res) => {
  let idPaciente = req.params.idPaciente;
  const sql = "CALL mostrarPacientesId(?)";
  let [filas] = await connection.query(sql, [idPaciente]);
  if (!filas) {
    return res.send({
      status: "error",
      message: "No hay pacientes registrados",
    });
  }
  return res.send({
    status: "success",
    data: filas,
  });
};

export const mostrarCitas = async (req, res) => {
  let sql = "Call mostrarCitas";
  let [filas] = await connection.query(sql);
  if (!filas) {
    return res.send({
      status: "error",
      message: "No hay citas registradas",
    });
  }
  return res.send({
    status: "success",
    data: filas,
  });
};

export const verificarCita = async (req, res) => {
  let horaInicio = req.params.horaInicio;
  let horaFin = req.params.horaFin;
  let fecha = req.params.fecha;
  let sql = "Call verificarCita(?,?,?)";
  let [filas] = await connection.query(sql, [horaInicio, horaFin, fecha]);
  if (!filas) {
    return res.send({
      status: "error",
      message: "No hay citas registradas",
    });
  }
  return res.send({
    status: "success",
    data: filas,
  });
};

export const crearCita = async (req, res) => {
  try {
    let descripcion = req.params.descripcion;
    let direccion = req.params.direccion;
    let fecha = req.params.fecha;
    let idPaciente = req.params.idPaciente;
    let idMedico = req.params.idMedico;
    let horaInicio = req.params.horaInicio;
    let horaFin = req.params.horaFin;
    let sql = "Call crearCita(?,?,?,?,?,?,?)";
    await connection.query(sql, [
      descripcion,
      direccion,
      fecha,
      idPaciente,
      idMedico,
      horaInicio,
      horaFin,
    ]);

    res.send({
      status: "200",
      message: "Cita Creada",
    });
  } catch (error) {
    res.send({
      status: "400",
      message: "Error al crear cita",
    });
  }
  l;
};

export const editarCita = async (req, res) => {
  try {
    let idCita = req.params.idCita;
    let descripcion = req.params.descripcion;
    let direccion = req.params.direccion;
    let fecha = req.params.fecha;
    let idPaciente = req.params.idPaciente;
    let idMedico = req.params.idMedico;
    let horaInicio = req.params.horaInicio;
    let horaFin = req.params.horaFin;
    let sql = "Call editarCita(?,?,?,?,?,?,?,?,?)";
    await connection.query(sql, [
      idCita,
      descripcion,
      direccion,
      fecha,
      idPaciente,
      idMedico,
      horaInicio,
      horaFin,
    ]);
    res.send({
      status: "200",
      message: "Cita Editada",
    });
  } catch (error) {
    res.send({
      status: "400",
      message: "Error al editar la cita",
    });
    console.log(error);
  }
};


