import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { postLivros } from "../../Service/apiService";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/navbar";

export default function CadastroLivros() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [resumo, setResumo] = useState("");
  const [autor, setAutor] = useState("");

  const handleEnviar = async () => {
    if (!titulo || !descricao || !resumo || !autor) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos!");
      return;
    }

    const livro = { titulo, descricao, resumo, autor, disponivel: "S" };

    try {
      console.log("Enviando dados para API:", livro);
      const { status } = await postLivros(livro);

      if (status === 200 || status === 201) {
        Alert.alert("Sucesso", "Livro cadastrado com sucesso!");
        setTitulo("");
        setDescricao("");
        setResumo("");
        setAutor("");
      } else {
        Alert.alert("Erro", "Não foi possível cadastrar o livro.");
      }
    } catch (error) {
      console.error("Erro no handleEnviar:", error.message);
      Alert.alert("Erro", "Ocorreu um erro ao tentar cadastrar o livro.");
    }
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.form}>
        <TextInput
          label="Titulo"
          value={titulo}
          onChangeText={(text) => setTitulo(text)}
          mode="outlined"
          outlineColor="#000000"
          activeOutlineColor="#000000"
          theme={{ colors: { background: "#ffffff" } }}
          style={styles.input}
        />
        <TextInput
          label="Descrição"
          value={descricao}
          onChangeText={(text) => setDescricao(text)}
          mode="outlined"
          outlineColor="#000000"
          activeOutlineColor="#000000"
          theme={{ colors: { background: "#ffffff" } }}
          style={styles.input}
        />
        <TextInput
          label="Resumo"
          value={resumo}
          onChangeText={(text) => setResumo(text)}
          mode="outlined"
          outlineColor="#000000"
          activeOutlineColor="#000000"
          theme={{ colors: { background: "#ffffff" } }}
          style={styles.input}
        />
        <TextInput
          label="Autor"
          value={autor}
          onChangeText={(text) => setAutor(text)}
          mode="outlined"
          outlineColor="#000000"
          activeOutlineColor="#000000"
          theme={{ colors: { background: "#ffffff" } }}
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={handleEnviar}
          style={styles.button}
          labelStyle={{ color: "white" }}
        >
          Cadastrar Livro
        </Button>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  form: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#a9a9a9",
    borderRadius: 8,
    margin: 16,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  input: {
    marginBottom: 16,
    color: "#ff0000",
  },
  button: {
    marginTop: 16,
    backgroundColor: "black",
    borderRadius: 10,
  },
});
