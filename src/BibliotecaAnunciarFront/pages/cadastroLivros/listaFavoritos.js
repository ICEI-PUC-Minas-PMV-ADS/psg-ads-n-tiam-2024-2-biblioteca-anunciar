import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../../Context/UserAuthContext";
import api from "../../Service/apiAxios";
import Navbar from "../../components/navbar/navbar";

export default function ListaFavoritos() {
    const { user } = useContext(AuthContext); // Obtém o usuário do contexto
    const useId = user?.uid; // Verifica se `user` existe antes de acessar `uid`
    const [favoritos, setFavoritos] = useState([]); // Estado para armazenar os favoritos
    const [isLoading, setIsLoading] = useState(true); // Estado para controle de carregamento
    const [error, setError] = useState(null); // Estado para controle de erros

    useEffect(() => {
        const fetchFavoritosDetalhes = async () => {
            try {
                // Busca os IDs dos favoritos
                const resposta = await api.get(`/livro/users/${useId}`);
                const favoritosIds = resposta.data.favoritos || [];
                console.log("IDs dos favoritos:", favoritosIds);

                if (favoritosIds.length === 0) {
                    setFavoritos([]);
                    return;
                }

                // Faz requisições para cada livro
                const livrosPromises = favoritosIds.map(async (id) => {
                    const livroResponse = await api.get(`/livro/${id}`);
                    return livroResponse.data;
                });

                // Espera todas as requisições serem concluídas
                const livrosFavoritos = await Promise.all(livrosPromises);
                console.log("Livros favoritos encontrados:", livrosFavoritos);
                setFavoritos(livrosFavoritos);
            } catch (erro) {
                console.error("Erro ao buscar livros favoritos:", erro.message);
                setError("Erro ao buscar livros favoritos.");
            }
        };

        if (useId) {
            fetchFavoritosDetalhes();
        }
    }, [useId]);

    return (
        <View style={styles.container}>
            <Navbar />
            {favoritos.map((favorito, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.cardTitle}>{favorito.titulo}</Text>
                    <Text style={styles.cardAuthor}>{favorito.autor}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: 160,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "red",
        fontSize: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#888",
    },
    card: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    cardAuthor: {
        fontSize: 14,
        color: "#555",
    },
});