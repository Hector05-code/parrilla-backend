const db = require('../config/db');

const obtenerDetalles = (callback) => {
    db.query('SELECT * FROM detalle_pedido', callback);
};

const obtenerDetallePorId = (id, callback) => {
    db.query('SELECT * FROM detalle_pedido WHERE id_detalle_pedido = ?', [id], callback);
};

const obtenerDetallesPorPedido = (id_pedido, callback) => {
    db.query('SELECT * FROM detalle_pedido WHERE id_pedidos = ?', [id_pedido], callback);
};

const crearDetalle = (datos, callback) => {
    const sql = `
        INSERT INTO detalle_pedido (id_pedidos, id_producto, cantidad, precio_unitario)
        VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [datos.id_pedidos, datos.id_producto, datos.cantidad, datos.precio_unitario], callback);
};

const actualizarDetalle = (id, datos, callback) => {
    const sql = `
        UPDATE detalle_pedido
        SET id_pedidos = ?, id_producto = ?, cantidad = ?, precio_unitario = ?
        WHERE id_detalle_pedido = ?
    `;
    db.query(sql, [datos.id_pedidos, datos.id_producto, datos.cantidad, datos.precio_unitario, id], callback);
};

const eliminarDetalle = (id, callback) => {
    db.query('DELETE FROM detalle_pedido WHERE id_detalle_pedido = ?', [id], callback);
};

module.exports = { obtenerDetalles, obtenerDetallePorId, obtenerDetallesPorPedido, crearDetalle, actualizarDetalle, eliminarDetalle };