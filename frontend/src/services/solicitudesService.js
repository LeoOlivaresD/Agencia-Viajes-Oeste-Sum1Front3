import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const solicitudesService = {
  getAllSolicitudes: async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token');
    }

    const response = await axios.get(`${API_URL}/solicitudes`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  },

  createSolicitud: async (solicitudData) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token');
    }

    const response = await axios.post(`${API_URL}/solicitudes`, solicitudData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  },

  getSolicitudById: async (id) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token');
    }

    const response = await axios.get(`${API_URL}/solicitudes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  }
};

export default solicitudesService;