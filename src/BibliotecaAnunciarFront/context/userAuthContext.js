import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");


  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn: user && user.uid }}>
     {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

