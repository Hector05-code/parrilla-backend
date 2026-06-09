const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');
const { verificarToken, soloAdmin } = require('../middlewares/authMiddleware');

router.get('/', verificarToken, productoController.listarProductos);
router.get('/:id', verificarToken, productoController.obtenerProducto);
router.post('/', verificarToken, soloAdmin, productoController.crearProducto);
router.put('/:id', verificarToken, soloAdmin, productoController.actualizarProducto);
router.delete('/:id', verificarToken, soloAdmin, productoController.eliminarProducto);

module.exports = router;