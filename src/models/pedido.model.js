const db = require('../config/db');

const obtenerPedidos = (callback) => {
    db.query('SELECT * FROM pedidos', callback);
};

const obtenerPedidoPorId = (id, callback) => {
    db.query('SELECT * FROM pedidos WHERE id_pedidos = ?', [id], callback);
};

const crearPedido = (datos, callback) => {
    const sql = `
        INSERT INTO pedidos (id_clientes, id_metodos_pago, fecha, total, total_bs, estado, referencia_pago, ref_foto, tipo_pedido, direccion)
        VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [
        datos.id_clientes,
        datos.id_metodos_pago,
        datos.total,
        datos.total_bs || 0,
        datos.estado,
        datos.referencia_pago,
        datos.ref_foto || null,
        datos.tipo_pedido || 'sitio',
        datos.tipo_pedido === 'delivery' ? datos.direccion : null
    ], callback);
};

const actualizarPedido = (id, datos, callback) => {
    const sql = `
        UPDATE pedidos
        SET id_clientes = ?, id_metodos_pago = ?, total = ?, total_bs = ?, estado = ?, referencia_pago = ?, ref_foto = ?, tipo_pedido = ?, direccion = ?
        WHERE id_pedidos = ?
    `;
    db.query(sql, [
        datos.id_clientes,
        datos.id_metodos_pago,
        datos.total,
        datos.total_bs || 0,
        datos.estado,
        datos.referencia_pago,
        datos.ref_foto || null,
        datos.tipo_pedido || 'sitio',
        datos.direccion || null,
        id
    ], callback);
};

const eliminarPedido = (id, callback) => {
    db.query('DELETE FROM pedidos WHERE id_pedidos = ?', [id], callback);
};

const obtenerPedidosPorCliente = (id_cliente, callback) => {
    db.query('SELECT * FROM pedidos WHERE id_clientes = ? ORDER BY fecha DESC', [id_cliente], callback);
};

const buscarClientePorCedula = (cedula, callback) => {
    db.query('SELECT * FROM clientes WHERE cedula = ?', [cedula], callback);
};

module.exports = { obtenerPedidos, obtenerPedidoPorId, crearPedido, actualizarPedido, eliminarPedido, obtenerPedidosPorCliente };