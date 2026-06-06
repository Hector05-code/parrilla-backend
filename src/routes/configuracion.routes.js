const express = require('express');
const router = express.Router();
const configuracionController = require('../controllers/configuracion.controller');

router.get('/', configuracionController.listarConfiguracion);
router.get('/:id', configuracionController.obtenerConfiguracion);
router.post('/', configuracionController.crearConfiguracion);
router.put('/:id', configuracionController.actualizarConfiguracion);
router.delete('/:id', configuracionController.eliminarConfiguracion);

module.exports = router;