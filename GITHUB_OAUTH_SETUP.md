# Guía de Configuración GitHub OAuth

Esta guía te ayudará a configurar la autenticación con GitHub paso a paso.

## Paso 1: Crear una OAuth App en GitHub

1. **Inicia sesión en GitHub** y ve a tu perfil

2. **Navega a Settings** (Configuración)
   - Click en tu foto de perfil (esquina superior derecha)
   - Click en "Settings"

3. **Accede a Developer Settings**
   - En el menú lateral izquierdo, baja hasta el final
   - Click en "Developer settings"

4. **Crea una nueva OAuth App**
   - Click en "OAuth Apps" en el menú lateral
   - Click en "New OAuth App" (botón verde)

5. **Completa el formulario**:
   ```
   Application name: Agencia Viajes Oeste
   Homepage URL: http://localhost:3000
   Application description: Portal de autenticación para agencia de viajes
   Authorization callback URL: http://localhost:5000/api/auth/github/callback
   ```

6. **Registra la aplicación**
   - Click en "Register application"

7. **Guarda las credenciales**:
   - Verás tu **Client ID** (cópialo)
   - Click en "Generate a new client secret"
   - Copia el **Client Secret** INMEDIATAMENTE (solo se muestra una vez)

## Paso 2: Configurar el Backend

1. **Abre el archivo `.env`** en la carpeta `backend`:

   ```bash
   cd backend
   nano .env
   # o usa tu editor favorito
   ```

2. **Actualiza las variables** con tus credenciales:

   ```env
   GITHUB_CLIENT_ID=tu_client_id_aqui
   GITHUB_CLIENT_SECRET=tu_client_secret_aqui
   ```

3. **Guarda el archivo**

## Paso 3: Probar la Integración

1. **Inicia el backend**:
   ```bash
   cd backend
   npm start
   ```

2. **Inicia el frontend**:
   ```bash
   cd frontend
   npm start
   ```

3. **Prueba el flujo**:
   - Abre `http://localhost:3000`
   - Click en "Continuar con GitHub"
   - Autoriza la aplicación en GitHub
   - Deberías ser redirigido a la página de bienvenida

## Solución de Problemas

### Error: "Bad Credentials"
- Verifica que el Client ID y Client Secret estén correctos
- Asegúrate de no tener espacios extra en el archivo .env

### Error: "Redirect URI Mismatch"
- Verifica que la URL de callback en GitHub sea exactamente:
  `http://localhost:5000/api/auth/github/callback`
- No debe tener espacios ni caracteres extra

### No se obtiene el email del usuario
- Algunos usuarios de GitHub no tienen email público
- La aplicación está configurada para obtener el email primario automáticamente

### La autorización funciona pero no redirige
- Verifica que FRONTEND_URL en .env sea `http://localhost:3000`
- Revisa la consola del navegador para ver errores

## URLs Importantes

- GitHub OAuth Apps: https://github.com/settings/developers
- Documentación OAuth GitHub: https://docs.github.com/en/developers/apps/building-oauth-apps

## Notas de Seguridad

- **NUNCA** compartas tu Client Secret
- **NUNCA** subas el archivo `.env` a GitHub
- El archivo `.gitignore` ya está configurado para proteger .env
- Para producción, usa variables de entorno del servidor

## Cambiar a Producción

Cuando despliegues a producción, actualiza las URLs:

```
Homepage URL: https://tu-dominio.com
Authorization callback URL: https://tu-dominio.com/api/auth/github/callback
```

Y actualiza las variables de entorno en tu servidor.
