import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [passwordValid, setPasswordValid] = useState(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePasswordStrength = (pass) => {
  if (pass.length === 0) {
      setPasswordValid(null);
      return;
  }
    
  const hasLength = pass.length >= 8;
  const hasUpperCase = /[A-Z]/.test(pass);
  const hasNumber = /[0-9]/.test(pass);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    
  const isValid = hasLength && hasUpperCase && hasNumber && hasSymbol;
    setPasswordValid(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('Por favor complete todos los campos');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor ingrese un email válido');
      return;
    }

    // Validación de contraseña
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase) {
      setError('La contraseña debe contener al menos una letra mayúscula');
      return;
    }

    if (!hasNumber) {
      setError('La contraseña debe contener al menos un número');
      return;
    }

    if (!hasSymbol) {
      setError('La contraseña debe contener al menos un símbolo (!@#$%^&*...)');
      return;
    }

        if (password !== confirmPassword) {
          setError('Las contraseñas no coinciden');
          return;
        }

        setLoading(true);

        try {
          const response = await authService.register(email, password);
          
          if (response.success) {
            alert('Registro exitoso. Por favor inicie sesión.');
            navigate('/');
          }
        } catch (err) {
          setError(err.response?.data?.message || 'Error al registrarse');
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="register-container">
          <div className="register-card">
            <div className="register-header">
              <h1>Crear Cuenta</h1>
              <p>Únete a Agencia de Viajes Oeste</p>
            </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="register-form">
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
  onChange={(e) => {
    setPassword(e.target.value);
    validatePasswordStrength(e.target.value);
  }}
  placeholder="Mín. 8 caracteres, mayúscula, número y símbolo"
  disabled={loading}
  className={passwordValid === null ? '' : passwordValid ? 'input-valid' : 'input-invalid'}
/>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div className="login-link">
          <p>¿Ya tienes cuenta? <Link to="/">Inicia sesión aquí</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
