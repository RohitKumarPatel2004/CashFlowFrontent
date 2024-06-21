import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    email: localStorage.getItem('email') || '',
    token: localStorage.getItem('token') || '',
    userType: localStorage.getItem('userType') || ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');

    if (email && token && userType) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, token, userType) => {
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    localStorage.setItem('userType', userType); // Save userType in localStorage

    setAuth({ email, token, userType });
    setIsAuthenticated(true);
  };

  const getAuthDetails = () => {
    return { email: auth.email, token: auth.token, userType: auth.userType };
  };

  const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('userType'); // Remove userType from localStorage
    setAuth({ email: '', token: '', userType: '' });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ auth, getAuthDetails, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
