const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.get('/', adminController.listarAdmins);
router.get('/:id', adminController.obtenerAdmin);
router.post('/', adminController.crearAdmin);
router.put('/:id', adminController.actualizarAdmin);
router.delete('/:id', adminController.eliminarAdmin);

module.exports = router;