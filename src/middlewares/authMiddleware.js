const jwt = require('jsonwebtoken');
const SECRET = 'parrilla_secret_key';

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ mensaje: 'Token requerido' });

    try {
        const decoded = jwt.verify(token, SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
};

const soloAdmin = (req, res, next) => {
    if (req.usuario.rol !== 'admin') {
        return res.status(403).json({ mensaje: 'Acceso solo para administradores' });
    }
    next();
};

const soloCliente = (req, res, next) => {
    if (req.usuario.rol !== 'cliente') {
        return res.status(403).json({ mensaje: 'Acceso solo para clientes' });
    }
    next();
};

// ← AGREGÁ ESTO
const soloEmpleado = (req, res, next) => {
    if (!['admin', 'empleado'].includes(req.usuario.rol)) {
        return res.status(403).json({ mensaje: 'Acceso no autorizado' });
    }
    next();
};

module.exports = { verificarToken, soloAdmin, soloCliente, soloEmpleado };