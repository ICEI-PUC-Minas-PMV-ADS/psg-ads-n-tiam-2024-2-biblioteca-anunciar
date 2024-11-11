import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Navbar from "../../components/navbar/navbar";
import CardLivro from "../../components/CardLivro/CardLivro";
export default function PaginaInicial() {
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
        <CardLivro title="Teste" update="ontem" />
        <CardLivro title="Teste" update="ontem" />
        <CardLivro title="Teste" update="ontem" />
        <CardLivro title="Teste" update="ontem" />
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
