const fs = require('fs');
const path = require('path');
const { renderToString } = require('../ssr/renderApp');
const { getAllSolicitudes } = require('../utils/solicitudesHandler');

const renderSolicitudesSSR = (req, res) => {
  try {
    console.log('=== Iniciando renderizado SSR ===');
    
    console.log('1. Obteniendo solicitudes...');
    const solicitudes = getAllSolicitudes();
    console.log('Solicitudes obtenidas:', solicitudes.length);
    
    console.log('2. Renderizando HTML...');
    const appHTML = renderToString(solicitudes);
    console.log('HTML renderizado, longitud:', appHTML.length);
    
    console.log('3. Buscando template...');
    const templatePath = path.join(__dirname, '..', 'views', 'solicitudes.html');
    console.log('Ruta del template:', templatePath);
    
    if (!fs.existsSync(templatePath)) {
      console.error('ERROR: Archivo no encontrado:', templatePath);
      return res.status(500).send('Error: Template HTML no encontrado');
    }
    
    console.log('4. Leyendo template...');
    let html = fs.readFileSync(templatePath, 'utf8');
    console.log('Template leido, longitud:', html.length);
    
    console.log('5. Reemplazando contenido...');
    html = html.replace('<!--SSR_CONTENT-->', appHTML);
    
    console.log('6. Enviando respuesta...');
    res.send(html);
    console.log('=== Renderizado SSR completado ===');
  } catch (error) {
    console.error('ERROR en SSR:');
    console.error('Mensaje:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).send(`Error al renderizar la pagina: ${error.message}`);
  }
};

module.exports = {
  renderSolicitudesSSR
};