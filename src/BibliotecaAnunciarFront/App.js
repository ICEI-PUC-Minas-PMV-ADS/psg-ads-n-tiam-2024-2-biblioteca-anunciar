import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './routes/routes';
import { UserProvider } from './Context/UserContext'

export default function App() {
  return (
    <PaperProvider>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </PaperProvider>
  );
}