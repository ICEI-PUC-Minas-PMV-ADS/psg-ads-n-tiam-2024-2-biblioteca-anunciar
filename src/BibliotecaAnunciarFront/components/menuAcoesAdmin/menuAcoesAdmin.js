import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function MenuDeAcoes({ activeAction, isAdmin }) {
  return (
    <View style={styles.iconHeader}>
      {isAdmin && (
        <TouchableOpacity
          style={[
            styles.iconButton,
            activeAction === "addLivro" && styles.activeButton,
          ]}
        >
          <Icon
            name="add-circle-outline"
            size={24}
            color={activeAction === "addLivro" ? "#fff" : "#004B49"}
          />
          <Text
            style={[
              styles.iconText,
              activeAction === "addLivro" && styles.activeText,
            ]}
          >
            ADD Livro
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  iconButton: {
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
  },
  iconText: {
    marginTop: 4,
    fontSize: 12,
    color: "#000",
    textAlign: "center",
  },
  activeButton: {
    backgroundColor: "#3e706f",
  },
  activeText: {
    color: "#fff",
  },
});
