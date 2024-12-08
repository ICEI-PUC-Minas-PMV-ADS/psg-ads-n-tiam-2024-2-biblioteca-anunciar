import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import Navbar from "../../components/navbar/navbar";
import { AuthContext } from "../../context/UserAuthContext";
import api from '../../Service/apiAxios';

export default function DetalheLivro() {

    const navigation = useNavigation();
    const route = useRoute();
    const { livroId, titulo, autor, resumo, categoria, disponivel } = route.params;
    const [isDisabled, setIsDisabled] = useState(disponivel !== "S");
    const [favorito, setFavorito] = useState(false);
    const { user } = useContext(AuthContext);
    const useId = user.uid;

    async function alternarFavorito() {
        try {
            const resposta = await api.put(
                `/livro/users/${useId}/favoritos/${livroId}`
            );
            const mensagem = resposta.data.mensagem;
            Alert.alert("Sucesso", mensagem);
            setFavorito((anterior) => !anterior);
        } catch (erro) {
            console.error("Erro ao atualizar favoritos:", erro.message);
            Alert.alert("Erro", "Não foi possível atualizar os favoritos.");
        }
    }


    async function reservarLivro(livroId) {
        try {
            const resposta = await api.put(
                `/livro/users/${useId}/favoritos/${livroId}`
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
                const resposta = await api.get(`/livro/users/${useId}`);
                const favoritos = resposta.data.favoritos || [];
                setFavorito(favoritos.includes(livroId));
            } catch (erro) {
                console.error("Erro ao buscar favoritos:", erro.message);
            }
        }

        if (useId && livroId) {
            buscarFavorito();
        }
    }, [useId, livroId]);

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
        if (user) {
            console.log('UID atualizado:', useId);
        }
    }, [useId]);

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
            <View style={styles.button_back_view}>
                <Button
                    style={styles.voltarButton}
                    onPress={() => navigation.goBack()}
                    icon={() => <Icon name="arrow-back" size={30} color="black" />}
                />
            </View>
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

                        {user?.isAdmin && (
                            <View style={styles.containerDeleteEditButton}>
                                <Button
                                    style={styles.buttonFunctions}
                                    onPress={() =>
                                        navigation.navigate("editPage", {
                                            livroId,
                                            titulo,
                                            autor,
                                            resumo,
                                            categoria,
                                        })
                                    }
                                >
                                    <Icon name="pencil-outline" size={30} color="black" />
                                </Button>
                                <Button
                                    style={styles.buttonFunctions}
                                    onPress={() => deleteLivro(livroId)}
                                >
                                    <Icon name="trash-outline" size={30} color="black" />
                                </Button>
                            </View>
                        )}

                        <View style={styles.rowContainer}>
                            <View style={styles.columnContainer}>
                                <Text style={styles.detalhe__Autor}>
                                    <Text style={styles.boldText}>Autor: </Text>
                                    {autor}
                                </Text>
                                <Text style={styles.detalhe__Descricao}>
                                    <Text style={styles.boldText}>Categoria: </Text>
                                    {categoria}
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
                                        size={35}
                                        color={favorito ? "red" : "gray"}
                                        style={{ marginRight: 6 }}
                                    />
                                )}
                                onPress={alternarFavorito}
                            >
                                {favorito ? "Remover Favorito" : "Favoritar"}
                            </Button>
                        </View>

                        <View style={styles.statusContainer__BotaoReserva}>
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
                            <Text style={styles.detalhe__StatusDisponivel}>
                                {disponivel === "S"
                                    ? "Disponível para empréstimo"
                                    : "NÃO disponível para empréstimo"}
                            </Text>
                        </View>

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
        padding: 8
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
        fontSize: 16,
        color: "#131313",
        marginBottom: 10,
        flexWrap: "wrap",
    },
    detalhe__Descricao: {
        fontSize: 16,
        color: "#131313",
        marginBottom: 10,
        flexWrap: "wrap",
    },
    detalhe__Resumo: {
        fontSize: 16,
        color: "#131313",
        marginTop: 10,
        marginBottom: 15,
    },
    detalhe__StatusDisponivel: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#980204",
        marginTop: 1,
    },
    boldText: {
        fontWeight: "bold",
    },
    detalhe__BotaoReservar: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#007BFF",
        backgroundColor: "#006C69",
        marginBottom: 1,
        paddingHorizontal: 20,
        width: '70%',
        alignSelf: 'center',
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
        paddingHorizontal: 5,
        minWidth: 45,
        width: 100,
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
    },
    content__favorito: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    label__favorito: {
        display: 'none',
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 5,
    },
    columnContainer: {
        flex: 1,
        marginRight: 5,
    },
    detalhe__botaoVolta: {
        position: 'absolute',
        top: 10,
        left: 15,
        zIndex: 1,
        padding: 1,
    },
    statusContainer__BotaoReserva: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 1,
    },
    button_back_view: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start"
    }
});
