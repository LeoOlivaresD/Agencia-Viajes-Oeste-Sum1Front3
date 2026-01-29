const React = require('react');
const ReactDOMServer = require('react-dom/server');

function SolicitudesApp({ solicitudes = [] }) {
  return React.createElement('div', { className: 'ssr-container' },
    React.createElement('h1', null, 'Solicitudes de Viaje - SSR'),
    React.createElement('div', { className: 'solicitudes-list' },
      solicitudes.length === 0 
        ? React.createElement('p', null, 'No hay solicitudes registradas')
        : solicitudes.map(sol => 
            React.createElement('div', { 
              key: sol.id, 
              className: 'solicitud-item',
              style: {
                border: '1px solid #ddd',
                padding: '15px',
                margin: '10px 0',
                borderRadius: '8px'
              }
            },
              React.createElement('h3', null, `Solicitud #${sol.id}`),
              React.createElement('p', null, `Cliente: ${sol.nombreCliente}`),
              React.createElement('p', null, `DNI: ${sol.dni}`),
              React.createElement('p', null, `Ruta: ${sol.origen} - ${sol.destino}`),
              React.createElement('p', null, `Tipo: ${sol.tipoViaje}`),
              React.createElement('p', null, `Estado: ${sol.estado}`)
            )
          )
    )
  );
}

function renderToString(solicitudes) {
  const app = React.createElement(SolicitudesApp, { solicitudes });
  return ReactDOMServer.renderToString(app);
}

module.exports = {
  renderToString,
  SolicitudesApp
};