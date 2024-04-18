const express = require('express');
const citas = express.Router();
const conexion = require("./data")

citas.get("/citas/medicos/pacientesAtendidos/:mes",(req,res) => {
    let mes = req.params.mes
    let consulta = "SELECT nombreMedico as Nombre , apellidoMedico as Apellido , COUNT(*) as Total_Pacientes FROM citas INNER JOIN medicos on id_Medico = idMedico Where MONTH(fecha) = "+mes
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
citas.get("/citas/pacientesAtendidos",(req,res) => {

    conexion.query("SELECT * FROM citas ORDER BY id_Paciente",(error,resultado)=>{
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
citas.get("/citas/mostrarPacienteId/:idPaciente",(req,res) => {
   
    let idPaciente = req.params.idPaciente;
    let consulta = "SELECT citas.descripcion,citas.direccion, citas.fecha, citas.id_Paciente, pacientes.nombrePaciente, pacientes.apellidoPaciente, pacientes.emailPaciente, pacientes.telefonoPaciente, pacientes.fechaNacimiento, pacientes.epsPaciente, medicos.nombreMedico, medicos.apellidoMedico, medicos.emailMedico, medicos.especialidad FROM citas INNER JOIN pacientes ON citas.id_Paciente = pacientes.idPaciente RIGHT JOIN medicos ON citas.id_Medico = medicos.idMedico WHERE id_Paciente = "+idPaciente;

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

module.exports = citas