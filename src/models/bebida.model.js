const db = require('../config/db');

const obtenerBebidas = (callback) => {
    db.query('SELECT * FROM bebidas', callback);
};

const obtenerBebidaPorId = (id, callback) => {
    db.query('SELECT * FROM bebidas WHERE id_bebidas = ?', [id], callback);
};

const crearBebida = (datos, callback) => {
    const sql = `INSERT INTO bebidas (fk_producto_bebidas, nombre, id_categoria_bebidas, stock, imagen) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [
        datos.fk_producto_bebidas,
        datos.nombre,
        datos.id_categoria_bebidas || 1,
        datos.stock || 0,
        datos.imagen || null
    ], callback);
};

const actualizarBebida = (id, datos, callback) => {
    const sql = `UPDATE bebidas SET fk_producto_bebidas = ?, nombre = ?, id_categoria_bebidas = ?, stock = ?, imagen = ? WHERE id_bebidas = ?`;
    db.query(sql, [
        datos.fk_producto_bebidas,
        datos.nombre,
        datos.id_categoria_bebidas || 1,
        datos.stock || 0,
        datos.imagen || null,
        id
    ], callback);
};

const eliminarBebida = (id, callback) => {
    db.query('DELETE FROM bebidas WHERE id_bebidas = ?', [id], callback);
};

module.exports = { obtenerBebidas, obtenerBebidaPorId, crearBebida, actualizarBebida, eliminarBebida };