import { Router } from 'express';
import { buscarUsuario,crearUsuario,editarUsuario,listarUsuarios,eliminarUsuario } from '../controllers/usuario';
const usuario = Router();

usuario.all("/usuario/mostrarUsuarios",listarUsuarios);
usuario.all("/usuario/buscarUsuario/:email/:password",buscarUsuario);
usuario.all("/usuario/eliminarUsuario/:id",eliminarUsuario);
usuario.all("/usuario/editarUsuario/:id/:name/:email/:pass",editarUsuario);
usuario.all("/usuario/crearUsuario/:name/:email/:pass",crearUsuario);

export default usuario;