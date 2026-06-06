const express = require('express');
const router = express.Router();
const metodoPagoController = require('../controllers/metodoPago.controller');

router.get('/', metodoPagoController.listarMetodosPago);
router.get('/:id', metodoPagoController.obtenerMetodoPago);
router.post('/', metodoPagoController.crearMetodoPago);
router.put('/:id', metodoPagoController.actualizarMetodoPago);
router.delete('/:id', metodoPagoController.eliminarMetodoPago);

module.exports = router;