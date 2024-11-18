import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
//import { auth } from '../firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, senha);
      const userType = email.endsWith('@adm.anunciar') ? 'Administrador' : 'Usuário';
      Alert.alert('Sucesso', `Bem-vindo, ${userType}`);
    } catch (error) {
      Alert.alert('Erro', error.message);

    }
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Digite seu email" keyboardType="email-address" />
      <Text>Senha</Text>
      <TextInput value={senha} onChangeText={setSenha} placeholder="Digite sua senha" secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Criar Conta" onPress={() => navigation.navigate('SignupScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container :{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default LoginScreen;
