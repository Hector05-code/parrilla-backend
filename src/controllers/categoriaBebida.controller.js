const CategoriaBebida = require('../models/categoriaBebida.model');

const listarCategorias = (req, res) => {
    CategoriaBebida.obtenerCategorias((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

const obtenerCategoria = (req, res) => {
    const { id } = req.params;
    CategoriaBebida.obtenerCategoriaPorId(id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        res.json(results[0]);
    });
};

const crearCategoria = (req, res) => {
    CategoriaBebida.crearCategoria(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ mensaje: 'Categoría creada', id: result.insertId });
    });
};

const actualizarCategoria = (req, res) => {
    const { id } = req.params;
    CategoriaBebida.actualizarCategoria(id, req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Categoría actualizada' });
    });
};

const eliminarCategoria = (req, res) => {
    const { id } = req.params;
    CategoriaBebida.eliminarCategoria(id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Categoría eliminada' });
    });
};

module.exports = { listarCategorias, obtenerCategoria, crearCategoria, actualizarCategoria, eliminarCategoria };