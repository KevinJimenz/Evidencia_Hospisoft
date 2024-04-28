import { Router } from "express";
import { crearPaciente, eliminarPaciente, editarPaciente, listarPacientes } from "../controllers/paciente";
const pacientes = Router();

pacientes.all("/pacientes/crear",crearPaciente);
pacientes.all("/pacientes/editar",editarPaciente);
pacientes.all("/pacientes/eliminar",eliminarPaciente);
pacientes.all("/pacientes/listar",listarPacientes);

export default pacientes;
