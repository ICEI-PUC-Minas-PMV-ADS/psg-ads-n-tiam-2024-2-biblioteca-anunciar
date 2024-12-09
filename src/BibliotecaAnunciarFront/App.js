import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './context/userAuthContext';
import AppNavigator from './routes/routes';

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </AuthProvider>
  );
}