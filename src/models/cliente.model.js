const db = require('../config/db');

const obtenerClientes = (callback) => {
    db.query('SELECT * FROM clientes', callback);
};

const obtenerClientePorId = (id, callback) => {
    db.query('SELECT * FROM clientes WHERE id_clientes = ?', [id], callback);
};

const crearCliente = (datos, callback) => {
    const sql = `
        INSERT INTO clientes (nombre, apellido, cedula, telefono, \`fecha de registro\`)
        VALUES (?, ?, ?, ?, NOW())
    `;
    db.query(sql, [datos.nombre, datos.apellido, datos.cedula, datos.telefono], callback);
};

const actualizarCliente = (id, datos, callback) => {
    const sql = `
        UPDATE clientes
        SET nombre = ?, apellido = ?, cedula = ?, telefono = ?
        WHERE id_clientes = ?
    `;
    db.query(sql, [datos.nombre, datos.apellido, datos.cedula, datos.telefono, id], callback);
};

const eliminarCliente = (id, callback) => {
    db.query('DELETE FROM clientes WHERE id_clientes = ?', [id], callback);
};

const buscarClientePorCedula = (cedula, callback) => {
    db.query('SELECT * FROM clientes WHERE cedula = ?', [cedula], callback);
};

module.exports = { obtenerClientes, obtenerClientePorId, crearCliente, actualizarCliente, eliminarCliente, buscarClientePorCedula };

