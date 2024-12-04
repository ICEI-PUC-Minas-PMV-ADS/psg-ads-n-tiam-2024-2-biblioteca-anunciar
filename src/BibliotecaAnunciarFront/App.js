import React, { useContext } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider, AuthContext } from './Provider/AuthProvider'; // Caminho correto para o AuthContext
import AppNavigator from './routes/routes'; // Supondo que AppNavigator esteja em routes/routes.js

export default function App() {
  //const { isAuthenticated, user } = useContext(AuthContext);

  // Exibir mensagem de login caso o usuário não esteja autenticado
  //if (!isAuthenticated) {
    //return <Text>Por favor, faça login</Text>;
  //}

  return (
    <AuthProvider> {/* Certifique-se de envolver a aplicação com o AuthProvider */}
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </AuthProvider>
  );
}
