const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: "localhost",
  user : "root",
  password: "",
  database: "hospisoft"


})

conexion.connect((error)=>{
    if (error) {
      console.log(error);
      
    } else {
      console.log("se ha conectado correctamente a la base de datos!");
    }
});

module.exports = conexion;