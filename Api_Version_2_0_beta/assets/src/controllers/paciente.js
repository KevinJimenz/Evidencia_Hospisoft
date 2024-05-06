import { connection } from "../models/data.js";
import bcrypt from "bcrypt";

export const listarPacientes = async (req, res) => {
  let sql = "Call listarPacientes"
  let [filas] = await connection.query(sql);
  if (!filas) {
    return res.send({
      status: "error",
      mensaje: "No hay registros",
    });
  }
  return res.send(filas);

}; // ? listo
export const editarPaciente = async (req, res) => {
  try{
  let id = req.params.id;
  let name = req.params.name;
  let apellido = req.params.apellido;
  let email = req.params.email;
  let telefono = req.params.telefono;
  let movil = req.params.movil;
  let fecha = req.params.fecha;
  let eps = req.params.eps;
 
  
  let sql = "Call editarPaciente(?,?,?,?,?,?,?,?)";
  await connection.query(sql, [
    id,
    name,
    apellido,
    email,
    telefono,
    movil,
    fecha,
    eps
  ]);

  return res.send({status:"Ok",
  message:"Paciente editado"});

  }
  catch(error){
 return res.send({
   status: "error",
   mensaje: "No hay registros",
 });


  }
}

// ? listo

export const eliminarPaciente = async (req, res) => {
  try{
let id = req.params.id;
let sql = "Call eliminarPaciente(?) ";
await connection.query(sql, [id]);
return res.send({status:"Ok",message:"Se ha eliminado correctamente"})
  }
  catch(error){
  return res.send({
    status: error,
    mensaje: "No hay registros",
  });

  }
  
  

};//? listo

export const crearPaciente = async (req, res) => {
  try{
let id = req.params.id;
let name = req.params.name;
let apellido = req.params.apellido;
let email = req.params.email;
let telefono = req.params.telefono;
let movil = req.params.movil;
let fecha = req.params.fecha;
let eps = req.params.eps;
let password = bcrypt.hashSync(req.params.password, 0)
console.log(id,name,email,telefono,movil,eps,password)
let sql = "Call crearPaciente(?,?,?,?,?,?,?,?,?)";

await connection.query(sql, [
  
  name,
  apellido,
  email,
  telefono,
  movil,
  fecha,
  eps,
  password,
  id
]);
return res.send({status:'ok',message:"Paciente Creado"});
  }
  catch(error){
    console.log(error)
    return res.send({
       status: error,
       message: "No se pudo crear paciente"
     });

  }
  
};
// falta por terminar 
export const verificarPaciente = async (req,res)=>{
  let sql = "CALL buscarCorreoPaciente(?)"
  let passDatabase = ""
  let correoVerificar = req.params.email
  let pass = req.params.password;
  let [array] = await connection.query(sql,[correoVerificar])
  if(!array[0].length){
    res.send({
status: "error",
message: "Correo no encontrado"
    })
  }
  else{
   
    passDatabase = array[0][0]['passwordPaciente']

     let pwd = bcrypt.compareSync(pass, passDatabase);
     console.log(array)
     console.log(pwd)
     if(pwd){
      
  res.send({
    status: "Ok",
    message: "Ingreso correctamente",
    idUser: array[0][0]["idPaciente"],
    email: array[0][0]["emailPaciente"],
    pass: array[0][0]["passwordPaciente"],
  });
     }
     else{
       
      res.send({
        status: 'error',
        message: 'Opss ... Contraseña incorrecta'
      })
     }
   
    
  }

  

}

