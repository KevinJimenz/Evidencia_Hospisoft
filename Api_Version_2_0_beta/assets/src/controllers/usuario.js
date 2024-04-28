import { connection } from '../models/data';

export const  listarUsuarios = async (req,res)=>{
    // ? Procedimiento Almacenados
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
export const buscarUsuario = async (req,res)=>{
    // ? Procedimiento Almacenado
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
export const eliminarUsuario = async (req,res) =>{
    // ? Procedimiento Almacenado
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
export const editarUsuario = async (req,res)=>{
    // ? Procedimiento Almacenado 
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
export const crearUsuario = async (req,res)=>{
    // ? Procedimiento Almacenado
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