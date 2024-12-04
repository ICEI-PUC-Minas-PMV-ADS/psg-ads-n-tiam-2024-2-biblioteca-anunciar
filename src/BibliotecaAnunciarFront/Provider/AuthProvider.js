import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../FirebaseConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // O estado do usuário será atualizado com base na autenticação
        setIsAuthenticated(true);
        setUser(user);
        console.log('Usuário autenticado:', user.email);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
