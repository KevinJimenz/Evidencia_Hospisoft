import { Router } from "express";
import { crearPaciente, eliminarPaciente, editarPaciente, listarPacientes, verificarPaciente } from "../controllers/paciente.js";
const pacientes = Router();

pacientes.all("/pacientes/crear/:name/:apellido/:email/:telefono/:movil/:fecha/:eps/:usuario/:password",crearPaciente);
pacientes.all("/pacientes/editar/:id/:name/:apellido/:email/:telefono/:movil/:fecha/:eps/:usuario/:password",editarPaciente);
pacientes.all("/pacientes/eliminar/:id",eliminarPaciente);
pacientes.all("/pacientes/listar",listarPacientes);
pacientes.all("/pacientes/verificarPaciente/:email", verificarPaciente);

export default pacientes;
