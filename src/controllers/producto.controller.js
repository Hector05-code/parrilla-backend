const Producto = require('../models/producto.model');

const listarProductos = (req, res) => {
    Producto.obtenerProductos((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

const obtenerProducto = (req, res) => {
    const { id } = req.params;
    Producto.obtenerProductoPorId(id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json(results[0]);
    });
};

const crearProducto = (req, res) => {
    Producto.crearProducto(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ mensaje: 'Producto creado', id: result.insertId });
    });
};

const actualizarProducto = (req, res) => {
    const { id } = req.params;
    Producto.actualizarProducto(id, req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Producto actualizado' });
    });
};

const eliminarProducto = (req, res) => {
    const { id } = req.params;
    Producto.eliminarProducto(id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Producto eliminado' });
    });
};

module.exports = { listarProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto };