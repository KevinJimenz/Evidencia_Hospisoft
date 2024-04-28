import { Router } from 'express';
import { buscarUsuario,crearUsuario,editarUsuario,listarUsuarios,eliminarUsuario } from '../controllers/usuario';
const usuario = Router();

usuario.all("/usuario/mostrarUsuarios",listarUsuarios);
usuario.all("/usuario/buscarUsuario/:email/:password",buscarUsuario);
usuario.all("/usuario/eliminarUsuario/:idUser",eliminarUsuario);
usuario.all("/usuario/editarUsuario/:idUser",editarUsuario);
usuario.all("/usuario/crearUsuario",crearUsuario);

export default usuario;