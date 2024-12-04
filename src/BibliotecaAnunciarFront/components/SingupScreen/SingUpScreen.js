import React, { useState } from 'react';
import { Image } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../FirebaseConfig'; 
import { doc, setDoc } from 'firebase/firestore';

const SignupScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmsenha, setconfirmSenha] = useState('');
  const [role, setRole] = useState('user'); // Define o tipo de usuário padrão como 'user'

  const handleSignup = async () => {
    if (!email || !senha || !nome || !telefone) {
      console.log('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    if (senha !== confirmsenha) {
      console.log('Erro', 'As senhas não coincidem!');
      return;
    }

    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const userId = userCredential.user.uid;

      // Salva os dados do usuário no Firestore
      await setDoc(doc(db, "users", userId), {
        nome,
        email,
        telefone,
        role, // Salva o tipo de usuário (user ou admin)
      });

      console.log('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.navigate('LoginScreen'); 
    } catch (error) {
      console.log('Erro ao cadastrar', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logoanunciar.png')} style={styles.logo} />
      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome Completo"
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        placeholder="Telefone"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Senha"
        secureTextEntry
      />

      <Text style={styles.label}>Confirmar Senha</Text>
      <TextInput
        style={styles.input}
        value={confirmsenha}
        onChangeText={setconfirmSenha}
        placeholder="Confirmar Senha"
        secureTextEntry
      />

      <Text style={styles.label}>Tipo de Usuário</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'user' && styles.selectedRoleButton]}
          onPress={() => setRole('user')}
        >
          <Text style={styles.roleButtonText}>Usuário</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'admin' && styles.selectedRoleButton]}
          onPress={() => setRole('admin')}
        >
          <Text style={styles.roleButtonText}>Administrador</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.link}>Voltar para Login</Text>
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
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  roleButton: {
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
  },
  selectedRoleButton: {
    backgroundColor: '#333',
  },
  roleButtonText: {
    color: '#fff',
  },
  signupButton: {
    width: '60%',
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  signupButtonText: {
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
  },
});

export default SignupScreen;