const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/solicitudes.json');

const readSolicitudes = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { solicitudes: [], lastId: 1117 };
  }
};

const writeSolicitudes = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error escribiendo solicitudes:', error);
    return false;
  }
};

const getAllSolicitudes = () => {
  const data = readSolicitudes();
  return data.solicitudes;
};

const addSolicitud = (solicitud) => {
  const data = readSolicitudes();
  
  data.lastId += 1;
  const newSolicitud = {
    ...solicitud,
    id: data.lastId,
    fechaRegistro: new Date().toISOString()
  };
  
  data.solicitudes.push(newSolicitud);
  writeSolicitudes(data);
  
  return newSolicitud;
};

const getSolicitudById = (id) => {
  const data = readSolicitudes();
  return data.solicitudes.find(s => s.id === parseInt(id));
};

module.exports = {
  readSolicitudes,
  writeSolicitudes,
  getAllSolicitudes,
  addSolicitud,
  getSolicitudById
};