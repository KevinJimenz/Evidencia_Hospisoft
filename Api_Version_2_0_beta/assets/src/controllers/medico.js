import { connection } from "../models/data.js";
export const mostrarMedicos = async (req, res) => {
  let sql = "Call listaMedicos";
  let [filas] = await connection.query(sql);
  if (!filas) {
    console.log(filas)
    return res.send({
      status: "error",
      message: "Error al Mostrar Medicos",
    });
  }
   return res.send(filas);
    
};// ? listo
export const mostrarMedicoId = async (req, res) => {
  let idMedico = req.params.idMedico;
  let sql = "CALL mostrarMedicoId(?)";
  let [filas] = await connection.query(sql, [idMedico]);
  if ([!filas]) {
    res.status(400).send({
      status: "error",
      message: "Error al Mostrar Medico",
    });
  } else {
    res.status(200).send({
      status: "success",
      message: "Medico Mostrado Correctamente",
      data: filas,
    });
  }
};// ? listo
export const 	eliminarMedico = async (req, res) => {
  let idMedico = req.params.idMedico;
  let sql = "CALL	eliminarMedico(?)";
  let [filas] = await connection.query(sql, [idMedico]);
  if ([!filas]) {
    res.status(400).send({
      status: "error",
      message: "Error al Eliminar Medico",
    });
  } else {
    res.status(200).send({
      status: "success",
      message: "Medico Eliminado Correctamente",
      data: filas,
    });
  }
};// ? listo
export const editarMedico = async (req, res) => {
  try {
    let idMedico = req.params.idMedico;
    let nombre = req.params.nombre;
    let apellido = req.params.apellido;
    let email = req.params.email;
    let especialidad = req.params.especialidad;
    let sql = "CALL editarMedico(?,?,?,?,?)";
    await connection.query(sql, [
      idMedico,
      nombre,
      apellido,
      email,
      especialidad,
    ]);
    res.status(200).send({
      status: "success",
      message: "Medico Editado Correctamente",
    });
  } catch (error) {
    res.send({
      status: "error",
      message: "Error al Editar Medico",
    });
  }
};//  ? listo 
export const crearMedico = async (req, res) => {
  try {
    let nombre = req.params.nombre;
    let apellido = req.params.apellido;
    let email = req.params.email;
    let especialidad = req.params.especialidad;
    let sql = "CALL crearMedico(?,?,?,?)";
    await connection.query(sql, [nombre, apellido, email, especialidad]);
    res.status(200).send({
      status: "success",
      message: "Medico Creado Correctamente",
    });
  } catch (error) {
    res.send({
      status: "error",
      message: "Error al Crear Medico",
    });
  }
};// ? listo
export const buscarCorreo = async (req, res) => {
  let correo = req.params.email;
  let sql = "CALL buscarCorreo(?)";
  let [filas] = await connection.query(sql, [correo]);
  if ([!filas]) {
    res.status(400).send({
      status: "Info",
      message: "Correo no existente",
    });
  } else {
    res.status(200).send({
      status: "info",
      message: "Correo Encontrado",
      data: filas,
    });
  }
};// ? listo
