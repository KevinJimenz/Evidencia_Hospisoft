
import express from "express";
import cors from "cors";
import rutacitas from "./assets/src/routes/citas.js";
import rutausuario from "./assets/src/routes/usuario.js";
import rutapaciente from "./assets/src/routes/paciente.js";
import rutamedico from "./assets/src/routes/medico.js";
import rutamedicamento from "./assets/src/routes/medicamento.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

//creamos el server node
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas con MVC

app.use(rutacitas,rutausuario,rutamedico,rutamedicamento,rutapaciente);
app.listen(port, () => {
  console.log("server ejecutandose", port);
});





