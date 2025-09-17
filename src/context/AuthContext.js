import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api.js'; // Updated import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserFromStorage = useCallback(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  const login = async (email, password) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await api.post('/api/auth/login', { email, password }, config);
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const register = async (email, password) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await api.post('/api/auth/register', { email, password, role: 'job_seeker' }, config);
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Add a function to get auth headers for protected routes
  const getAuthHeaders = () => {
    if (user && user.token) {
      return {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
    }
    return {};
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, getAuthHeaders }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};