# Agencia de Viajes Oeste - Sistema con SSR

Proyecto desarrollado para el curso Desarrollo Frontend III de Duoc UC, implementando Server-Side Rendering (SSR) con React y Node.js.

## Descripcion del Proyecto

Sistema de gestion de solicitudes de viaje que permite:
- Autenticacion de usuarios (local y GitHub OAuth)
- Registro y visualizacion de solicitudes de viaje
- Renderizado del lado del servidor (SSR) para mejor rendimiento y SEO

## Tecnologias Utilizadas

### Backend
- Node.js + Express
- JWT para autenticacion
- bcryptjs para encriptacion de contraseñas
- GitHub OAuth 2.0
- React Server-Side Rendering (ReactDOMServer)
- Almacenamiento en archivos JSON

### Frontend
- React 18 + Vite
- React Router v6
- Axios
- CSS3

## Estructura del Proyecto
```
agencia-viajes-oeste/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── githubAuthController.js
│   │   ├── solicitudesController.js
│   │   └── ssrController.js
│   ├── data/
│   │   ├── users.json
│   │   └── solicitudes.json
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── solicitudes.js
│   │   └── ssr.js
│   ├── ssr/
│   │   └── renderApp.js
│   ├── utils/
│   │   ├── fileHandler.js
│   │   └── solicitudesHandler.js
│   ├── views/
│   │   └── solicitudes.html
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Register.jsx
    │   │   ├── Welcome.jsx
    │   │   ├── Solicitudes.jsx
    │   │   └── AuthCallback.jsx
    │   ├── services/
    │   │   ├── authService.js
    │   │   └── solicitudesService.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## Instalacion

### Prerequisitos
- Node.js v18 o superior
- npm

### 1. Clonar el repositorio
```bash
git clone [URL_DEL_REPOSITORIO]
cd agencia-viajes-oeste
```

### 2. Instalar dependencias del backend
```bash
cd backend
npm install
```

### 3. Configurar variables de entorno

Edita el archivo `backend/.env` con tus credenciales de GitHub OAuth:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=tu_clave_secreta_aqui
GITHUB_CLIENT_ID=tu_github_client_id
GITHUB_CLIENT_SECRET=tu_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback
FRONTEND_URL=http://localhost:3000
```

### 4. Instalar dependencias del frontend
```bash
cd frontend
npm install
```

## Ejecucion

### Iniciar el backend
```bash
cd backend
npm start
```

Servidor corriendo en: `http://localhost:5000`

### Iniciar el frontend

En otra terminal:
```bash
cd frontend
npm run dev
```

Aplicacion corriendo en: `http://localhost:3000`

## Endpoints de la API

### Autenticacion
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Login local
- `GET /api/auth/profile` - Obtener perfil (requiere token)
- `GET /api/auth/github` - Iniciar OAuth GitHub
- `GET /api/auth/github/callback` - Callback GitHub

### Solicitudes
- `GET /api/solicitudes` - Listar solicitudes (requiere token)
- `POST /api/solicitudes` - Crear solicitud (requiere token)
- `GET /api/solicitudes/:id` - Obtener solicitud por ID (requiere token)

### Server-Side Rendering
- `GET /ssr/solicitudes` - Vista SSR de solicitudes

## Caracteristicas Principales

### 1. Autenticacion
- Registro de usuarios con validacion de contraseña
- Login local con JWT
- Integracion con GitHub OAuth
- Persistencia de sesion

### 2. Gestion de Solicitudes de Viaje
- Formulario completo de solicitudes
- Validacion en cliente y servidor
- Campos incluidos:
  - ID autogenerado (correlativo desde 1118)
  - DNI del cliente
  - Nombre del cliente
  - Email (opcional)
  - Origen y destino
  - Tipo de viaje (negocios, turismo, otros)
  - Fechas y horas de salida/regreso
  - Estado (pendiente, en proceso, finalizada)
  - Fecha de registro automatica

### 3. Server-Side Rendering (SSR)
- Renderizado de HTML en el servidor usando ReactDOMServer
- Mejor rendimiento inicial de carga
- Optimizado para SEO
- HTML completo disponible en el codigo fuente

## Uso del Sistema

### Registro e Inicio de Sesion

1. Accede a `http://localhost:3000`
2. Opcion 1: Registrate con email y contraseña
3. Opcion 2: Usa GitHub OAuth
4. Una vez autenticado, seras redirigido al panel principal

### Crear Solicitud de Viaje

1. En el panel principal, haz clic en "Gestionar Solicitudes"
2. Completa el formulario con los datos del viaje
3. Selecciona el estado de la solicitud
4. Haz clic en "Crear Solicitud"
5. La solicitud aparecera en la lista del lado derecho

### Ver Solicitudes con SSR

1. Accede directamente a `http://localhost:5000/ssr/solicitudes`
2. Veras todas las solicitudes renderizadas desde el servidor
3. Puedes verificar el SSR haciendo clic derecho > "Ver codigo fuente"

## Validaciones Implementadas

### Cliente
- Campos vacios
- Formato de email
- Longitud de contraseña
- Complejidad de contraseña (mayuscula, numero, simbolo)

### Servidor
- Todos los campos requeridos
- Formato de email
- Autenticacion JWT
- Validacion de tokens

## Persistencia de Datos

Los datos se almacenan en archivos JSON:
- `backend/data/users.json` - Usuarios registrados
- `backend/data/solicitudes.json` - Solicitudes de viaje

## Autor

Leonardo Olivares - Proyecto desarrollado para Duoc UC
