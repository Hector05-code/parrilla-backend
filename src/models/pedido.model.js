const db = require('../config/db');

const obtenerPedidos = (callback) => {
    db.query('SELECT * FROM pedidos', callback);
};

const obtenerPedidoPorId = (id, callback) => {
    db.query('SELECT * FROM pedidos WHERE id_pedidos = ?', [id], callback);
};

const crearPedido = (datos, callback) => {
    const sql = `
        INSERT INTO pedidos (id_clientes, id_metodos_pago, fecha, total, total_bs, estado, referencia_pago, ref_foto)
        VALUES (?, ?, NOW(), ?, ?, ?, ?, ?)
    `;
    db.query(sql, [
        datos.id_clientes,
        datos.id_metodos_pago,
        datos.total,
        datos.total_bs || 0,
        datos.estado,
        datos.referencia_pago,
        datos.ref_foto || null
    ], callback);
};

const actualizarPedido = (id, datos, callback) => {
    const sql = `
        UPDATE pedidos
        SET id_clientes = ?, id_metodos_pago = ?, total = ?, total_bs = ?, estado = ?, referencia_pago = ?, ref_foto = ?
        WHERE id_pedidos = ?
    `;
    db.query(sql, [datos.id_clientes, datos.id_metodos_pago, datos.total, datos.total_bs, datos.estado, datos.referencia_pago, datos.ref_foto, id], callback);
};

const eliminarPedido = (id, callback) => {
    db.query('DELETE FROM pedidos WHERE id_pedidos = ?', [id], callback);
};

const obtenerPedidosPorCliente = (id_cliente, callback) => {
    db.query('SELECT * FROM pedidos WHERE id_clientes = ? ORDER BY fecha DESC', [id_cliente], callback);
};

module.exports = { obtenerPedidos, obtenerPedidoPorId, crearPedido, actualizarPedido, eliminarPedido, obtenerPedidosPorCliente };