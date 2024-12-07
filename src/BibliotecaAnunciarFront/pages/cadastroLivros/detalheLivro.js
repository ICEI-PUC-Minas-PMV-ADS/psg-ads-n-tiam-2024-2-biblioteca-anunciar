import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/navbar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteBook, removeFavoriteBook } from '../../redux/favoriteBooksSlice';
import axios from 'axios';

export default function DetalheLivro() {

    const navigation = useNavigation();
    const route = useRoute();
    const { livroId, titulo, autor, resumo, descricao, disponivel } = route.params;
    const [isDisabled, setIsDisabled] = useState(disponivel !== "S");
    const [isFavorite, setIsFavorite] = useState(false); // Para controlar o estado do favorito
    const [favoritedBooks, setFavoritedBooks] = useState([]);


    const toggleFavorite = () => {
        const book = { titulo, autor, resumo, descricao, disponivel };
        if (isFavorite) {
            axios.delete(`/favorites/${livroId}`)
                .then(() => {
                    setFavoritedBooks(favoritedBooks.filter(item => item.livroId !== livroId));
                    setIsFavorite(false);
                })
                .catch(error => console.error('Erro ao remover livro dos favoritos:', error));
        }
        else {
            axios.post('/favorites', book)
                .then(response => {
                    setFavoritedBooks([...favoritedBooks, response.data]);
                    setIsFavorite(true);
                })
                .catch(error => console.error('Erro ao adicionar livro aos favoritos:', error));
        }
    };

    useEffect(() => {
        setIsDisabled(disponivel !== "S");
        axios.get('/favorites')
            .then(response => {
                setFavoritedBooks(response.data);
                const bookExists = response.data.some(book => book.livroId === livroId);
                setIsFavorite(bookExists);
            })
            .catch(error => console.error('Erro ao obter livros favoritados:', error));
    }, [disponivel, livroId]);


    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.detalhe__Container}>
                <TouchableOpacity
                    style={styles.detalhe__botaoVolta}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.contentContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        <Text style={styles.detalhe__TituloLivro}>Título: {titulo}</Text>


                        <View style={styles.rowContainer}>

                            <View style={styles.columnContainer}>
                                <Text style={styles.detalhe__Autor}>
                                    <Text style={styles.boldText}>Autor: </Text>{autor}
                                </Text>
                                <Text style={styles.detalhe__Descricao}>
                                    <Text style={styles.boldText}>Descrição: </Text>{descricao}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={styles.detalhe__IconeFavoritado}
                                onPress={toggleFavorite} >
                                <Icon name={isFavorite ? "favorite" : "favorite-border"}
                                    size={30}
                                    color={isFavorite ? "red" : "gray"} />
                            </TouchableOpacity>

                        </View>
                        <Text style={styles.detalhe__StatusDisponivel}>{disponivel === "S" ? "Disponível para empréstimo" : "NÃO disponível para empréstimo"}
                        </Text>
                        <Button
                            style={[
                                styles.detalhe__BotaoReservar,
                                isDisabled && styles.detalhe__BotaoReservarDesabilitado,
                            ]}
                            mode="contained"
                            labelStyle={{ color: isDisabled ? "gray" : "white" }}
                            disabled={isDisabled}
                        >
                            Reservar
                        </Button>

                        {/* imagem*/}
                        <Text style={styles.detalhe__Resumo}>Resumo: {resumo}</Text>

                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: 140,
    },
    detalhe__Container: {
        marginTop: 10,
        marginBottom: 10,
        padding: 15
    },
    contentContainer: {
        flexGrow: 1,
        padding: 15,
    },
    scrollViewContent: {
        paddingBottom: 80,
    },

    detalhe__botaoVolta: {
        position: 'absolute',
        top: 10,
        left: 15,
        zIndex: 1,
        padding: 10,
    },
    detalhe__TituloLivro: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#131313",
        marginTop: 20,
        marginBottom: 15,
    },
    detalhe__Autor: {
        fontSize: 18,
        color: "#131313",
        marginBottom: 10,
    },
    detalhe__Descricao: {
        fontSize: 18,
        color: "#131313",
        marginBottom: 10,
    },
    detalhe__Resumo: {
        fontSize: 18,
        color: "#131313",
        marginTop: 20,
        marginBottom: 15,
    },
    detalhe__StatusDisponivel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#980204",
        marginBottom: 20,
    },
    boldText: {
        fontWeight: "bold",
    },
    detalhe__BotaoReservar: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#007BFF",
        backgroundColor: "#006C69",
        marginBottom: 20,
    },
    detalhe__BotaoReservarDesabilitado: {
        backgroundColor: "#b0b0b0",
        borderColor: "#b0b0b0",
    },
    detalhe__IconeFavoritado: {
        marginLeft: 10,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    columnContainer: {
        flexDirection: "column",
    }
});
