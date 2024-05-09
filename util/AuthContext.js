// util/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  setIsAuthenticated: () => {},
  setAuthStatus: () => {},
  checkAuth: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null); // Initialize to null

  const checkAuth = () => {
    if (typeof window !== "undefined") { // Check if `window` is defined, meaning this is running in the browser
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      const payloadBase64 = savedToken.split('.')[1];
      const decodedJson = atob(payloadBase64);
      const decodedToken = JSON.parse(decodedJson);

      const exp = decodedToken.exp;
      const isTokenValid = Date.now() < exp * 1000;
      setIsAuthenticated(isTokenValid);

      if (!isTokenValid) {
        localStorage.removeItem('token');
        setToken(null);
      }

      return isTokenValid;
    }
    setIsAuthenticated(false);
  }
  return false;
};

  useEffect(() => {
    // Synchronously check authentication status before setting up the interval
    const isAlreadyAuthenticated = checkAuth();
    setToken(localStorage.getItem('token'));

    if (!isAlreadyAuthenticated) {
      // Set up an interval to check the token's validity every 5 seconds
      const intervalId = setInterval(() => {
        checkAuth();
      }, 5000);

      // Clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }
  }, []);


  const setAuthStatus = (status, newToken) => {
    setIsAuthenticated(status);
    if (status && newToken) {
      localStorage.setItem('token', newToken); // Save the new token
      setToken(newToken); // Update the token in the state
    } else {
      localStorage.removeItem('token');
      setToken(null);
    }
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, setAuthStatus , checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
