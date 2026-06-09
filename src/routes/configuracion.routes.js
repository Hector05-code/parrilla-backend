const express = require('express');
const router = express.Router();
const configuracionController = require('../controllers/configuracion.controller');
const { verificarToken, soloAdmin } = require('../middlewares/authMiddleware');

router.get('/', verificarToken, configuracionController.listarConfiguracion);
router.put('/:id', verificarToken, soloAdmin, configuracionController.actualizarConfiguracion);

module.exports = router;