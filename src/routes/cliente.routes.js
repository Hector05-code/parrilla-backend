const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');
const { verificarToken, soloAdmin } = require('../middlewares/authMiddleware');

router.get('/', verificarToken, soloAdmin, clienteController.listarClientes);
router.get('/cedula/:cedula', verificarToken, clienteController.buscarPorCedula);
router.get('/:id', verificarToken, clienteController.obtenerCliente);
router.post('/', clienteController.crearCliente);
router.put('/:id', verificarToken, clienteController.actualizarCliente);
router.delete('/:id', verificarToken, soloAdmin, clienteController.eliminarCliente);

module.exports = router;