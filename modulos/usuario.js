const express = require('express');
const usuario = express.Router();
const conexion = require('./data');


usuario.get("/usuario/listarUsuario")