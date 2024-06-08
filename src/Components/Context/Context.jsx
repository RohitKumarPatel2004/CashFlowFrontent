import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    email: localStorage.getItem('email') || '',
    token: localStorage.getItem('token') || '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (email && token) {
      setIsAuthenticated(true);
    }
  }, []);

 

  const login = (email, token,referral,no_of_referral) => {
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    setAuth({ email, token});
    setIsAuthenticated(true);
  };

  const getAuthDetails = () => {
    return { email: auth.email, token: auth.token };
  };
  const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    setAuth({ email: '', token: ''});
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ auth,getAuthDetails, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
