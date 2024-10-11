import { Platform, StyleSheet, Text, View, Alert } from "react-native";
import React from "react";

const CustomAlert = (title, text) => {
  return (
    <View>
      {Platform.OS === "web" ? alert(text) : Alert.alert(title, text)}
    </View>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({});