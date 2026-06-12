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

// producto.model.js - reemplazar solo la función eliminarProducto

const eliminarProducto = (id, callback) => {
    // 1. Eliminar de detalle_pedido
    db.query('DELETE FROM detalle_pedido WHERE id_producto = ?', [id], (err) => {
        if (err) return callback(err);

        // 2. Eliminar de bebidas
        db.query('DELETE FROM bebidas WHERE fk_producto_bebidas = ?', [id], (err) => {
            if (err) return callback(err);

            // 3. Eliminar de parrilla
            db.query('DELETE FROM parrilla WHERE id_producto = ?', [id], (err) => {
                if (err) return callback(err);

                // 4. Finalmente eliminar el producto
                db.query('DELETE FROM producto WHERE id_producto = ?', [id], callback);
            });
        });
    });
};

module.exports = { obtenerProductos, obtenerProductoPorId, crearProducto, actualizarProducto, eliminarProducto };