const Configuracion = require('../models/configuracion.model');

const listarConfiguracion = (req, res) => {
    Configuracion.obtenerConfiguracion((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

const obtenerConfiguracion = (req, res) => {
    const { id } = req.params;
    Configuracion.obtenerConfiguracionPorId(id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ mensaje: 'Configuración no encontrada' });
        res.json(results[0]);
    });
};

const crearConfiguracion = (req, res) => {
    Configuracion.crearConfiguracion(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ mensaje: 'Configuración creada', id: result.insertId });
    });
};

const actualizarConfiguracion = (req, res) => {
    const { id } = req.params;
    Configuracion.actualizarConfiguracion(id, req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Configuración actualizada' });
    });
};

const eliminarConfiguracion = (req, res) => {
    const { id } = req.params;
    Configuracion.eliminarConfiguracion(id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Configuración eliminada' });
    });
};

module.exports = { listarConfiguracion, obtenerConfiguracion, crearConfiguracion, actualizarConfiguracion, eliminarConfiguracion };