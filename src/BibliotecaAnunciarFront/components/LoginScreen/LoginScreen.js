import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../FirebaseConfig';
import { AuthContext } from '../../Provider/AuthProvider'; // Importando o contexto

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();
  const { setUser, setIsAuthenticated: setAuthContext } = useContext(AuthContext); // Acessando os métodos de contexto

  const handleLogin = async () => {
    if (!email || !senha) {
      console.log('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const userId = userCredential.user.uid;

      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userType = userData.role || 'Usuário'; // Verifica o tipo do usuário

        console.log('Sucesso', `Bem-vindo, ${userType}`);

        // Atualizando o estado de autenticação no contexto
        setAuthContext(true);
        setUser(userCredential.user);

        // Redireciona com base no tipo de usuário
        if (userType === 'Administrador') {
          navigation.navigate('Home'); // Exemplo: Tela de administrador
        } else {
          navigation.navigate('Home'); // Exemplo: Tela de usuário comum
        }
      } else {
        console.log('Erro', 'Usuário não encontrado no banco de dados.');
      }
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

      <TouchableOpacity onPress={() => navigation.navigate('Singup')}>
        <Text style={styles.link}>Registrar</Text>
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
    width: '60%', 
    padding: 10,
    marginVertical: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
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
  logo: {
    width: 150,           
    height: 150,           
    resizeMode: 'contain',  
    marginBottom: 20,      
    alignSelf: 'center', 
  }
});

export default LoginScreen;
