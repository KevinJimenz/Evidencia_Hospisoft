const express = require('express');
const usuario = express.Router();
const conexion = require("./data");
const bcrypt = require('bcrypt');


usuario.get("/usuario/MostrarUsuarios",(req,res) => {

    let consulta = "select * from users"
    conexion.query(consulta,(error,resultado)=>{
        try{
            res.status(200).send(resultado)
        }
        catch(error){
            res.status(400).send({
                "status": "error",
                "message": "Error al Mostrar Usuarios",
            })
        }

})
});
usuario.get("/usuario/MostrarUsuario/:idUser",(req,res) => {
    console.log(req.params.idUser)
    let idUser = req.params.idUser;
    let consulta = "select * from users where idUser = "+idUser;
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

usuario.get("/usuario/MostrarUsuario/:email/:password",(req,res) => {
    
    let email = req.params.email;
    let password = req.params.password;
    let consulta = "select emailUser, password from users where emailUser= '"+email+"' and password = '"+password+"';" ;
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
usuario.delete("/usuario/eliminarUsuario/:idUser",(req,res) => {
    let idUser = req.params.idUser;
    let consulta = "delete from users where idUser ="+idUser;
    conexion.query(consulta,(error,resultado)=>{
        try{
            res.status(200).send({
                "message": "El usuario ha sido eliminado correctamente"
            })
        }
        catch(error){
            res.status(400).send({
                "status": "error",
                "message": "Error al Mostrar el usuario",
            })
        }

})
});

usuario.put("/usuario/editarUsuario/:idUser",(req,res)=>{
    let idUser = req.params.idUser;
    
    let form = req.body
    console.log(form,idUser);
    conexion.query("UPDATE users SET ? WHERE idUser = ?",[form,idUser], (error,resultado)=>{
        try{
res.status(200).send({
    "message": "usuario Actualizado"
})
        }
        catch(error){
            res.status(200).send({
                "status": "error",
                "message": "Error al actualizar usuario"
            })
        }
    })
})


usuario.post("/usuario/crearUsuario", (req,res)=>{
    let pass = req.body.password

    

   
        conexion.query("INSERT INTO users VALUES (?, ?, ?,?)",[req.body.idUser,
            req.body.userName,req.body.emailUser,pass],(error,resultado)=>{
                
            
                if(res.status(200)){
            
                    res.send({
                        "message": "Usuario Creado"
                    })
                }
                else{
            
                    res.send({
                        "status": "error",
                        "message": "Error al crear usuario"
                    })
                }
                   
                })
     
    

    
   
   
    




})







module.exports = usuario;