const express = require('express');
const paciente= express.Router();
const conexion = require("./data");


paciente.get("/paciente/mostrarPacientes",(req,res) => {

    let consulta = "select * from pacientes"
    conexion.query(consulta,(error,resultado)=>{
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
paciente.delete("/paciente/eliminarPaciente/:idPaciente",(req,res) => {
    let idPaciente= req.params.idPaciente;
    let consulta = "delete from pacientes where idPaciente="+idPaciente;
    conexion.query(consulta,(error,resultado)=>{
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

paciente.put("/paciente/editarPaciente/:idPaciente",(req,res)=>{
    let idPaciente= req.params.idPaciente;
    
    let form = req.body
   
    conexion.query("UPDATE pacientes SET ? WHERE idPaciente = ?",[form,idPaciente], (error,resultado)=>{
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


paciente.post("/paciente/crearPaciente", (req,res)=>{
   let form = req.body;
conexion.query("INSERT INTO pacientes SET ?",form,(error,resultado)=>{
    

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