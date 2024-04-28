import { connection } from "../models/data";

export const listarPacientes = async (req,res)=>{
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

export const editarPaciente = async (req,res) =>{
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

export const eliminarPaciente = async (req,res)=>{
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

export const crearPaciente = async (req,res)=>{
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