import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
//import { auth } from '../firebaseConfig';

const SignupScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');

  const handleSignup = async () => {
    if (!email || !senha || !nome || !telefone) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, senha);
      const userType = email.endsWith('@adm.anunciar') ? 'Administrador' : 'Usuário';
      Alert.alert('Sucesso', `Usuário ${userType} cadastrado!`);
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nome Completo</Text>
      <TextInput value={nome} onChangeText={setNome} placeholder="Nome Completo" />
      <Text>E-mail</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
      <Text>Telefone</Text>
      <TextInput value={telefone} onChangeText={setTelefone} placeholder="Telefone" keyboardType="phone-pad" />
      <Text>Senha</Text>
      <TextInput value={senha} onChangeText={setSenha} placeholder="Senha" secureTextEntry />
      <Button title="Cadastrar" onPress={handleSignup} />
      <Button title="Voltar para Login" onPress={() => navigation.navigate('LoginScreen')} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Alinha o conteúdo no centro horizontalmente
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    alignSelf: 'center', // Para alinhar o texto no início do campo
  },
  input: {
    width: '60%', 
    padding: 10,
    marginVertical: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  logo: {
    width: 100, 
    height: 100,
    marginBottom: 20, 
    resizeMode: 'contain',
  },
  loginButton: {
    width: '60%',
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    color: '#007AFF',
    marginVertical: 5,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default SignupScreen;