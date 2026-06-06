const express = require('express');
const router = express.Router();
const categoriaBebidaController = require('../controllers/categoriaBebida.controller');

router.get('/', categoriaBebidaController.listarCategorias);
router.get('/:id', categoriaBebidaController.obtenerCategoria);
router.post('/', categoriaBebidaController.crearCategoria);
router.put('/:id', categoriaBebidaController.actualizarCategoria);
router.delete('/:id', categoriaBebidaController.eliminarCategoria);

module.exports = router;