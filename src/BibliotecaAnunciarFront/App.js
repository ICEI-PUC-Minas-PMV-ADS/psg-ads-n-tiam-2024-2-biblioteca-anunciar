import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/navbar';
export default function App() {
  return (
    <View style={styles.container}>
      <Navbar/>
      <Text>Open up App.js to start working on your ap</Text>
      <StatusBar style="auto" />
      <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
