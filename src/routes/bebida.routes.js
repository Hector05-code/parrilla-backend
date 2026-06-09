const express = require('express');
const router = express.Router();
const bebidaController = require('../controllers/bebida.controller');
const { verificarToken, soloAdmin } = require('../middlewares/authMiddleware');

router.get('/', verificarToken, bebidaController.listarBebidas);
router.get('/:id', verificarToken, bebidaController.obtenerBebida);
router.post('/', verificarToken, soloAdmin, bebidaController.crearBebida);
router.put('/:id', verificarToken, soloAdmin, bebidaController.actualizarBebida);
router.delete('/:id', verificarToken, soloAdmin, bebidaController.eliminarBebida);

module.exports = router;