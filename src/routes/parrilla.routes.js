const express = require('express');
const router = express.Router();
const parrillaController = require('../controllers/parrilla.controller');

router.get('/', parrillaController.listarParrillas);
router.get('/:id', parrillaController.obtenerParrilla);
router.post('/', parrillaController.crearParrilla);
router.put('/:id', parrillaController.actualizarParrilla);
router.delete('/:id', parrillaController.eliminarParrilla);

module.exports = router;