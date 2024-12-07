import React from "react"
import Navbar from "../../components/navbar/navbar";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useSelector } from 'react-redux';
export default function ListaDesejos() {
    const favoritedBooks = useSelector((state) => state.favoriteBooks); // Obtenha os livros favoritados do estado global
    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.livroDesejos__Container}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Text style={styles.livroDesejos__Titulo}>Livros Favoritados</Text>
                    {favoritedBooks.length > 0 ? (
                        favoritedBooks.map((livro, index) => (
                            <View key={`${livro.livroId}-${index}`} style={styles.livroContainer}>
                                <Text style={styles.livroTitulo}>Título: {livro.titulo}</Text>
                                <Text>Autor: {livro.autor}</Text>
                                <Text>Resumo: {livro.resumo}</Text>
                                <Text>Descrição: {livro.descricao}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.emptyMessage}>Nenhum livro favoritado.</Text>)}
                </ScrollView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: 140,
    },
    listaDesejos__Container: {
        marginTop: 10,
        marginBottom: 10,
        padding: 15
    },
    scrollViewContent: {
        paddingBottom: 80,
    },
    livroDesejos__Titulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#131313",
        marginTop: 20,
        marginBottom: 15,
        marginLeft: 15,
    },
    livroContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    livroTitulo: {
        fontSize: 18,
        fontWeight: "bold",
    }
});

