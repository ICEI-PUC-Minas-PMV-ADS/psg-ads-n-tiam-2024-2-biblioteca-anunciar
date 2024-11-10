import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Footer() {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <View style={styles.iconContainer}>
        <Icon name="home-outline" size={30} color="black" />
        <Text style={styles.iconText}>Home</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="list-outline" size={30} color="black" />
        <Text style={styles.iconText}>Lista</Text>
      </View>
      <View
        style={styles.iconContainer}
        onTouchStart={() => navigation.navigate("BookRegistration")}
      >
        <Icon name="person-outline" size={30} color="black" />
        <Text style={styles.iconText}>Perfil</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    backgroundColor: "#E9E9E9",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  iconContainer: {
    alignItems: "center",
  },
  iconText: {
    color: "black",
    marginTop: 5,
  },
});
