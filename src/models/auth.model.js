const db = require('../config/db');

const buscarAdmin = (correo, callback) => {
    db.query('SELECT * FROM admin WHERE correo = ?', [correo], callback);
};

const buscarCliente = (correo, callback) => {
    db.query('SELECT * FROM clientes WHERE correo = ?', [correo], callback);
};

module.exports = { buscarAdmin, buscarCliente };