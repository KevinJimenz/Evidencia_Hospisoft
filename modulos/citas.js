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
//mostrar citas
citas.get("/citas/mostrarCitas",(req,res) => {
   
     let consulta = "SELECT citas.idCita,citas.descripcion,citas.direccion, citas.fecha,citas.horaInicio,citas.horaFin, pacientes.nombrePaciente, medicos.nombreMedico FROM citas INNER JOIN pacientes ON citas.id_Paciente = pacientes.idPaciente RIGHT JOIN medicos ON citas.id_Medico = medicos.idMedico;"

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
citas.get("/citas/verificarCita/:horaInicio/:horaFin/:fecha",(req,res) => {
   let horaInicio = req.params.horaInicio
   let horaFin = req.params.horaFin
   let fecha = req.params.fecha
    let consulta = "SELECT * from citas where horaInicio BETWEEN '"+horaInicio+"' AND '"+horaFin+"' AND fecha = '"+fecha+"' or horaFin BETWEEN '"+horaInicio+"' AND '"+horaFin+"' and fecha = '"+fecha+"'";

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

citas.all("/citas/crearCita/:descripcion/:direccion/:fecha/:idPaciente/:idMedico/:horaInicio/:horaFin", (req,res)=>{
    let descripcion = req.params.descripcion
    let direccion = req.params.direccion
    let fecha = req.params.fecha
    let idPaciente = req.params.idPaciente
    let idMedico = req.params.idMedico
    let horaInicio = req.params.horaInicio
    let horaFin = req.params.horaFin

    conexion.query("INSERT INTO citas VALUES ('','"+descripcion+"','"+direccion+"', '"+fecha+"' , "+idPaciente+",  "+idMedico+",  '"+horaInicio+"', '"+horaFin+"')",(error,resultado)=>{
    try{
        res.status(200).send({
            "message": "Cita Creada"
        })
    }
    catch(error){
        res.status(400).send({
            "status": "error",
            "message": "Error al crear cita"
        })
    }
})
})



module.exports = citas