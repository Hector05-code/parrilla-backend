const Admin = require('../models/admin.model');

const listarAdmins = (req, res) => {
    Admin.obtenerAdmins((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

const obtenerAdmin = (req, res) => {
    const { id } = req.params;
    Admin.obtenerAdminPorId(id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ mensaje: 'Admin no encontrado' });
        res.json(results[0]);
    });
};

const crearAdmin = (req, res) => {
    Admin.crearAdmin(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ mensaje: 'Admin creado', id: result.insertId });
    });
};

const actualizarAdmin = (req, res) => {
    const { id } = req.params;
    Admin.actualizarAdmin(id, req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Admin actualizado' });
    });
};

const eliminarAdmin = (req, res) => {
    const { id } = req.params;
    Admin.eliminarAdmin(id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Admin eliminado' });
    });
};

module.exports = { listarAdmins, obtenerAdmin, crearAdmin, actualizarAdmin, eliminarAdmin };