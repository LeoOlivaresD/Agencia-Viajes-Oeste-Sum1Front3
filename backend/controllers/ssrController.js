const fs = require('fs');
const path = require('path');
const { renderToString } = require('../ssr/renderApp');
const { getAllSolicitudes } = require('../utils/solicitudesHandler');

const renderSolicitudesSSR = (req, res) => {
  try {
    const solicitudes = getAllSolicitudes();
    
    const appHTML = renderToString(solicitudes);
    
    const templatePath = path.join(__dirname, '../views/solicitudes.html');
    let html = fs.readFileSync(templatePath, 'utf8');
    
    html = html.replace('<!--SSR_CONTENT-->', appHTML);
    
    res.send(html);
  } catch (error) {
    console.error('Error en SSR:', error);
    res.status(500).send('Error al renderizar la pagina');
  }
};

module.exports = {
  renderSolicitudesSSR
};