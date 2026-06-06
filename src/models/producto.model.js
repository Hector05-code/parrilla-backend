const db = require('../config/db');

const obtenerProductos = (callback) => {
    db.query(`
        SELECT p.*, b.imagen 
        FROM producto p
        LEFT JOIN bebidas b ON b.fk_producto_bebidas = p.id_producto
    `, callback);
};

const obtenerProductoPorId = (id, callback) => {
    db.query('SELECT * FROM producto WHERE id_producto = ?', [id], callback);
};

const crearProducto = (datos, callback) => {
    const sql = `INSERT INTO producto (nombre, precio, tipo) VALUES (?, ?, ?)`;
    db.query(sql, [datos.nombre, datos.precio, datos.tipo], callback);
};

const actualizarProducto = (id, datos, callback) => {
    const sql = `UPDATE producto SET nombre = ?, precio = ?, tipo = ? WHERE id_producto = ?`;
    db.query(sql, [datos.nombre, datos.precio, datos.tipo, id], callback);
};

const eliminarProducto = (id, callback) => {
    db.query('DELETE FROM producto WHERE id_producto = ?', [id], callback);
};

module.exports = { obtenerProductos, obtenerProductoPorId, crearProducto, actualizarProducto, eliminarProducto };