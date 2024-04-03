const express = require('express');
const medicamento= express.Router();
const conexion = require("./data");


medicamento.get("/medicamento/mostrarMedicamento",(req,res) => {

    let consulta = "select * from medicamentos"
    conexion.query(consulta,(error,resultado)=>{
        try{
            res.status(200).send(resultado)
        }
        catch(error){
            res.status(400).send({
                "status": "error",
                "message": "Error al Mostrar Medicamentos",
            })
        }

})
});
medicamento.get("/medicamento/mostrarMedicamento/:idMedicamento",(req,res) => {
   
    let idMedicamento = req.params.idMedicamento;
    let consulta = "select * from medicamentos where idMedicamento = "+idMedicamento;


    conexion.query(consulta,(error,resultado)=>{
        try{
            res.status(200).send(resultado)
        }
        catch(error){
            res.status(400).send({
                "status": "error",
                "message": "Error al Mostrar el medicamento",
            })
        }

})
});
medicamento.delete("/medicamento/eliminarMedicamento/:idMedicamento",(req,res) => {
    let idMedicamento= req.params.idMedicamento;
    let consulta = "delete from medicamentos where idMedicamento="+idMedicamento;
    conexion.query(consulta,(error,resultado)=>{
        try{
            res.status(200).send({
                "message": "El medicamento ha sido eliminado correctamente"
            })
        }
        catch(error){
            res.status(400).send({
                "status": "error",
                "message": "Error al eliminar el medicamento",
            })
        }

})
});

medicamento.put("/medicamento/editarMedicamento/:idMedicamento",(req,res)=>{
    let idMedicamento= req.params.idMedicamento;
    
    let form = req.body
   
    conexion.query("UPDATE medicamentos SET ? WHERE idMedicamento = ?",[form,idMedicamento], (error,resultado)=>{
        try{
res.status(200).send({
    "message": "Medicamento Actualizado"
})
        }
        catch(error){
            res.status(200).send({
                "status": "error",
                "message": "Error al actualizar medicamento"
            })
        }
    })
})


medicamento.post("/medicamento/crearMedicamento", (req,res)=>{
   let form = req.body;
conexion.query("INSERT INTO medicamentos SET ?",form,(error,resultado)=>{
    

    try{
        res.status(200).send({
            "message": "Medicamento Creado"
        })
    }
    catch(error){
        res.status(400).send({
            "status": "error",
            "message": "Error al crear medicamento"
        })
    }
})

})

module.exports = medicamento;