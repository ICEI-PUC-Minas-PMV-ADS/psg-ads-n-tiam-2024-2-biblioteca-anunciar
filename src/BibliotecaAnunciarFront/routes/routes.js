import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PaginaInicial from "../pages/cadastroLivros/PaginaInicial";
import CadastroLivros from "../pages/cadastroLivros/cadastroLivros";
import Footer from "../components/footer/Footer";
import LoginScreen from "../components/LoginScreen/LoginScreen";
import SignupScreen from "../components/SingupScreen/SingUpScreen";

const Tela = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
    <Tela.Navigator initialRouteName="Home">
      <Tela.Screen
        name="Home"
        component={PaginaInicial}
        options={{ headerShown: false }}
      />
      <Tela.Screen
        name="BookRegistration"
        component={CadastroLivros}
        options={{ headerShown: false }}
      />
       <Tela.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Tela.Screen
        name="Singup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Tela.Navigator>
    <Footer />
  </NavigationContainer>
  );
}