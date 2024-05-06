import { Router } from "express";
import { crearPaciente, eliminarPaciente, editarPaciente, listarPacientes, verificarPaciente } from "../controllers/paciente.js";
const pacientes = Router();

pacientes.post("/pacientes/crear/:id/:name/:apellido/:email/:telefono/:movil/:fecha/:eps/:password",crearPaciente);
pacientes.put("/pacientes/editar/:id/:name/:apellido/:email/:telefono/:movil/:fecha/:eps/",editarPaciente);
pacientes.delete("/pacientes/eliminar/:id",eliminarPaciente);
pacientes.get("/pacientes/listar",listarPacientes);
pacientes.get("/pacientes/verificarPaciente/:email/:password", verificarPaciente);

export default pacientes;
