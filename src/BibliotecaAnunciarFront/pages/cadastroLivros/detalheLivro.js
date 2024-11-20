import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/navbar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Button } from "react-native-paper";

export default function DetalheLivro() {

    const route = useRoute();
    const { livroId, titulo, autor, resumo, descricao, disponivel } = route.params;
    const [isDisabled, setIsDisabled] = useState(disponivel !== "S");

    useEffect(() => {
        setIsDisabled(disponivel !== "S");
    }, [disponivel]);


    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.detalhe__Container}>
                <View style={styles.contentContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>

                        {/* fazer icon de voltar*/}

                        <Text style={styles.detalhe__TituloLivro}>Título: {titulo}</Text>

                        {/* imagem*/}

                        <Text style={styles.detalhe__Autor}>
                            <Text style={styles.boldText}>Autor: </Text>{autor}
                        </Text>
                        <Text style={styles.detalhe__Descricao} >
                            <Text style={styles.boldText}>Descrição: </Text>{descricao}
                        </Text>

                        <Text style={styles.detalhe__StatusDisponivel}>{disponivel === "S" ? "Disponível para empréstimo" : "NÃO disponível para empréstimo"}</Text>
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

});
