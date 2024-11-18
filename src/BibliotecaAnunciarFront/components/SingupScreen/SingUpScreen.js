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
  container :{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default SignupScreen;