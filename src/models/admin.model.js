const db = require('../config/db');

const obtenerAdmins = (callback) => {
    db.query('SELECT * FROM admin', callback);
};

const obtenerAdminPorId = (id, callback) => {
    db.query('SELECT * FROM admin WHERE id_usuario = ?', [id], callback);
};

const crearAdmin = (datos, callback) => {
    const sql = `INSERT INTO admin (nombre, correo, contraseña) VALUES (?, ?, ?)`;
    db.query(sql, [datos.nombre, datos.correo, datos.contraseña], callback);
};

const actualizarAdmin = (id, datos, callback) => {
    const sql = `UPDATE admin SET nombre = ?, correo = ?, contraseña = ? WHERE id_usuario = ?`;
    db.query(sql, [datos.nombre, datos.correo, datos.contraseña, id], callback);
};

const eliminarAdmin = (id, callback) => {
    db.query('DELETE FROM admin WHERE id_usuario = ?', [id], callback);
};

module.exports = { obtenerAdmins, obtenerAdminPorId, crearAdmin, actualizarAdmin, eliminarAdmin };