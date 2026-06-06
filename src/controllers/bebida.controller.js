const Bebida = require('../models/bebida.model');

const listarBebidas = (req, res) => {
    Bebida.obtenerBebidas((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

const obtenerBebida = (req, res) => {
    const { id } = req.params;
    Bebida.obtenerBebidaPorId(id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ mensaje: 'Bebida no encontrada' });
        res.json(results[0]);
    });
};

const crearBebida = (req, res) => {
    Bebida.crearBebida(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ mensaje: 'Bebida creada', id: result.insertId });
    });
};

const actualizarBebida = (req, res) => {
    const { id } = req.params;
    Bebida.actualizarBebida(id, req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Bebida actualizada' });
    });
};

const eliminarBebida = (req, res) => {
    const { id } = req.params;
    Bebida.eliminarBebida(id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Bebida eliminada' });
    });
};

module.exports = { listarBebidas, obtenerBebida, crearBebida, actualizarBebida, eliminarBebida };