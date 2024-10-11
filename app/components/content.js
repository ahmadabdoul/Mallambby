import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colorsVar } from "../utils/colors";
import ContentTop from "./contenttop";
import ContentBody from "./contentbody";

const ContentComponent = () => {
  return (
    <View style={styles.content}>
      <ContentTop />
      <ContentBody />
    </View>
  );
};

export default ContentComponent;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: colorsVar.secondary,
    padding: 10,
  },
  header_top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 5,
  },
  avatar: {
    backgroundColor: "blue",
  },
  container: {
    backgroundColor: colorsVar.secondary,
    flex: 1,
  },
  header_list: {
    backgroundColor: "white",
    width: 60,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  header_list_wrapper: {
    padding: 5,
  },

  content: {
    flex: 2,
    padding: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colorsVar.background,
  },
  category: {
    backgroundColor: "white",
    padding: 5,
    width: 50,
    alignItems: "center",
    borderRadius: 5,
  },
});
