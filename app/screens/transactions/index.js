import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import React from "react";
import ContentCard from "../../components/contentcard";

const Transactions = () => {
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 70 : "" }}>
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ marginBottom: 10, fontSize: 18, fontWeight: "bold" }}>
          Transactions
        </Text>
        <ContentCard />
      </View>
    </SafeAreaView>
  );
};

export default Transactions;

const styles = StyleSheet.create({});
