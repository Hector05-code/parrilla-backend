const Parrilla = require('../models/parrilla.model');

const listarParrillas = (req, res) => {
    Parrilla.obtenerParrillas((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

const obtenerParrilla = (req, res) => {
    const { id } = req.params;
    Parrilla.obtenerParrillaPorId(id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ mensaje: 'Parrilla no encontrada' });
        res.json(results[0]);
    });
};

const crearParrilla = (req, res) => {
    Parrilla.crearParrilla(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ mensaje: 'Parrilla creada', id: result.insertId });
    });
};

const actualizarParrilla = (req, res) => {
    const { id } = req.params;
    Parrilla.actualizarParrilla(id, req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Parrilla actualizada' });
    });
};

const eliminarParrilla = (req, res) => {
    const { id } = req.params;
    Parrilla.eliminarParrilla(id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Parrilla eliminada' });
    });
};

module.exports = { listarParrillas, obtenerParrilla, crearParrilla, actualizarParrilla, eliminarParrilla };