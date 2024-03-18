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

citas.get("/citas/medicosConsultas/:month/:year",(req, res)=>{
  let mes = req.params.month;
  let año = req.params.year;
  let consulta = "SELECT medicos.idMedico,medicos.nombreMedico,medicos.emailMedico,medicos.especialidad,COUNT(id_Medico) as cantidadCitas from citas INNER JOIN medicos ON medicos.idMedico = citas.id_Medico WHERE citas.fecha LIKE '%"+mes+"%' and citas.fecha LIKE '%"+año+"%' GROUP BY citas.id_Medico;";
  conexion.query(consulta,(error,resultado)=>{
   try{
    res.status(200).send(resultado)
   }
   catch(error){

    res.status(400).send({
        "status": "error",
        "message": "Error al Mostrar citas de medicos",
    })
    }
   
  })

  

})


citas.get("/citas/facturacionCitasMes/:month/:year",(req, res)=>{
    let mes = req.params.month;
    let año = req.params.year;
    let consulta = "SELECT * FROM citas WHERE fecha LIKE '%"+mes+"%' and fecha LIKE '%"+año+"%';"
    conexion.query(consulta,(error,resultado)=>{
     try{
      res.status(200).send(resultado)
     }
     catch(error){
  
      res.status(400).send({
          "status": "error",
          "message": "Error al Mostrar citas",
      })
      }
     
    })
  
    
  
  })

  citas.get("/citas/mostrarCitas",(req,res) => {

    let consulta = "select * from citas"
    conexion.query(consulta,(error,resultado)=>{
        try{
            res.status(200).send(resultado)
        }
        catch(error){
            res.status(400).send({
                "status": "error",
                "message": "Error al Mostrar citas",
            })
        }

})
});

citas.get("/citas/mostrarCitaId/:idCita",(req,res) => {
    let idCita = req.params.idCita;
    let consulta = "select * from citas where idCita = "+ idCita;
    conexion.query(consulta,(error,resultado)=>{
        try{
            res.status(200).send(resultado)
        }
        catch(error){
            res.status(400).send({
                "status": "error",
                "message": "Error al Mostrar cita",
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

citas.delete("/citas/eliminarCita/:idCita",(req,res) => {
    let idCita = req.params.idCita;
    let consulta = "delete from citas where idCita="+idCita;
    conexion.query(consulta,(error,resultado)=>{
        try{
            res.status(200).send({
                "message": "La cita ha sido eliminada correctamente"
            })
        }
        catch(error){
            res.status(400).send({
                "status": "error",
                "message": "Error al eliminar cita",
            })
        }

})
});

citas.put("/citas/editarCitas/:idCita",(req,res)=>{
    let idCita = req.params.idCita;
    
    let form = req.body
   
    conexion.query("UPDATE citas SET ? WHERE idCita = ?",[form,idCita], (error,resultado)=>{
        try{
res.status(200).send({
    "message": "Cita Actualizada"
})
        }
        catch(error){
            res.status(200).send({
                "status": "error",
                "message": "Error al actualizar cita"
            })
        }
    })
})


citas.post("/citas/crearCita", (req,res)=>{
   let form = req.body;
   

conexion.query("INSERT INTO citas SET ?",form,(error,resultado)=>{
    

    try{
        res.status(200).send({
            "message": "Cita Agregada"
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