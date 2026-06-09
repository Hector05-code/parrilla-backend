const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Auth = require('../models/auth.model');
const db = require('../config/db');

const SECRET = 'parrilla_secret_key';

// LOGIN
const login = (req, res) => {
    const { correo, contraseña } = req.body;

    // Primero busca en admin
    Auth.buscarAdmin(correo, (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length > 0) {
            const admin = results[0];
            const valida = bcrypt.compareSync(contraseña, admin.contraseña);

            if (!valida) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

            const token = jwt.sign(
                { id: admin.id_usuario, rol: 'admin' },
                SECRET,
                { expiresIn: '8h' }
            );

            return res.json({ token, rol: 'admin', nombre: admin.nombre });
        }

        // Si no es admin busca en clientes
        Auth.buscarCliente(correo, (err, results) => {
            if (err) return res.status(500).json(err);
            if (results.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

            const cliente = results[0];
            const valida = bcrypt.compareSync(contraseña, cliente.contraseña);

            if (!valida) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

            const token = jwt.sign(
                { id: cliente.id_clientes, rol: 'cliente' },
                SECRET,
                { expiresIn: '8h' }
            );

            return res.json({ token, rol: 'cliente', nombre: cliente.nombre, id: cliente.id_clientes });
        });
    });
};

// REGISTRO CLIENTE
const registro = (req, res) => {
    const { nombre, apellido, cedula, telefono, correo, contraseña } = req.body;

    Auth.buscarCliente(correo, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length > 0) return res.status(400).json({ mensaje: 'El correo ya está registrado' });

        const hash = bcrypt.hashSync(contraseña, 10);

        const sql = `
            INSERT INTO clientes (nombre, apellido, cedula, telefono, correo, contraseña, \`fecha de registro\`)
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        `;

        db.query(sql, [nombre, apellido, cedula, telefono, correo, hash], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ mensaje: 'Cliente registrado', id: result.insertId });
        });
    });
};

// CREAR ADMIN
const crearAdmin = (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    const hash = bcrypt.hashSync(contraseña, 10);

    const sql = `INSERT INTO admin (nombre, correo, contraseña) VALUES (?, ?, ?)`;
    db.query(sql, [nombre, correo, hash], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ mensaje: 'Admin creado', id: result.insertId });
    });
};


// LOGIN EMPLEADO
const loginEmpleado = (req, res) => {
    const { usuario, contraseña } = req.body;

    db.query('SELECT * FROM empleados WHERE usuario = ?', [usuario], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ mensaje: 'Empleado no encontrado' });

        const empleado = results[0];

        let valida = false;
        if (empleado.contraseña && empleado.contraseña.startsWith('$2b$')) {
            valida = bcrypt.compareSync(contraseña, empleado.contraseña);
        } else {
            valida = contraseña === empleado.contraseña;
        }

        if (!valida) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

        const token = jwt.sign(
            { id: empleado.id_empleados, rol: 'empleado' },
            SECRET,
            { expiresIn: '8h' }
        );

        return res.json({ token, rol: 'empleado', nombre: empleado.usuario, id: empleado.id_empleados });
    });
};

// CREAR EMPLEADO
const crearEmpleado = (req, res) => {
    const { usuario, contraseña } = req.body;
    const hash = bcrypt.hashSync(contraseña, 10);
    db.query('INSERT INTO empleados (usuario, contraseña) VALUES (?, ?)', [usuario, hash], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ mensaje: 'Empleado creado', id: result.insertId });
    });
};

module.exports = { login, registro, crearAdmin, loginEmpleado, crearEmpleado };