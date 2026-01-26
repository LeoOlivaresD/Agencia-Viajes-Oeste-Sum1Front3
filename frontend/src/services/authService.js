import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const authService = {
  register: async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      password
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    
    if (response.data.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  getGithubLoginUrl: async () => {
    const response = await axios.get(`${API_URL}/auth/github`);
    return response.data.url;
  },

  getProfile: async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token');
    }

    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;
