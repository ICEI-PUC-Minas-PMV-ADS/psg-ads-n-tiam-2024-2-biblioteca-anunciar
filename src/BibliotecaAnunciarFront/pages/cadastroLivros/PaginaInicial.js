import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Navbar from "../../components/navbar/navbar";
import CardLivro from "../../components/CardLivro/CardLivro";
import api from '../../Service/apiAxios';
import { TouchableOpacity } from "react-native";
export default function PaginaInicial() {
  
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/livro');
        setLivros(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.viewInput}>
        <TextInput
          style={styles.input}
          placeholder="Nome do livro"
        />
      </View>
      <View style={styles.viewContent}>
        {livros.map((livro) => (
          <TouchableOpacity 
          key={livro.id} 
          onPress={() => navigation.navigate('BookDetails', { livroId: livro.id })}
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
    width: "80%",
    marginTop: 20,
  },
  viewContent : {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
    paddingBottom: 20,
    overflow: 'auto',
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
  },
});