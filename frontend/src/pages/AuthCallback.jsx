import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './AuthCallback.css';

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setError('Error en la autenticación con GitHub');
      setTimeout(() => {
        navigate('/');
      }, 3000);
      return;
    }

    if (token) {
      localStorage.setItem('token', token);
      
      setTimeout(() => {
        navigate('/welcome');
      }, 1500);
    } else {
      setError('No se recibió el token de autenticación');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [searchParams, navigate]);

  return (
    <div className="callback-container">
      <div className="callback-content">
        {error ? (
          <>
            <div className="error-icon">✕</div>
            <h2>Error</h2>
            <p>{error}</p>
            <p className="redirect-text">Redirigiendo...</p>
          </>
        ) : (
          <>
            <div className="success-icon">✓</div>
            <h2>Autenticación Exitosa</h2>
            <p>Redirigiendo a tu perfil...</p>
            <div className="loading-spinner"></div>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthCallback;
