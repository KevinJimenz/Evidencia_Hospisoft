import { Router } from "express";
import { mostrarMedicos, mostrarMedicoId, crearMedico, editarMedico,eliminarMedico,buscarCorreo } from "../controllers/medico.js";

const medico = Router();

medico.get("/medico/mostrarMedicos", mostrarMedicos);
medico.get("/medico/mostrarMedico/:idMedico", mostrarMedicoId)
medico.delete("/medico/eliminarMedico/:idMedico", eliminarMedico);
medico.put("/medico/editarMedico/:idMedico/:nombre/:apellido/:email/:especialidad", editarMedico);
medico.post("/medico/crearMedico/:nombre/:apellido/:email/:especialidad", crearMedico);
medico.post("/medico/buscarCorreo/:email", buscarCorreo);

export default medico;