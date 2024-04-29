import {pacientesAtendidosMes, pacientesAtendidos,EliminarCita,mostrarPacientesId,mostrarCitas,verificarCita,crearCita,editarCita} from "../controllers/citas"
import { Router } from "express";

const citas = Router();

citas.get("/citas/medicos/pacientesAtendidos/:mes", pacientesAtendidosMes);
citas.get("/citas/pacientesAtendidos", pacientesAtendidos);
citas.delete("/cita/eliminarCita/:idCita",EliminarCita)
citas.get("/cita/mostrarPacienteId/:idPaciente",mostrarPacientesId)
citas.get("/cita/mostrarCitas",mostrarCitas)
citas.get("/citas/verificarCita/:horaInicio/:horaFin/:fecha",verificarCita)
citas.post("/citas/crearCita/:descripcion/:direccion/:fecha/:idPaciente/:idMedico/:horaInicio/:horaFin",crearCita)

citas.put("/citas/editarCita/:idCita/:descripcion/:direccion/:fecha/:idPaciente/:idMedico/:horaInicio/:horaFin",editarCita)


export default citas

