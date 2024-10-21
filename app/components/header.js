import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Avatar } from "@rneui/base";

import { colorsVar } from "../utils/colors";
import HeaderTop from "./headertop";
import HeaderList from "./headerlist";

const HeaderComponent = () => {
  return (
    <View style={styles.header}>
      <HeaderTop />
      <HeaderList />
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  header: {
    flex: 1.5,
    backgroundColor: colorsVar.background,
    padding: 10,
  },
});
