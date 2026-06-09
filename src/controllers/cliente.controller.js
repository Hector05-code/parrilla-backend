const Cliente = require('../models/cliente.model');

const listarClientes = (req, res) => {
    Cliente.obtenerClientes((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

const obtenerCliente = (req, res) => {
    const { id } = req.params;
    Cliente.obtenerClientePorId(id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        res.json(results[0]);
    });
};

const crearCliente = (req, res) => {
    Cliente.crearCliente(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ mensaje: 'Cliente creado', id: result.insertId });
    });
};

const actualizarCliente = (req, res) => {
    const { id } = req.params;
    Cliente.actualizarCliente(id, req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Cliente actualizado' });
    });
};

const eliminarCliente = (req, res) => {
    const { id } = req.params;
    Cliente.eliminarCliente(id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Cliente eliminado' });
    });
};

const buscarPorCedula = (req, res) => {
    const { cedula } = req.params;
    Cliente.buscarClientePorCedula(cedula, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        res.json(results[0]);
    });
};

module.exports = { listarClientes, obtenerCliente, crearCliente, actualizarCliente, eliminarCliente, buscarPorCedula };