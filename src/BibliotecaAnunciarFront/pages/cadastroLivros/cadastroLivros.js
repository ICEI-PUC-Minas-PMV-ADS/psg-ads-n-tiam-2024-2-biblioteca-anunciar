import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CadastroLivros() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Oiiiiiiiiii</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24, // Ajuste o tamanho conforme necessário
    },
});
