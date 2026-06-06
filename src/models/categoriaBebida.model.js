const db = require('../config/db');

const obtenerCategorias = (callback) => {
    db.query('SELECT * FROM categoria_bebidas', callback);
};

const obtenerCategoriaPorId = (id, callback) => {
    db.query('SELECT * FROM categoria_bebidas WHERE id_categoria_bebidas = ?', [id], callback);
};

const crearCategoria = (datos, callback) => {
    db.query('INSERT INTO categoria_bebidas (nombre_categoria) VALUES (?)', [datos.nombre_categoria], callback);
};

const actualizarCategoria = (id, datos, callback) => {
    db.query('UPDATE categoria_bebidas SET nombre_categoria = ? WHERE id_categoria_bebidas = ?', [datos.nombre_categoria, id], callback);
};

const eliminarCategoria = (id, callback) => {
    db.query('DELETE FROM categoria_bebidas WHERE id_categoria_bebidas = ?', [id], callback);
};

module.exports = { obtenerCategorias, obtenerCategoriaPorId, crearCategoria, actualizarCategoria, eliminarCategoria };