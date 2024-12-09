import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
import CardLivro from "../../components/CardLivro/CardLivro";
import Navbar from "../../components/navbar/navbar";
import { AuthContext } from "../../Context/UserAuthContext";
import api from '../../Service/apiAxios';

export default function PaginaInicial() {
  const categorias = [
    "Blibia",
    "Teologia",
    "Jovens_e_Adolescentes",
    "Estudo_Bíblico",
    "Comentário_Biblico",
    "historia_da_igreja",
  ];

  const [livrosDb, setLivrosDb] = useState([]);
  const [livros, setLivros] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const { user } = useContext(AuthContext);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/livro");
        setLivrosDb(response.data);
        setLivros(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error.message);
      }
    };

    fetchData();
  }, []);

  const filtrarLivro = () => {
    let livrosFiltrados = livrosDb;

    if (selectedFilter !== null) {
      const categoriaSelecionada = categorias[selectedFilter];
      livrosFiltrados = livrosFiltrados.filter(
        (livro) =>
          livro.categoria.toLowerCase() === categoriaSelecionada.toLowerCase()
      );
    }

    if (pesquisa.trim() !== "") {
      livrosFiltrados = livrosFiltrados.filter(
        (livro) =>
          livro.titulo &&
          livro.titulo.toLowerCase().includes(pesquisa.toLowerCase())
      );
    }

    setLivros(livrosFiltrados);
  };

  const handleFilterPress = (index) => {
    if (selectedFilter === index) {
      setSelectedFilter(null);
    } else {
      setSelectedFilter(index);
    }
  };
  useEffect(() => {
    filtrarLivro();
  }, [selectedFilter, pesquisa]);
  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.filtersContainer}
        showsHorizontalScrollIndicator={false}
      >
        {categorias.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterButton,
              selectedFilter === index && styles.selectedButton,
            ]}
            onPress={() => handleFilterPress(index)}
          >
            <Text
              style={
                selectedFilter === index
                  ? styles.selectedText
                  : styles.filterText
              }
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.viewInput}>
        <TextInput
          style={styles.input}
          placeholder="Nome do livro"
          onChangeText={(valor) => setPesquisa(valor)}
        />
      </View>
      <ScrollView style={styles.viewContent}>
        <View style={styles.cardsContainer}>
          {livros.map((livro) => (
            <TouchableOpacity
              key={livro.id}
              onPress={() =>
                navigation.navigate("detalheLivro", {
                  livroId: livro.id,
                  titulo: livro.titulo,
                  autor: livro.autor,
                  resumo: livro.resumo,
                  descricao: livro.descricao,
                  disponivel: livro.disponivel,
                  imagem: livro.imagem,
                })
              }
            >
              <CardLivro title={livro.titulo} imagem={livro.imagem} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  },
  viewInput: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPesquisar: {
    marginLeft: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 5,
    height: 40,
  },
  scrollContent: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
  scrollContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "70%",
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    marginHorizontal: 5,
  },
  selectedButton: {
    borderColor: "#1e6f5c",
    backgroundColor: "#eafaf1",
  },
  filterText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  selectedText: {
    color: "#1e6f5c",
  },
  filtersContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  viewContent: {
    marginTop: "10px"
  }, cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: 20,
  }, cardItem: {
    width: "48%",
    marginBottom: 20,
  },
});
