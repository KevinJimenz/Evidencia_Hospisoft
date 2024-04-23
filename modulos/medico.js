const express = require('express');
const medico= express.Router();
const conexion = require("./data");
medico.get("/medico/mostrarMedicos",(req,res) => {
    let consulta = "select idMedico as id, nombreMedico as nombre, apellidoMedico as apellido, emailMedico as email , especialidad from medicos"
    conexion.query(consulta,(error,resultado)=>{
        try{
            res.status(200).send(resultado)
        }
        catch(error){
            res.status(400).send({
                "status": "error",
                "message": "Error al Mostrar Medicos",
            })
        }
})
});
medico.get("/medico/mostrarMedico/:idMedico",(req,res) => {
    let idMedico = req.params.idMedico;
    let consulta = "select * from medicos where idMedico = "+idMedico;
    conexion.query(consulta,(error,resultado)=>{
        try{
            res.status(200).send(resultado)
        }
        catch(error){
            res.status(400).send({
                "status": "error",
                "message": "Error al Mostrar el medico",
            })
        }
})
});
medico.all("/medico/eliminarMedico/:idMedico",(req,res) => {
    let idMedico= req.params.idMedico;
    conexion.query("DELETE FROM medicos WHERE idMedico="+idMedico,(error,resultado)=>{
        try{
            res.status(200).send({
                "message": "El medico ha sido eliminado correctamente"
            })
        }
        catch(error){
            res.status(400).send({
                "status": "error",
                "message": "Error al eliminar el medico",
            })
        }
})
});
medico.all("/medico/editarMedico/:idMedico/:nombre/:apellido/:email/:especialidad",(req,res)=>{
    let idMedico= req.params.idMedico;
    let nombre= req.params.nombre;
    let apellido= req.params.apellido;
    let email= req.params.email;
    let especialidad= req.params.especialidad;
    conexion.query("UPDATE medicos SET nombreMedico = '"+nombre+"', apellidoMedico = '"+apellido+"', emailMedico = '"+email+"', especialidad = '"+especialidad+"' WHERE idMedico ="+ idMedico, (error,resultado)=>{
        try{
        res.status(200).send({
            "message": "Medico Actualizado"
        })
        }
        catch(error){
            res.status(200).send({
                "status": "error",
                "message": "Error al actualizar medico"
            })
        }
    })
})
medico.all("/medico/crearMedico/:nombre/:apellido/:email/:especialidad", (req,res)=>{
    let nombre = req.params.nombre
    let apellido = req.params.apellido
    let email = req.params.email
    let especialidad = req.params.especialidad
    conexion.query("INSERT INTO medicos VALUEs ('','"+nombre+"','"+apellido+"', '"+email+"' , '"+especialidad+"')",(error,resultado)=>{
    try{
        res.status(200).send({
            "message": "Medico Creado"
        })
    }
    catch(error){
        res.status(400).send({
            "status": "error",
            "message": "Error al crear medico"
        })
    }
})
})
module.exports = medico;