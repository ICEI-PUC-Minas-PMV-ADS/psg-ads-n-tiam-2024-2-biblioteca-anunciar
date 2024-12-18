import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../FirebaseConfig';
import { AuthContext } from '../../context/userAuthContext';
import { useNavigation } from "@react-navigation/native";


const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { user, setUser } = useContext(AuthContext); 

  useEffect(() => {
    if (user && user.uid) {
      console.log("Usuário autenticado, navegando para Home...");
      navigation.navigate("Home");
    }
  }, [user]);

  const handleLogin = async () => {
    if (!email || !senha) {
      console.log('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const isAdmin = email.toLowerCase() === 'admanunciar@gmail.com';
      const usuario = userCredential;
      console.log(usuario)

      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        nome: userCredential.user.displayName || "Usuário",
        isAdmin
      })

      console.log('Login bem-sucedido');
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          console.log('Erro', 'O email inserido é inválido.');
          break;
        case 'auth/user-not-found':
          console.log('Erro', 'Usuário não encontrado.');
          break;
        case 'auth/wrong-password':
          console.log('Erro', 'Senha incorreta.');
          break;
        default:
          console.log('Erro', 'Algo deu errado. Tente novamente.');
      }
    }
  };


  useEffect(() => {
    if (user.nome) {
      console.log("Nome carregado:", user.nome);
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logoanunciar.png')} style={styles.logo} />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite sua senha"
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Singup")}>
        <Text style={styles.signupText}>
          Não tem uma conta? <Text style={styles.signupLink}>Cadastre-se.</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    alignSelf: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  loginButton: {
    width: '80%',
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
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default LoginScreen;
