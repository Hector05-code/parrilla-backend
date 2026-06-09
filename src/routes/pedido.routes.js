const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedido.controller');
const { verificarToken, soloAdmin, soloEmpleado } = require('../middlewares/authMiddleware');

router.get('/', verificarToken, soloEmpleado, pedidoController.listarPedidos);
router.get('/cliente/:id', verificarToken, pedidoController.obtenerPedidosCliente);
router.patch('/:id/estado', verificarToken, soloEmpleado, pedidoController.cambiarEstado);
router.get('/:id', verificarToken, pedidoController.obtenerPedido);
router.post('/', verificarToken, pedidoController.crearPedido);
router.put('/:id', verificarToken, soloAdmin, pedidoController.actualizarPedido);
router.delete('/:id', verificarToken, soloAdmin, pedidoController.eliminarPedido);

module.exports = router;