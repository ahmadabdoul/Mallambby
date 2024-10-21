import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
const ContentTop = () => {
  return (
    <View style={{ padding: 15, gap: 15 }}>
      <View style={styles.top}>
        <Text style={{fontSize: 18, fontWeight: "bold"}}>Recent Transactions</Text>
        <Link style={{fontSize: 14, fontWeight: "bold"}} href="../screens/transactions">See All</Link>
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
