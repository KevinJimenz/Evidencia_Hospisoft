import { Router } from 'express';
import { buscarUsuario,crearUsuario,editarUsuario,listarUsuarios,eliminarUsuario, verificarUsuario } from '../controllers/usuario.js';
const usuario = Router();

usuario.all("/usuario/mostrarUsuarios",listarUsuarios);
usuario.all("/usuario/buscarUsuario/:id",buscarUsuario);
usuario.all("/usuario/eliminarUsuario/:id",eliminarUsuario);
usuario.all("/usuario/editarUsuario/:id/:name/:email/:pass",editarUsuario);
usuario.all("/usuario/crearUsuario/:name/:email/:pass",crearUsuario);
usuario.all("/usuario/verificarUsuario/:email/:pass", verificarUsuario)

export default usuario;