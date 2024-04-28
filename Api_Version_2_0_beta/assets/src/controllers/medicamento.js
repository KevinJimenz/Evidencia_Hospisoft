import { connection } from "../models/data";

export const listarMedicamentos = async (req,res)=>{
    // ? Procedimiento almacenado
    let [filas] = await cnx.query(sql);
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
};

export const eliminarMedicamento = async (req,res)=>{
    // ? Procedimientos almacenados
    let [filas] = await cnx.query(sql);
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
};

export const editarMedicamento = async (req,res)=>{
    // ? Procedimiento almacenado 
    let [filas] = await cnx.query(sql);
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
};

export const crearMedicamento = async (req,res) =>{
// ? Procedimiento almacenado
let [filas] = await cnx.query(sql);
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
};