import React, { createContext, useState } from "react";

// Criando o contexto
export const UserContext = createContext();

// Provider para envolver a aplicação
export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState("");

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};