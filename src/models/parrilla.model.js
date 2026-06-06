const db = require('../config/db');

const obtenerParrillas = (callback) => {
    db.query('SELECT * FROM parrilla', callback);
};

const obtenerParrillaPorId = (id, callback) => {
    db.query('SELECT * FROM parrilla WHERE id_parrilla = ?', [id], callback);
};

const crearParrilla = (datos, callback) => {
    const sql = `INSERT INTO parrilla (id_producto, tamaño) VALUES (?, ?)`;
    db.query(sql, [datos.id_producto, datos.tamaño], callback);
};

const actualizarParrilla = (id, datos, callback) => {
    const sql = `UPDATE parrilla SET id_producto = ?, tamaño = ? WHERE id_parrilla = ?`;
    db.query(sql, [datos.id_producto, datos.tamaño, id], callback);
};

const eliminarParrilla = (id, callback) => {
    db.query('DELETE FROM parrilla WHERE id_parrilla = ?', [id], callback);
};

module.exports = { obtenerParrillas, obtenerParrillaPorId, crearParrilla, actualizarParrilla, eliminarParrilla };