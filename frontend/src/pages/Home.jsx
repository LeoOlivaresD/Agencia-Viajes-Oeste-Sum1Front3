import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import './Home.css';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkExistingSession = async () => {
      if (authService.isAuthenticated()) {
        try {
          await authService.getProfile();
          navigate('/welcome');
        } catch (error) {
          authService.logout();
        }
      }
      setCheckingSession(false);
    };

    checkExistingSession();
  }, [navigate]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor complete todos los campos');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor ingrese un email válido');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login(email, password);
      
      if (response.success) {
        navigate('/welcome');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const url = await authService.getGithubLoginUrl();
      window.location.href = url;
    } catch (err) {
      setError('Error al conectar con GitHub');
    }
  };

  if (checkingSession) {
    return (
      <div className="home-container">
        <div className="loading-session">Verificando sesión...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="brand-section">
          <h1 className="brand-title">Agencia de Viajes Oeste</h1>
          <p className="brand-subtitle">Tu próxima aventura comienza aquí</p>
        </div>

        <div className="login-section">
          <h2>Iniciar Sesión</h2>
          
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="tu contraseña"
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="divider">
            <span>O</span>
          </div>

          <button 
            onClick={handleGithubLogin}
            className="btn btn-github"
            disabled={loading}
          >
            <span className="github-icon">⚡</span>
            Continuar con GitHub
          </button>

          <div className="register-link">
            <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
