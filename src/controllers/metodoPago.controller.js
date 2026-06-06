const MetodoPago = require('../models/metodoPago.model');

const listarMetodosPago = (req, res) => {
    MetodoPago.obtenerMetodosPago((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

const obtenerMetodoPago = (req, res) => {
    const { id } = req.params;
    MetodoPago.obtenerMetodoPagoPorId(id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ mensaje: 'Método de pago no encontrado' });
        res.json(results[0]);
    });
};

const crearMetodoPago = (req, res) => {
    MetodoPago.crearMetodoPago(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ mensaje: 'Método de pago creado', id: result.insertId });
    });
};

const actualizarMetodoPago = (req, res) => {
    const { id } = req.params;
    MetodoPago.actualizarMetodoPago(id, req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Método de pago actualizado' });
    });
};

const eliminarMetodoPago = (req, res) => {
    const { id } = req.params;
    MetodoPago.eliminarMetodoPago(id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Método de pago eliminado' });
    });
};

module.exports = { listarMetodosPago, obtenerMetodoPago, crearMetodoPago, actualizarMetodoPago, eliminarMetodoPago };