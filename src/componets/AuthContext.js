import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from './Firebase';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider)
      .then(result => {
        setUser(result.user);
        setIsAuthenticated(true);
      })
      .catch(error => {
        console.error("Google Sign-In Error:", error);
      });
  };

  const signOut = () => {
    auth.signOut()
      .then(() => {
        setUser(null);
        setIsAuthenticated(false);
      })
      .catch(error => {
        console.error("Sign-Out Error:", error);
      });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
