require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const solicitudesRoutes = require('./routes/solicitudes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'API Agencia de Viajes Oeste',
    version: '1.0.0',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      profile: 'GET /api/auth/profile (requiere token)',
      githubLogin: 'GET /api/auth/github',
      githubCallback: 'GET /api/auth/github/callback',
      solicitudes: 'GET /api/solicitudes (requiere token)',
      crearSolicitud: 'POST /api/solicitudes (requiere token)',
      solicitudById: 'GET /api/solicitudes/:id (requiere token)'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/solicitudes', solicitudesRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});