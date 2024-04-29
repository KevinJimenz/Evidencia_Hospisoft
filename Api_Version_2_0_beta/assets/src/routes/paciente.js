import { Router } from "express";
import { crearPaciente, eliminarPaciente, editarPaciente, listarPacientes } from "../controllers/paciente";
const pacientes = Router();

pacientes.all("/pacientes/crear/:name/:apellido/:email/:telefono/:movil/:fecha/:eps/:usuario/:password",crearPaciente);
pacientes.all("/pacientes/editar/:id/:name/:apellido/:email/:telefono/:movil/:fecha/:eps/:usuario/:password",editarPaciente);
pacientes.all("/pacientes/eliminar/:id",eliminarPaciente);
pacientes.all("/pacientes/listar",listarPacientes);

export default pacientes;
