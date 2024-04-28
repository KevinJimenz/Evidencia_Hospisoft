import { Router } from "express";
import { listarMedicamentos,eliminarMedicamento,crearMedicamento,editarMedicamento } from "../controllers/medicamento"; 
const medicamentos = Router();

medicamentos.all("/medicamentos/crear",crearMedicamento);
medicamentos.all("/medicamentos/editar",editarMedicamento);
medicamentos.all("/medicamentos/eliminar",eliminarMedicamento);
medicamentos.all("/medicamentos/listar",listarMedicamentos);

export default medicamentos;