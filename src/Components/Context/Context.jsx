import React, { createContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// AuthProvider component to provide auth state to its children
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    email: localStorage.getItem('email') || '',
    token: localStorage.getItem('token') || '',
    referral: localStorage.getItem('referral') || '',
    no_of_referral:localStorage.getItem('no_of_referral') || ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    const referral=localStorage.getItem('referral')
    const no_of_referral=localStorage.getItem('no_of_referral')
    if (email && token) {
      setIsAuthenticated(true);
    }
  }, []);

 

  // Function to log in and save email and token
  const login = (email, token,referral,no_of_referral) => {
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    localStorage.setItem('referral',referral)
    localStorage.setItem('no_of_referral',no_of_referral)
    setAuth({ email, token ,referral ,no_of_referral });
    setIsAuthenticated(true);
  };

  const getAuthDetails = () => {
    return { email: auth.email, token: auth.token , referral: auth.referral ,no_of_referral: auth.no_of_referral};
  };
  // Function to log out and clear email and token
  const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('referral')
    localStorage.removeItem('no_of_referral')
    setAuth({ email: '', token: '' ,referral:'' ,no_of_referral:''});
    setIsAuthenticated(false);
  };

  // Provide the auth state and login/logout functions to the children
  return (
    <AuthContext.Provider value={{ auth,getAuthDetails, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return React.useContext(AuthContext);
};
