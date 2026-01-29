const { getAllSolicitudes, addSolicitud, getSolicitudById } = require('../utils/solicitudesHandler');

const getSolicitudes = (req, res) => {
  try {
    const solicitudes = getAllSolicitudes();
    res.json({
      success: true,
      solicitudes
    });
  } catch (error) {
    console.error('Error obteniendo solicitudes:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener solicitudes'
    });
  }
};

const createSolicitud = (req, res) => {
  try {
    const {
      dni,
      nombreCliente,
      origen,
      destino,
      tipoViaje,
      fechaSalida,
      horaSalida,
      fechaRegreso,
      horaRegreso,
      estado
    } = req.body;

    if (!dni || !nombreCliente || !origen || !destino || !tipoViaje || 
        !fechaSalida || !horaSalida || !fechaRegreso || !horaRegreso || !estado) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (req.body.email && !emailRegex.test(req.body.email)) {
      return res.status(400).json({
        success: false,
        message: 'Formato de email invalido'
      });
    }

    const nuevaSolicitud = addSolicitud({
      dni,
      nombreCliente,
      origen,
      destino,
      tipoViaje,
      fechaSalida,
      horaSalida,
      fechaRegreso,
      horaRegreso,
      estado,
      email: req.body.email || null
    });

    res.status(201).json({
      success: true,
      message: 'Solicitud creada exitosamente',
      solicitud: nuevaSolicitud
    });
  } catch (error) {
    console.error('Error creando solicitud:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear solicitud'
    });
  }
};

const getSolicitudByIdController = (req, res) => {
  try {
    const { id } = req.params;
    const solicitud = getSolicitudById(id);
    
    if (!solicitud) {
      return res.status(404).json({
        success: false,
        message: 'Solicitud no encontrada'
      });
    }

    res.json({
      success: true,
      solicitud
    });
  } catch (error) {
    console.error('Error obteniendo solicitud:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener solicitud'
    });
  }
};

module.exports = {
  getSolicitudes,
  createSolicitud,
  getSolicitudByIdController
};