const express = require('express');
const router = express.Router();
const detallePedidoController = require('../controllers/detallePedido.controller');

router.get('/', detallePedidoController.listarDetalles);
router.get('/:id', detallePedidoController.obtenerDetalle);
router.get('/pedido/:id', detallePedidoController.obtenerDetallesPorPedido);
router.post('/', detallePedidoController.crearDetalle);
router.put('/:id', detallePedidoController.actualizarDetalle);
router.delete('/:id', detallePedidoController.eliminarDetalle);

module.exports = router;