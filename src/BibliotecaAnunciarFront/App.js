import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './Context/UserAuthContext';
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