import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import solicitudesService from '../services/solicitudesService';
import authService from '../services/authService';
import './Solicitudes.css';

function Solicitudes() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [solicitudes, setSolicitudes] = useState([]);
  
  const [formData, setFormData] = useState({
    dni: '',
    nombreCliente: '',
    origen: '',
    destino: '',
    tipoViaje: '',
    fechaSalida: '',
    horaSalida: '',
    fechaRegreso: '',
    horaRegreso: '',
    estado: 'pendiente',
    email: ''
  });

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/');
      return;
    }
    loadSolicitudes();
  }, [navigate]);

  const loadSolicitudes = async () => {
    try {
      const response = await solicitudesService.getAllSolicitudes();
      if (response.success) {
        setSolicitudes(response.solicitudes);
      }
    } catch (err) {
      console.error('Error cargando solicitudes:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    if (!email) return true;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.dni || !formData.nombreCliente || !formData.origen || 
        !formData.destino || !formData.tipoViaje || !formData.fechaSalida || 
        !formData.horaSalida || !formData.fechaRegreso || !formData.horaRegreso) {
      setError('Todos los campos son requeridos');
      return;
    }

    if (formData.email && !validateEmail(formData.email)) {
      setError('Formato de email invalido');
      return;
    }

    setLoading(true);

    try {
      const response = await solicitudesService.createSolicitud(formData);
      
      if (response.success) {
        setSuccess('Solicitud creada exitosamente');
        setFormData({
          dni: '',
          nombreCliente: '',
          origen: '',
          destino: '',
          tipoViaje: '',
          fechaSalida: '',
          horaSalida: '',
          fechaRegreso: '',
          horaRegreso: '',
          estado: 'pendiente',
          email: ''
        });
        loadSolicitudes();
        
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear solicitud');
    } finally {
      setLoading(false);
    }
  };

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="solicitudes-container">
      <div className="solicitudes-content">
        <div className="solicitudes-header">
          <h1>Gestion de Solicitudes de Viaje</h1>
          <button onClick={() => navigate('/welcome')} className="btn-back">
            Volver al Inicio
          </button>
        </div>

        <div className="solicitudes-grid">
          <div className="solicitudes-form-section">
            <h2 className="section-title">Nueva Solicitud</h2>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="dni">DNI o Identificacion</label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  placeholder="Ej: 16414595-0"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="nombreCliente">Nombre del Cliente</label>
                <input
                  type="text"
                  id="nombreCliente"
                  name="nombreCliente"
                  value={formData.nombreCliente}
                  onChange={handleChange}
                  placeholder="Ej: Esteban Castro Paredes"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email (opcional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="cliente@ejemplo.com"
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="origen">Origen</label>
                  <input
                    type="text"
                    id="origen"
                    name="origen"
                    value={formData.origen}
                    onChange={handleChange}
                    placeholder="Santiago, Chile"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="destino">Destino</label>
                  <input
                    type="text"
                    id="destino"
                    name="destino"
                    value={formData.destino}
                    onChange={handleChange}
                    placeholder="Madrid, España"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="tipoViaje">Tipo de Viaje</label>
                <select
                  id="tipoViaje"
                  name="tipoViaje"
                  value={formData.tipoViaje}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="negocios">Negocios</option>
                  <option value="turismo">Turismo</option>
                  <option value="otros">Otros</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fechaSalida">Fecha de Salida</label>
                  <input
                    type="date"
                    id="fechaSalida"
                    name="fechaSalida"
                    value={formData.fechaSalida}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="horaSalida">Hora de Salida</label>
                  <input
                    type="time"
                    id="horaSalida"
                    name="horaSalida"
                    value={formData.horaSalida}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fechaRegreso">Fecha de Regreso</label>
                  <input
                    type="date"
                    id="fechaRegreso"
                    name="fechaRegreso"
                    value={formData.fechaRegreso}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="horaRegreso">Hora de Regreso</label>
                  <input
                    type="time"
                    id="horaRegreso"
                    name="horaRegreso"
                    value={formData.horaRegreso}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="estado-group">
                <label>Estado de la Solicitud</label>
                <div className="radio-group">
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="pendiente"
                      name="estado"
                      value="pendiente"
                      checked={formData.estado === 'pendiente'}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <label htmlFor="pendiente">Pendiente</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="en-proceso"
                      name="estado"
                      value="en-proceso"
                      checked={formData.estado === 'en-proceso'}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <label htmlFor="en-proceso">En Proceso</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="finalizada"
                      name="estado"
                      value="finalizada"
                      checked={formData.estado === 'finalizada'}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <label htmlFor="finalizada">Finalizada</label>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Creando...' : 'Crear Solicitud'}
              </button>
            </form>
          </div>

          <div className="solicitudes-list-section">
            <h2 className="section-title">Lista de Solicitudes</h2>
            
            {solicitudes.length === 0 ? (
              <div className="no-solicitudes">
                No hay solicitudes registradas
              </div>
            ) : (
              solicitudes.map(solicitud => (
                <div key={solicitud.id} className="solicitud-card">
                  <div className="solicitud-header">
                    <span className="solicitud-id">#{solicitud.id}</span>
                    <span className={`solicitud-estado estado-${solicitud.estado}`}>
                      {solicitud.estado.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="solicitud-info">
                    <div className="info-row">
                      <span className="info-label">Cliente:</span>
                      <span className="info-value">{solicitud.nombreCliente}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">DNI:</span>
                      <span className="info-value">{solicitud.dni}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Ruta:</span>
                      <span className="info-value">{solicitud.origen} - {solicitud.destino}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Tipo:</span>
                      <span className="info-value">{solicitud.tipoViaje}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Salida:</span>
                      <span className="info-value">{formatFecha(solicitud.fechaSalida)} {solicitud.horaSalida}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Regreso:</span>
                      <span className="info-value">{formatFecha(solicitud.fechaRegreso)} {solicitud.horaRegreso}</span>
                    </div>
                    {solicitud.fechaRegistro && (
                      <div className="info-row">
                        <span className="info-label">Registrado:</span>
                        <span className="info-value">
                          {new Date(solicitud.fechaRegistro).toLocaleString('es-ES')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Solicitudes;