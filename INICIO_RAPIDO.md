# Que tal profesor, por aca una guía rápida de inicio - Agencia de Viajes Oeste

## Instalación Rápida 
### 1. Configurar GitHub OAuth

Sigue la guía completa en `GITHUB_OAUTH_SETUP.md` o:

1. Ve a https://github.com/settings/developers
2. Click "OAuth Apps" → "New OAuth App"
3. Completa:
   - Homepage URL: `http://localhost:3000`
   - Callback URL: `http://localhost:5000/api/auth/github/callback`
4. Copia el Client ID y Client Secret

### 2. Instalar Backend

```bash
cd backend
npm install
```

Edita el archivo `.env` con tus credenciales de GitHub:
```env
GITHUB_CLIENT_ID=tu_client_id
GITHUB_CLIENT_SECRET=tu_client_secret
```

### 3. Instalar Frontend

```bash
cd frontend
npm install
```

### 4. Ejecutar

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 5. Probar

Abre http://localhost:3000

#### Prueba Autenticación Local:
1. Click "Regístrate aquí"
2. Ingresa email y contraseña
3. Vuelve al login e inicia sesión

#### Prueba Autenticación GitHub:
1. Click "Continuar con GitHub"
2. Autoriza la aplicación
3. Serás redirigido a la página de bienvenida

## Comandos Útiles

```bash
# Reiniciar base de datos (eliminar usuarios)
rm backend/data/users.json
echo '{"users": []}' > backend/data/users.json

# Ver logs del servidor
cd backend && npm start

# Modo desarrollo con auto-reload
cd backend && npm run dev  # Requiere: npm install -g nodemon
```

## Estructura de Archivos Clave

```
agencia-viajes-oeste/
├── README.md                    # Documentación completa
├── GITHUB_OAUTH_SETUP.md        # Guía GitHub OAuth
│
├── backend/
│   ├── .env                     # Configuración (EDITAR AQUÍ)
│   ├── server.js                # Servidor principal
│   ├── controllers/             # Lógica de autenticación
│   ├── routes/auth.js           # Rutas de API
│   └── data/users.json          # Base de datos
│
└── frontend/
    ├── src/
    │   ├── pages/               # Páginas de la app
    │   │   ├── Home.js          # Login principal
    │   │   ├── Register.js      # Registro
    │   │   ├── Welcome.js       # Página protegida
    │   │   └── AuthCallback.js  # Callback GitHub
    │   └── services/
    │       └── authService.js   # Servicio de autenticación
    └── package.json
```

## Endpoints de la API

```
POST   /api/auth/register        # Registrar usuario
POST   /api/auth/login           # Login local
GET    /api/auth/profile         # Obtener perfil (requiere token)
GET    /api/auth/github          # Iniciar OAuth GitHub
GET    /api/auth/github/callback # Callback GitHub
```

## Credenciales de Prueba

Después de registrarte, puedes usar:
- Email: tu_email@ejemplo.com
- Password: tu_contraseña

O simplemente usa GitHub OAuth (recomendado).
