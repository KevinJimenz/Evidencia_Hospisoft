import { Router } from "express";
import { listarMedicamentos,eliminarMedicamento,crearMedicamento,editarMedicamento } from "../controllers/medicamento.js"; 
const medicamentos = Router();

medicamentos.all("/medicamentos/crear/:descripcion",crearMedicamento);
medicamentos.all("/medicamentos/editar/:id/:descripcion/:existencia",editarMedicamento);
medicamentos.all("/medicamentos/eliminar/:id",eliminarMedicamento);
medicamentos.all("/medicamentos/listar",listarMedicamentos);

export default medicamentos;