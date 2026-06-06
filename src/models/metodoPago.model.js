const db = require('../config/db');

const obtenerMetodosPago = (callback) => {
    db.query('SELECT * FROM metodos_pago', callback);
};

const obtenerMetodoPagoPorId = (id, callback) => {
    db.query('SELECT * FROM metodos_pago WHERE id_metodos_pago = ?', [id], callback);
};

const crearMetodoPago = (datos, callback) => {
    db.query('INSERT INTO metodos_pago (nombre) VALUES (?)', [datos.nombre], callback);
};

const actualizarMetodoPago = (id, datos, callback) => {
    db.query('UPDATE metodos_pago SET nombre = ? WHERE id_metodos_pago = ?', [datos.nombre, id], callback);
};

const eliminarMetodoPago = (id, callback) => {
    db.query('DELETE FROM metodos_pago WHERE id_metodos_pago = ?', [id], callback);
};

module.exports = { obtenerMetodosPago, obtenerMetodoPagoPorId, crearMetodoPago, actualizarMetodoPago, eliminarMetodoPago };