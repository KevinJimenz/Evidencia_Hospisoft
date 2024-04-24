const express = require('express');
const paciente= express.Router();
const conexion = require("./data");


paciente.get("/paciente/mostrarPacientes",(req,res) => {

   
    conexion.query("SELECT idPaciente, nombrePaciente , apellidoPaciente , emailPaciente , telefonoPaciente , movilPaciente , fechaNacimiento, epsPaciente, users.userName as usuarioPaciente  FROM pacientes  INNER JOIN users on usuarioPaciente = users.idUser ",(error,resultado)=>{
        try{
            res.status(200).send(resultado)
        }
        catch(error){
            res.status(400).send({
                "status": "error",
                "message": "Error al Mostrar Pacientes",
            })
        }

})
});
paciente.get("/paciente/MostrarPacientes/:email/:password",(req,res) => {
    
    let email = req.params.email;
    let password = req.params.password;
    console.log(email,password)
    let consulta = "select emailPaciente, passwordPaciente from pacientes where emailPaciente= '"+email+"' and passwordPaciente = '"+password+"';" ;
    conexion.query(consulta,(error,resultado)=>{
        try{
            res.status(200).send(resultado)
        }
        catch(error){
            res.status(400).send({
                "status": "error",
                "message": "Error al Mostrar el usuario",
            })
        }

})
});
paciente.get("/paciente/mostrarPaciente/:idPaciente",(req,res) => {
   
    let idPaciente = req.params.idPaciente;
    let consulta = "select * from pacientes where idPaciente = "+idPaciente;

    conexion.query(consulta,(error,resultado)=>{
        try{
            res.status(200).send(resultado)
        }
        catch(error){
            res.status(400).send({
                "status": "error",
                "message": "Error al Mostrar el paciente",
            })
        }

})
});
paciente.all("/paciente/eliminarPaciente/:idPaciente",(req,res) => {
    let idPaciente= req.params.idPaciente;
    conexion.query("delete from pacientes where idPaciente="+idPaciente,(error,resultado)=>{
        try{
            res.status(200).send({
                "message": "El paciente ha sido eliminado correctamente"
            })
        }
        catch(error){
            res.status(400).send({
                "status": "error",
                "message": "Error al eliminar el paciente",
            })
        }

})
});

paciente.all("/paciente/editarPaciente/:idPaciente/:name/:lastname/:email/:telefono/:movil/:date/:eps/:user",(req,res)=>{
    let idPaciente= req.params.idPaciente;
    let name = req.params.name;
    let lastname = req.params.lastname;
    let email = req.params.email;
    let telefono = req.params.telefono;
    let movil = req.params.movil;
    let date = req.params.date;
    let eps = req.params.eps;
    let user = req.params.user;
    conexion.query("UPDATE pacientes SET nombrePaciente ='"+name+"', apellidoPaciente ='"+lastname+"', emailPaciente ='"+email+"', telefonoPaciente ='"+telefono+"', movilPaciente ='"+movil+"', fechaNacimiento ='"+date+"', epsPaciente ='"+eps+"', usuarioPaciente ='"+user+"' WHERE idPaciente = "+idPaciente, (error,resultado)=>{
        try{
res.status(200).send({
    "message": "paciente Actualizado"
})
        }
        catch(error){
            res.status(200).send({
                "status": "error",
                "message": "Error al actualizar paciente"
            })
        }
    })
})


paciente.all("/paciente/crearPaciente/:nombre/:apellido/:email/:telefono/:movil/:date/:eps/:user/:pass", (req,res)=>{
   let nombre = req.params.nombre
   let apellido = req.params.apellido
   let email = req.params.email
   let telefono= req.params.nombre
   let movil = req.params.movil
   let date = req.params.date
   let eps = req.params.eps
   let user = req.params.user
   let pass = req.params.pass
conexion.query("INSERT INTO pacientes VALUES('','"+nombre+"' , '"+apellido+"' , '"+email+"' , '"+telefono+"' , '"+movil+"' , '"+date+"' , '"+eps+"' ,"+user+", '"+pass+"')",(error,resultado)=>{

    try{
        res.status(200).send({
            "message": "paciente Creado"
        })
    }
    catch(error){
        res.status(400).send({
            "status": "error",
            "message": "Error al crear paciente"
        })
    }
})

})

module.exports = paciente;