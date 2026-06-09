const express = require('express');
const router = express.Router();
const categoriaBebidaController = require('../controllers/categoriaBebida.controller');
const { verificarToken, soloAdmin } = require('../middlewares/authMiddleware');

router.get('/', verificarToken, categoriaBebidaController.listarCategorias);
router.get('/:id', verificarToken, categoriaBebidaController.obtenerCategoria);
router.post('/', verificarToken, soloAdmin, categoriaBebidaController.crearCategoria);
router.put('/:id', verificarToken, soloAdmin, categoriaBebidaController.actualizarCategoria);
router.delete('/:id', verificarToken, soloAdmin, categoriaBebidaController.eliminarCategoria);

module.exports = router;