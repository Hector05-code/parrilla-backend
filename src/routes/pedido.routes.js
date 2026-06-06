const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedido.controller');

router.get('/', pedidoController.listarPedidos);
router.get('/:id', pedidoController.obtenerPedido);
router.post('/', pedidoController.crearPedido);
router.put('/:id', pedidoController.actualizarPedido);
router.delete('/:id', pedidoController.eliminarPedido);
router.get('/cliente/:id', pedidoController.obtenerPedidosCliente);

module.exports = router;