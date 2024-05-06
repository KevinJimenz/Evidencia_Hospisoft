import {pacientesAtendidosMes, pacientesAtendidos,EliminarCita,mostrarPacienteId,mostrarCitas,verificarCita,crearCita,editarCita} from "../controllers/citas.js"
import { Router } from "express";

const citas = Router();

citas.get("/citas/medicos/pacientesAtendidos/:mes", pacientesAtendidosMes);
citas.get("/citas/pacientesAtendidos", pacientesAtendidos);
citas.delete("/citas/eliminarCita/:idCita",EliminarCita)
citas.get("/cita/mostrarPacienteId/:idPaciente",mostrarPacienteId)
citas.get("/citas/mostrarCitas", mostrarCitas)
citas.get("/citas/verificarCita/:horaInicio/:horaFin/:fecha",verificarCita)
citas.post("/citas/crearCita/:descripcion/:direccion/:fecha/:idPaciente/:idMedico/:horaInicio/:horaFin",crearCita)

citas.put("/citas/editarCita/:idCita/:descripcion/:direccion/:fecha/:idPaciente/:idMedico/:horaInicio/:horaFin",editarCita)


export default  citas;

