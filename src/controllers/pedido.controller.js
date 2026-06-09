const Pedido = require('../models/pedido.model');
const db = require('../config/db');  // ← AGREGÁ ESTA LÍNEA

const listarPedidos = (req, res) => {
    Pedido.obtenerPedidos((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

const obtenerPedido = (req, res) => {
    const { id } = req.params;
    Pedido.obtenerPedidoPorId(id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        res.json(results[0]);
    });
};

const crearPedido = (req, res) => {
    Pedido.crearPedido(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ mensaje: 'Pedido creado', id: result.insertId });
    });
};

const actualizarPedido = (req, res) => {
    const { id } = req.params;
    Pedido.actualizarPedido(id, req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Pedido actualizado' });
    });
};

const eliminarPedido = (req, res) => {
    const { id } = req.params;
    Pedido.eliminarPedido(id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Pedido eliminado' });
    });
};

const obtenerPedidosCliente = (req, res) => {
    const { id } = req.params;
    Pedido.obtenerPedidosPorCliente(id, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

const cambiarEstado = (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    const estadosValidos = ['pendiente', 'preparando', 'entregado', 'cancelado'];
    if (!estadosValidos.includes(estado)) {
        return res.status(400).json({ mensaje: 'Estado inválido' });
    }

    db.query('UPDATE pedidos SET estado = ? WHERE id_pedidos = ?', [estado, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Estado actualizado' });
    });
};


module.exports = { listarPedidos, obtenerPedido, crearPedido, actualizarPedido, eliminarPedido, obtenerPedidosCliente, cambiarEstado };