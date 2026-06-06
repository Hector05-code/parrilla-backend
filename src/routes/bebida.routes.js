const express = require('express');
const router = express.Router();
const bebidaController = require('../controllers/bebida.controller');

router.get('/', bebidaController.listarBebidas);
router.get('/:id', bebidaController.obtenerBebida);
router.post('/', bebidaController.crearBebida);
router.put('/:id', bebidaController.actualizarBebida);
router.delete('/:id', bebidaController.eliminarBebida);

module.exports = router;