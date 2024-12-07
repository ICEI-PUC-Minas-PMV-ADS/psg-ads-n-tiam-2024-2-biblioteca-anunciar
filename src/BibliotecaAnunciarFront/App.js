import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './routes/routes';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store'

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </ReduxProvider>
  );
}
