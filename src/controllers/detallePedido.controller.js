const DetallePedido = require('../models/detallePedido.model');

const listarDetalles = (req, res) => {
    DetallePedido.obtenerDetalles((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

const obtenerDetalle = (req, res) => {
    const { id } = req.params;
    DetallePedido.obtenerDetallePorId(id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ mensaje: 'Detalle no encontrado' });
        res.json(results[0]);
    });
};

const obtenerDetallesPorPedido = (req, res) => {
    const { id } = req.params;
    DetallePedido.obtenerDetallesPorPedido(id, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

const crearDetalle = (req, res) => {
    DetallePedido.crearDetalle(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ mensaje: 'Detalle creado', id: result.insertId });
    });
};

const actualizarDetalle = (req, res) => {
    const { id } = req.params;
    DetallePedido.actualizarDetalle(id, req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Detalle actualizado' });
    });
};

const eliminarDetalle = (req, res) => {
    const { id } = req.params;
    DetallePedido.eliminarDetalle(id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Detalle eliminado' });
    });
};

module.exports = { listarDetalles, obtenerDetalle, obtenerDetallesPorPedido, crearDetalle, actualizarDetalle, eliminarDetalle };