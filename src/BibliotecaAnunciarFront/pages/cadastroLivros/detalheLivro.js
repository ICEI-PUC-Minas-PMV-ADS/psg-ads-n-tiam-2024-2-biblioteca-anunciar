import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState, useContext } from "react";
import { Alert, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import Navbar from "../../components/navbar/navbar";
import api from '../../Service/apiAxios';
import { UserContext } from '../../Context/UserContext';

export default function DetalheLivro() {

    const navigation = useNavigation();
    const route = useRoute();
    const { livroId, titulo, autor, resumo, categoria, disponivel } = route.params;
    const [isDisabled, setIsDisabled] = useState(disponivel !== "S");
    const [favorito, setFavorito] = useState(false);
    const { userId } = useContext(UserContext);

    async function alternarFavorito() {
        try {
            const resposta = await api.put(
                `/livro/users/${userId}/favoritos/${livroId}`
            );
            const mensagem = resposta.data.mensagem;
            Alert.alert("Sucesso", mensagem);
            setFavorito((anterior) => !anterior);
        } catch (erro) {
            console.error("Erro ao atualizar favoritos:", erro.message);
            Alert.alert("Erro", "Não foi possível atualizar os favoritos.");
        }
    }


    useEffect(() => {
        async function buscarFavorito() {
            try {
                const resposta = await api.get(`/livro/users/${userId}`);
                const favoritos = resposta.data.favoritos || [];

                // Verifica se o livro está nos favoritos
                setFavorito(favoritos.includes(livroId));
            } catch (erro) {
                console.error("Erro ao buscar favoritos:", erro.message);
            }
        }

        if (userId && livroId) {
            buscarFavorito();
        }
    }, [userId, livroId]);

    useEffect(() => {
        setIsDisabled(disponivel !== "S");
    }, [disponivel]);

    async function reservarLivro(livroId) {
        try {
            await api.put(`/livro/${livroId}/reservar`, { disponivel: "N" });
            Alert.alert("Sucesso", "Livro reservado com sucesso!");
            setIsDisabled(true);
        } catch (error) {
            console.error("Erro ao reservar o livro:", error.response?.data || error.message);
            Alert.alert("Erro", "Não foi possível reservar o livro.");
        }
    }

    useEffect(() => {
        if (userId) {
            console.log('UID atualizado:', userId);
        }
    }, [userId]);

    useEffect(() => {
        if (livroId) {
            console.log('livroId atualizado:', livroId);
        }
    }, [livroId]);

    async function deleteLivro(livroId) {
        try {
            const response = await api.delete(`/livro/${livroId}`);
            navigation.navigate("Home");
            console.log('Livro deletado com sucesso:', response.data);

        } catch (error) {
            console.error('Erro ao deletar o livro:', error.response || error.message);
        }
    }


    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.detalhe__Container}>
                <View style={styles.contentContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>

                        {/* fazer icon de voltar*/}

                        <Text style={styles.detalhe__TituloLivro}>Título: {titulo}</Text>

                        <View style={styles.containerDeleteEditButton}>
                            <Button
                                style={styles.buttonFunctions}
                                onPress={() => navigation.navigate("editPage", { livroId, titulo, autor, resumo, categoria })}
                            ><Icon name="pencil-outline" size={30} color="black" /></Button>
                            <Button
                                style={styles.buttonFunctions}
                                onPress={() => deleteLivro(livroId)}
                            ><Icon name="trash-outline" size={30} color="black" /></Button>
                        </View>

                        <View style={styles.rowContainer}>

                            <View style={styles.columnContainer}>
                                <Text style={styles.detalhe__Autor}>
                                    <Text style={styles.boldText}>Autor: </Text>{autor}
                                </Text>
                                <Text style={styles.detalhe__Descricao}>
                                    <Text style={styles.boldText}>Categoria: </Text>{categoria}
                                </Text>
                            </View>
                            <Button
                                mode="text"
                                style={styles.button__favorito}
                                contentStyle={styles.content__favorito}
                                labelStyle={styles.label__favorito}
                                icon={() => (
                                    <Icon
                                        name={favorito ? "heart" : "heart-outline"}
                                        size={24}
                                        color={favorito ? "red" : "gray"}
                                        style={{ marginRight: 30 }}
                                    />
                                )}
                                onPress={alternarFavorito}
                            >
                                {favorito ? "Remover Favorito" : "Favoritar"}
                            </Button>
                        </View>


                        <Text style={styles.detalhe__StatusDisponivel}>{disponivel === "S" ? "Disponível para empréstimo" : "NÃO disponível para empréstimo"}</Text>
                        <Button
                            style={[
                                styles.detalhe__BotaoReservar,
                                isDisabled && styles.detalhe__BotaoReservarDesabilitado,
                            ]}
                            mode="contained"
                            labelStyle={{ color: isDisabled ? "gray" : "white" }}
                            disabled={isDisabled}
                            onPress={() => reservarLivro(livroId)}
                        >
                            Reservar
                        </Button>
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
        flexWrap: "wrap",
    },
    detalhe__Descricao: {
        fontSize: 18,
        color: "#131313",
        marginBottom: 10,
        flexWrap: "wrap",
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
    containerDeleteEditButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "end"
    },
    buttonFunctions: {
        width: "50px",
        height: "50px",
        justifyContent: "center"
    },
    button__favorito: {
        backgroundColor: 'transparent',
        elevation: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 100,
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
    },
    content__favorito: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    label__favorito: {
        color: "black",
        marginTop: 4,
        fontSize: 14,
        textAlign: "center",
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingHorizontal: 10,
    },
    columnContainer: {
        flex: 2, // Autor e categoria ocupam no máximo 2/3 da largura
        flexBasis: '66%', // Garantindo que autor e categoria ocupem até 2/3 do espaço
        marginRight: 10, // Dá um pequeno espaço entre o texto e o botão de favoritar
    }
});
