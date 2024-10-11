import { View, Text, StyleSheet } from "react-native";
import React from "react";

const ContentTop = () => {
  return (
    <View style={{ padding: 15, gap: 15 }}>
      <View style={styles.top}>
        <Text>Recent Transactions</Text>
        <Text>See All</Text>
      </View>
      <View style={styles.category_wrapper}>
        <View style={styles.category}>
          <Text>All</Text>
        </View>
        <View style={styles.category}>
          <Text>All</Text>
        </View>
        <View style={styles.category}>
          <Text>All</Text>
        </View>
      </View>
    </View>
  );
};

export default ContentTop;

const styles = StyleSheet.create({
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  category_wrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  category: {
    backgroundColor: "white",
    padding: 5,
    width: 50,
    alignItems: "center",
    borderRadius: 5,
  },
});
