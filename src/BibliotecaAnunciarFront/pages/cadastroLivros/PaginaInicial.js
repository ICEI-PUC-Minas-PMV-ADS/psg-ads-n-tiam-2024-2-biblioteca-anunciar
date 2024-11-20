import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import Navbar from "../../components/navbar/navbar";
import CardLivro from "../../components/CardLivro/CardLivro";
import api from '../../Service/apiAxios';
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function PaginaInicial() {

  const [livrosDb, setLivrosDb] = useState([]);
  const [livros, setLivros] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/livro');
        setLivrosDb(response.data);
        setLivros(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
      }
    };

    fetchData();
  }, []);

  function filtrarLivro() {
    console.log(livros)
    console.log(pesquisa)
    if (pesquisa == '' || pesquisa == null) {
      setLivros(livrosDb);
      return;
    }
    const livrosFiltrados = livrosDb.filter(livro =>
      livro.titulo && livro.titulo.toLowerCase().includes(pesquisa.toLowerCase())
    );

    setLivros(livrosFiltrados);
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.viewInput}>
        <TextInput
          style={styles.input}
          placeholder="Nome do livro"
          onChangeText={(valor) => setPesquisa(valor)}
        />
        <Button
          style={styles.buttonPesquisar}
          onPress={() => filtrarLivro()}
        >Pesquisar</Button>
      </View>
      <View style={styles.viewContent}>
        {livros.map((livro) => (
          <TouchableOpacity
            key={livro.id}
            onPress={() => navigation.navigate('detalheLivro',
              {
                livroId: livro.id,
                titulo: livro.titulo,
                autor: livro.autor,
                resumo: livro.resumo,
                descricao: livro.descricao,
                disponivel: livro.disponivel
              })}
          >
            <CardLivro title={livro.nome} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 200,
    overflow: 'auto',
  },
  viewInput: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonPesquisar: {
    width: "100px",
    backgroundColor: "black",
    height: "40px",
    color: "white"
  },
  viewContent: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
    width: "500px"
  },
});