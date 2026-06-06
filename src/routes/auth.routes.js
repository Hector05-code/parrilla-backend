const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/registro', authController.registro);
router.post('/crear-admin', authController.crearAdmin);

module.exports = router;