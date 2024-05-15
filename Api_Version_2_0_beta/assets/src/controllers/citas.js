import { connection } from "../models/data.js";

export const pacientesAtendidosMes = async (req, res) => {
  let mes = req.params.mes;
  let sql = "Call pacientesAtendidosMes(?)";
  let [[filas]] = await connection.query(sql, [mes]);
  if (!filas) {
    return res.send({
      status: "error",
      message: "No hay registros de pacientes atendidos al mes",
    });
  }
  return res.send(filas);
}; // ? listo
export const pacientesAtendidos = async (req, res) => {
  let sql = "Call pacientesAtentidos";
  let [[filas]] = await connection.query(sql);
  if (!filas) {
    return res.send({
      status: "error",
      message: "No hay registros de pacientes atendidos",
    });
  }
  return res.send(filas);
}; // ? listo
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
  }
}; // ? listo
export const mostrarPacienteId = async (req, res) => {
  let idPaciente = req.params.idPaciente;
  let sql = "CALL mostrarPacienteId(?)";
  let [filas] = await connection.query(sql, [idPaciente]);
  if (!filas) {
    return res.send({
      status: "error",
      message: "No hay pacientes registrados",
    });
  }
  return res.send(
    filas
  );
}; // ? listo
export const mostrarCitas = async (req, res) => {
  let sql = "Call listarCitas";
  let [filas] = await connection.query(sql);
  if (!filas) {
    return res.send({
      status: "error",
      message: "No hay citas registradas",
    });
  }
  return res.send(filas)
}; // ? listo
export const verificarCita = async (req, res) => {
  let horaInicio = req.params.horaInicio;
  let horaFin = req.params.horaFin;
  let fecha = req.params.fecha;
  let sql = "Call verificarCita(?,?,?)";
  let [filas] = await connection.query(sql, [horaInicio, horaFin, fecha]);
  if (filas[0].length==0) {
    
    return res.send({
      status: "error",
      message: "No hay citas registradas",
    });
  }
  else{
    return res.send(filas); 
  }
  
  
}; // ? listo
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
}; // ? listo
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
    let sql = "Call editarCitas(?,?,?,?,?,?,?,?)";
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
      status: error,
      message: "Error al editar la cita",
    });
  }
}; // ? listo
