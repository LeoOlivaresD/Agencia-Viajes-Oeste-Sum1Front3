const React = require('react');
const ReactDOMServer = require('react-dom/server');

function renderToString(solicitudes) {
  const solicitudesHTML = solicitudes.map(sol => `
    <div class="solicitud-item">
      <h3>Solicitud #${sol.id}</h3>
      <p><strong>Cliente:</strong> ${sol.nombreCliente}</p>
      <p><strong>DNI:</strong> ${sol.dni}</p>
      <p><strong>Ruta:</strong> ${sol.origen} - ${sol.destino}</p>
      <p><strong>Tipo:</strong> ${sol.tipoViaje}</p>
      <p><strong>Salida:</strong> ${sol.fechaSalida} ${sol.horaSalida}</p>
      <p><strong>Regreso:</strong> ${sol.fechaRegreso} ${sol.horaRegreso}</p>
      <p><strong>Estado:</strong> ${sol.estado}</p>
      ${sol.fechaRegistro ? `<p><strong>Registrado:</strong> ${new Date(sol.fechaRegistro).toLocaleString('es-ES')}</p>` : ''}
    </div>
  `).join('');

  const html = `
    <div class="ssr-container">
      <h1>Solicitudes de Viaje - SSR</h1>
      <div class="solicitudes-list">
        ${solicitudes.length === 0 
          ? '<p class="no-solicitudes">No hay solicitudes registradas</p>' 
          : solicitudesHTML
        }
      </div>
    </div>
  `;

  return html;
}

module.exports = {
  renderToString
};