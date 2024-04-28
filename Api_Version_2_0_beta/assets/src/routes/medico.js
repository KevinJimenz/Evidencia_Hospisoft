import { connection } from "../models/data";
import { Router } from "express";
import { mostrarMedicos } from "../controllers/medico";
import { mostrarMedicoId} from "../controllers/medico";
import {crearMedico  } from "../controllers/medico";
import { editarMedico } from "../controllers/medico";
import { elminarMedico } from "../controllers/medico";
import { buscarCorreo } from "../controllers/medico";

const medico = Router();

medico.get("/medico/mostrarMedicos", mostrarMedicos);
medico.get("/medico/mostrarMedico/:idMedico", mostrarMedicoId)

medico.delete("/medico/eliminarMedico/:idMedico", elminarMedico);

medico.put("/medico/editarMedico/:idMedico/:nombre/:apellido/:email/:especialidad", editarMedico);

medico.post("/medico/crearMedico/:nombre/:apellido/:email/:especialidad", crearMedico);

medico.post("/medico/buscarCorreo/:email", buscarCorreo);

export default medico;