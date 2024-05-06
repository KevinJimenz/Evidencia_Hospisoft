import { Router } from "express";
import { listarMedicamentos,eliminarMedicamento,crearMedicamento,editarMedicamento } from "../controllers/medicamento.js"; 
const medicamentos = Router();

medicamentos.post("/medicamentos/crear/:descripcion/:stock",crearMedicamento);
medicamentos.put("/medicamentos/editar/:id/:descripcion/:existencia",editarMedicamento);
medicamentos.delete("/medicamentos/eliminar/:id",eliminarMedicamento);
medicamentos.get("/medicamentos/listar",listarMedicamentos);

export default medicamentos;