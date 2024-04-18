const express = require('express');
const medico= express.Router();
const conexion = require("./data");



medico.get("/medico/mostrarMedicos",(req,res) => {

    let consulta = "select * from medicos"
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
medico.delete("/medico/eliminarMedico/:idMedico",(req,res) => {
    let idMedico= req.params.idMedico;
    let consulta = "delete from medicos where idMedico="+idMedico;
    conexion.query(consulta,(error,resultado)=>{
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
medico.put("/medico/editarMedico/:idMedico",(req,res)=>{
    let idMedico= req.params.idMedico;
    
    let form = req.body
   
    conexion.query("UPDATE medicos SET ? WHERE idMedico = ?",[form,idMedico], (error,resultado)=>{
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
medico.post("/medico/crearMedico", (req,res)=>{
   let form = req.body;
conexion.query("INSERT INTO medicos SET ?",form,(error,resultado)=>{
    

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