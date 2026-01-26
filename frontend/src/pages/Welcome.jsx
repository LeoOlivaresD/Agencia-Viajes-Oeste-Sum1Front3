import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Welcome.css';

function Welcome() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const response = await authService.getProfile();
        setUser(response.user);
      } catch (error) {
        console.error('Error cargando perfil:', error);
        authService.logout();
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (!authService.isAuthenticated()) {
      navigate('/');
    } else {
      loadUserProfile();
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copiado al portapapeles');
  };

  if (loading) {
    return (
      <div className="welcome-container">
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="welcome-header">
          {user?.avatar && (
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="user-avatar"
            />
          )}
          <h1>¡Bienvenido!</h1>
          <p className="welcome-subtitle">Has iniciado sesión exitosamente</p>
        </div>

        <div className="user-info">
          <h3 className="section-title">Información del Usuario</h3>
          
          <div className="info-item">
            <span className="info-label">ID de Usuario:</span>
            <span className="info-value id-value">
              {user?.id}
              <button 
                onClick={() => copyToClipboard(user?.id)} 
                className="copy-btn"
                title="Copiar ID"
              >
                📋
              </button>
            </span>
          </div>

          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{user?.email}</span>
          </div>

          {user?.name && (
            <div className="info-item">
              <span className="info-label">Nombre:</span>
              <span className="info-value">{user.name}</span>
            </div>
          )}

          {user?.githubId && (
            <div className="info-item">
              <span className="info-label">GitHub ID:</span>
              <span className="info-value">{user.githubId}</span>
            </div>
          )}

          <div className="info-item">
            <span className="info-label">Método de autenticación:</span>
            <span className="info-value auth-badge">
              {user?.authMethod === 'github' ? 'GitHub OAuth' : 'Local'}
            </span>
          </div>

          {user?.createdAt && (
            <div className="info-item">
              <span className="info-label">Miembro desde:</span>
              <span className="info-value">
                {new Date(user.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          )}

          {user?.lastLogin && (
            <div className="info-item">
              <span className="info-label">Último inicio de sesión:</span>
              <span className="info-value">
                {new Date(user.lastLogin).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          )}
        </div>

        

        <div className="welcome-actions">
          <button onClick={handleLogout} className="btn btn-logout">
            Cerrar Sesión
          </button>
        </div>

        <div className="welcome-footer">
          <p>Agencia de Viajes Oeste</p>
          <p className="footer-subtitle">Portal de Gestión de Reservas</p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
