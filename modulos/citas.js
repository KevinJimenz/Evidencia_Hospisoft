const express = require('express');
const citas = express.Router();
const conexion = require("./data")


citas.get("/citas/pacientesAtendidos/:month/:year",(req,res) => {
    
    let mes = req.params.month;
    let año = req.params.year;
    console.log(año,mes)

    let consulta = "SELECT * FROM citas where fecha like '%"+mes+"%' and fecha like '%"+año+"%' GROUP BY id_Paciente"
    console.log(consulta)

    conexion.query(consulta,(error,resultado)=>{
        try{
            res.status(200).send(resultado)
        }
        catch(error){
            res.status(400).send({
                "status": "error",
                "message": "Error al Mostrar pacientes",
            })
        }

})
});

module.exports = citas