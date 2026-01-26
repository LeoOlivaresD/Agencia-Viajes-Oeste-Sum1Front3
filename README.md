# Agencia de Viajes Oeste - Portal de Gestión

Proyecto de autenticación desarrollado para el curso Desarrollo Frontend III de Duoc UC.

## 🚀 Tecnologías Utilizadas

### Backend
- Node.js + Express
- JWT (jsonwebtoken)
- bcryptjs
- GitHub OAuth 2.0
- Almacenamiento en JSON

### Frontend  
- ⚡ **React 18 + Vite** (Ultra rápido)
- React Router v6
- Axios
- CSS3

## ✨ Características

- ✅ Registro de usuarios con validación
- ✅ Login local con encriptación de contraseñas (bcrypt)
- ✅ Autenticación OAuth 2.0 con GitHub
- ✅ Tokens JWT para sesiones seguras
- ✅ **Persistencia de sesión** (no necesitas volver a loguearte)
- ✅ Página de bienvenida con datos completos del usuario
- ✅ **Visualización del Token JWT** con botón copiar
- ✅ **ID de usuario** con botón copiar
- ✅ Cierre de sesión funcional
- ✅ Diseño responsive y moderno

## 📁 Estructura del Proyecto

```
agencia-viajes-oeste/
├── backend/              # Servidor Node.js + Express
│   ├── controllers/      # Lógica de autenticación
│   ├── middleware/       # Middleware JWT
│   ├── routes/          # Rutas de API
│   ├── utils/           # Utilidades
│   ├── data/            # Base de datos JSON
│   ├── .env             # Variables de entorno (TUS CREDENCIALES)
│   └── server.js        # Servidor principal
│
└── frontend/            # React + Vite
    ├── index.html       # HTML principal
    ├── vite.config.js   # Configuración de Vite
    ├── src/
    │   ├── pages/       # Componentes de páginas (.jsx)
    │   ├── services/    # Servicios de API
    │   ├── App.jsx      # Componente principal
    │   └── main.jsx     # Punto de entrada
    └── package.json
```

## 🔧 Instalación y Configuración

### 1. Instalar Backend

```bash
cd backend
npm install
```

**El archivo `.env` ya contiene TUS credenciales de GitHub:**
- Client ID: `Ov23li1l8UR1LlXmKe1w`
- Client Secret: `5e31a81a158e94ace44d6dbba96058d4959db559`

⚠️ **IMPORTANTE**: Estas credenciales están expuestas. Te recomiendo regenerarlas en GitHub después de probar.

### 2. Instalar Frontend

```bash
cd frontend
npm install
```

## 🚀 Ejecutar el Proyecto

### Terminal 1 - Backend:
```bash
cd backend
npm start
```
Servidor corriendo en: `http://localhost:5000`

### Terminal 2 - Frontend (Vite):
```bash
cd frontend
npm run dev
```
Aplicación corriendo en: `http://localhost:3000`

## 🎯 Probar la Aplicación

### Opción 1: Registro Local
1. Ve a `http://localhost:3000`
2. Click en "Regístrate aquí"
3. Ingresa email y contraseña (mín. 6 caracteres)
4. Vuelve al login e inicia sesión

### Opción 2: GitHub OAuth
1. Ve a `http://localhost:3000`
2. Click en "Continuar con GitHub"
3. Autoriza la aplicación en GitHub
4. Serás redirigido a tu perfil

### Ver información completa:
En la página de bienvenida verás:
- 📋 ID de usuario (con botón copiar)
- 📧 Email
- 👤 Nombre (si usaste GitHub)
- 🔐 Método de autenticación
- 📅 Fecha de registro
- 🔑 **Token JWT** completo (con mostrar/ocultar y copiar)

## 🔄 Persistencia de Sesión

**Novedad**: La sesión se mantiene automáticamente:
- Si cierras el navegador y vuelves a abrir
- Si vas directamente a `http://localhost:3000`
- El sistema detecta tu sesión activa y te redirige a `/welcome`
- Solo necesitas volver a loguearte si:
  - Cierras sesión manualmente
  - El token expira (24 horas)
  - Limpias el localStorage

## 📡 Endpoints de la API

```
POST   /api/auth/register        # Registrar usuario
POST   /api/auth/login           # Login local
GET    /api/auth/profile         # Obtener perfil (requiere token)
GET    /api/auth/github          # Iniciar OAuth GitHub
GET    /api/auth/github/callback # Callback GitHub
```

## ⚡ Vite vs Create React App

| Característica | Create React App | ⚡ Vite |
|----------------|------------------|---------|
| Tiempo de inicio | ~30 segundos | ~1 segundo |
| Hot Reload | Lento | Instantáneo |
| Variables env | `REACT_APP_` | `VITE_` |
| Acceso vars | `process.env.X` | `import.meta.env.X` |
| Build | Lento | Ultra rápido |
| Comando dev | `npm start` | `npm run dev` |

## 🛠️ Comandos Útiles

### Desarrollo
```bash
# Backend con auto-reload
cd backend && npm run dev

# Frontend con Vite
cd frontend && npm run dev
```

### Producción
```bash
# Build del frontend
cd frontend && npm run build

# Preview del build
cd frontend && npm run preview
```

### Limpiar base de datos
```bash
rm backend/data/users.json
echo '{"users": []}' > backend/data/users.json
```

## 🔒 Seguridad

⚠️ **MUY IMPORTANTE**:
- Las credenciales de GitHub en este proyecto están expuestas
- **Regenera el Client Secret** en GitHub inmediatamente:
  1. Ve a https://github.com/settings/developers
  2. Click en tu OAuth App
  3. "Generate a new client secret"
  4. Actualiza `.env` con el nuevo secret
- NUNCA subas el archivo `.env` a GitHub
- El `.gitignore` ya está configurado para protegerlo

## 📝 Notas de Desarrollo

### Diferencias clave con Vite:
1. Los archivos React usan extensión `.jsx`
2. Variables de entorno: `import.meta.env.VITE_X`
3. Punto de entrada: `main.jsx` en lugar de `index.js`
4. HTML base: `index.html` en la raíz (no en public/)

## 🎓 Entrega del Proyecto

Para entregar en el AVA:

1. Sube el proyecto a GitHub
2. **Asegúrate de NO incluir**:
   - `node_modules/`
   - `.env` (con tus credenciales)
   - `data/users.json` (con usuarios reales)
3. Incluye `.env.example` con valores de ejemplo
4. Copia la URL del repositorio
5. Súbela al AVA

## 🆘 Solución de Problemas

**Error: "Cannot find module"**
→ Ejecuta `npm install` en backend y frontend

**Error de CORS**
→ Asegúrate que ambos servidores estén corriendo

**No funciona GitHub OAuth**
→ Verifica las credenciales en `.env`

**La sesión no persiste**
→ Verifica que no estés en modo incógnito

## 👨‍💻 Autor

Proyecto desarrollado para Duoc UC - Desarrollo Frontend III

## 📄 Licencia

Uso académico
