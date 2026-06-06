const db = require('../config/db');

const obtenerConfiguracion = (callback) => {
    db.query('SELECT * FROM configuracion', callback);
};

const obtenerConfiguracionPorId = (id, callback) => {
    db.query('SELECT * FROM configuracion WHERE id_configuracion = ?', [id], callback);
};

const crearConfiguracion = (datos, callback) => {
    const sql = `INSERT INTO configuracion (tasa_dolar, fecha_actualizacion) VALUES (?, NOW())`;
    db.query(sql, [datos.tasa_dolar], callback);
};

const actualizarConfiguracion = (id, datos, callback) => {
    const sql = `UPDATE configuracion SET tasa_dolar = ?, fecha_actualizacion = NOW() WHERE id_configuracion = ?`;
    db.query(sql, [datos.tasa_dolar, id], callback);
};

const eliminarConfiguracion = (id, callback) => {
    db.query('DELETE FROM configuracion WHERE id_configuracion = ?', [id], callback);
};

module.exports = { obtenerConfiguracion, obtenerConfiguracionPorId, crearConfiguracion, actualizarConfiguracion, eliminarConfiguracion };