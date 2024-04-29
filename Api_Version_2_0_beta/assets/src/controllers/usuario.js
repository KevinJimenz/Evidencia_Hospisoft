import { connection } from "../models/data";

export const listarUsuarios = async (req, res) => {
  let sql ="Call listarUsuarios"
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
};// ? listo
export const buscarUsuario = async (req, res) => {
  let id = req.params.id
  let sql = "Call buscarUsuario(?)"
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
};// ? listo
export const eliminarUsuario = async (req, res) => {
  let id = req.params.id
  let sql = "Call eliminarUsuario(?)"
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
};// ? listo
export const editarUsuario = async (req, res) => {
  let id = req.params.id
  let name = req.params.name
  let email = req.params.email
  let password = req.params.password
  let sql = "Call editarUsuario(?,?,?,?)"
  let [filas] = await connection.query(sql,[id,name,email,password]);
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
export const crearUsuario = async (req, res) => {
  let name = req.params.name
  let email = req.params.email
  let password = req.params.password
  let sql = "Call crearUsuario(?,?,?)"
  let [filas] = await connection.query(sql,[name,email,password]);
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
