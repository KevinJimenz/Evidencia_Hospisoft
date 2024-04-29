import { connection } from "../models/data";

export const listarPacientes = async (req, res) => {
  let sql = "Call listarPacientes"
  let [filas] = await connection.query(sql);
  if (!filas) {
    return res.send({
      status: "error",
      mensaje: "No hay registros",
    });
  }
  return res.send({
    status: "ok",
    data: filas,
  });
}; // ? listo
export const editarPaciente = async (req, res) => {
  let id = req.params.id
  let name = req.params.name
  let apellido = req.params.apellido
  let email = req.params.email
  let telefono = req.params.telefono
  let movil = req.params.movil
  let fecha = req.params.fecha
  let eps = req.params.eps
  let usuario = req.params.usuario
  let password = req.params.password
  let sql = "Call editarPaciente(?,?,?,?,?,?,?,?,?,?)"
  let [filas] = await connection.query(sql,[id,name,apellido,email,telefono,movil,fecha,eps,usuario,password]);
  if (!filas) {
    return res.send({
      status: "error",
      mensaje: "No hay registros",
    });
  }
  return res.send({
    status: "ok",
    data: filas,
  });
};// ? listo
export const eliminarPaciente = async (req, res) => {
  let id = req.params.id
  let sql = "Call eliminarPaciente(?) "
  let [filas] = await connection.query(sql,[id]);
  if (!filas) {
    return res.send({
      status: "error",
      mensaje: "No hay registros",
    });
  }
  return res.send({
    status: "ok",
    data: filas,
  });
};//? listo
export const crearPaciente = async (req, res) => {
  let name = req.params.name
  let apellido = req.params.apellido
  let email = req.params.email
  let telefono = req.params.telefono
  let movil = req.params.movil
  let fecha = req.params.fecha
  let eps = req.params.eps
  let usuario = req.params.usuario
  let password = req.params.password
  let sql = "Call crearPaciente(?,?,?,?,?,?,?,?,?)"
  let [filas] = await connection.query(sql,[name,apellido,email,telefono,movil,fecha,eps,usuario,password]);
  if (!filas) {
    return res.send({
      status: "error",
      mensaje: "No hay registros",
    });
  }
  return res.send({
    status: "ok",
    data: filas,
  });
};// ? listo
