// PaginaInicial.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Footer from '../../componentes/footer/Footer';
import Navbar from '../../componentes/navbar/navbar';

export default function PaginaInicial() {
    return (
        <View style={styles.container}>
            <Navbar />

            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
