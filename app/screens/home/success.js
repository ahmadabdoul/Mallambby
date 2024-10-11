import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colorsVar } from "../../utils/colors";

const success = () => {
  const router = useRouter();
  return (
    <View style={styles.MainContainer}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="checkmark-circle-outline"
          size={80}
          color={colorsVar.primaryColor}
        ></Ionicons>
        <Text style={{ color: "black" }}>Payment Confirmed!</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          router.replace("screens/home/");
        }}
        style={styles.addButton}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default success;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 20 : 20,
  },
  addButton: {
    backgroundColor: colorsVar.secondary,
    paddingVertical: 15,
    borderRadius: 9,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
});
