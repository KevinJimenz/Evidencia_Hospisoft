import { Router } from "express";
import { crearPaciente, eliminarPaciente, editarPaciente, listarPacientes, verificarPaciente } from "../controllers/paciente.js";
const pacientes = Router();

pacientes.post("/pacientes/crear/:name/:apellido/:email/:telefono/:movil/:fecha/:eps/:usuario/:password",crearPaciente);
pacientes.all("/pacientes/editar/:id/:name/:apellido/:email/:telefono/:movil/:fecha/:eps/:usuario/:password",editarPaciente);
pacientes.all("/pacientes/eliminar/:id",eliminarPaciente);
pacientes.all("/pacientes/listar",listarPacientes);
pacientes.get("/pacientes/verificarPaciente/:email/:password", verificarPaciente);

export default pacientes;
