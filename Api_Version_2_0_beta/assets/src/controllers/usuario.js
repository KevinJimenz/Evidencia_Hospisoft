import { connection } from "../models/data.js";
import bcrypt from 'bcrypt';

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
  try{
 let id = req.params.id;
 let sql = "Call eliminarUsuario(?)";
 await connection.query(sql, [id]);
 return res.send({ status: "ok", message: "Usuario eliminado" });
  }
  catch(error){
 return res.send({
   status: "error",
   mensaje: "No hay registros"
 });
  }

};// ? listo


export const editarUsuario = async (req, res) => {
  try{
 let id = req.params.id;
 let name = req.params.name;
 let email = req.params.email;
 let password = bcrypt.hashSync(req.params.password, 10);
 let sql = "Call editarUsuario(?,?,?,?)";
 await connection.query(sql, [id, name, email, password]);
 return res.send({ status: "ok", message: "Usuario Editado" });
  }
  catch(error){
return res.send({ status: error, message: "Error al editar usuario" });
  }
 
};// ? listo

export const crearUsuario = async (req, res) => {
  try{
 let name = req.params.name;
 let email = req.params.email;
 let password = bcrypt.hashSync(req.params.pass, 10);
 let sql = "CALL crearUsuario(?,?,?)";
 console.log(name, email, password);
 await connection.query(sql, [name, email, password]);

 return res.send({ status: "ok", message: "Usuario crear" });
  }
  catch(error){
return res.send({ status: error, message: "Error al crear usuario" });

  }
 
};// ? listo

export const verificarUsuario = async (req, res) => {
  let sql = "CALL buscarCorreoUsuario(?)";
  let correoVerificar = req.params.email;
  let [[array]] = await connection.query(sql, [correoVerificar]);
  if (!array) {
    res.send({
      status: "error",
      message: "Correo no encontrado",
    });
  } else {
    let passwordDb = array[0].password;
    let validar = bcrypt.compareSync(passwordDb,req.params.pass)
    if ( validar )
      {
        return res.send(array)
      }
      else{
        res.send({
          status: "error",
          message: "Password Incorrect",
          data: array
        });
      }
    
  }
};

export const traerUsuario = async (req,res) => {
  let sql = "Call traerUsuario" ;
  let [[filas]] = await connection.query(sql) ; 
  if(!filas){
    res.send({
      status: "error"
    });
  }
   return res.send(filas);
  };
