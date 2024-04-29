import { connection } from "../models/data";

export const listarMedicamentos = async (req, res) => {
  let sql = "Call listarMedicamentos"
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
export const eliminarMedicamento = async (req, res) => {
  let id = req.params.id
  let sql = "Call eliminarMedicamento(?)"
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
export const editarMedicamento = async (req, res) => {
  let id = req.params.id
  let descripcion = req.params.descripcion
  let existencia = req.params.existencia
  let sql = "Call editarMedicamento(?,?,?)"
  let [filas] = await connection.query(sql,[id,descripcion,existencia]);
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
};//  ? listo
export const crearMedicamento = async (req, res) => {
  let descripcion = req.params.descripcion
  let sql= "Call crearMedicamento(?)"
  let [filas] = await connection.query(sql,[descripcion]);
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
