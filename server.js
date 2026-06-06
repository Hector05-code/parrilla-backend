const express = require('express');
const cors = require('cors');

// 1. Primero los requires de rutas
const productoRoutes = require('./src/routes/producto.routes');
const clienteRoutes = require('./src/routes/cliente.routes');
const pedidoRoutes = require('./src/routes/pedido.routes');
const detallePedidoRoutes = require('./src/routes/detallePedido.routes');
const metodoPagoRoutes = require('./src/routes/metodoPago.routes');
const categoriaBebidaRoutes = require('./src/routes/categoriaBebida.routes');
const bebidaRoutes = require('./src/routes/bebida.routes');
const parrillaRoutes = require('./src/routes/parrilla.routes');
const adminRoutes = require('./src/routes/admin.routes');
const configuracionRoutes = require('./src/routes/configuracion.routes');
const authRoutes = require('./src/routes/auth.routes');






// 2. Luego crear app
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'authorization']
}));
app.use(express.json());


const multer = require('multer');
const path = require('path');

// Servir imágenes estáticas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    require('fs').mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Ruta para subir imagen
app.post('/upload', upload.single('imagen'), (req, res) => {
  if (!req.file) return res.status(400).json({ mensaje: 'No se subió imagen' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

app.get('/', (req, res) => {
    res.send('🚀 Backend de Parrilla funcionando');
});

// 3. Después usar las rutas
app.use('/producto', productoRoutes);
app.use('/cliente', clienteRoutes);
app.use('/pedido', pedidoRoutes);
app.use('/detalle', detallePedidoRoutes);
app.use('/metodopago', metodoPagoRoutes);
app.use('/categoria', categoriaBebidaRoutes);
app.use('/bebida', bebidaRoutes);
app.use('/parrilla', parrillaRoutes);
app.use('/admin', adminRoutes);
app.use('/configuracion', configuracionRoutes);
app.use('/auth', authRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});