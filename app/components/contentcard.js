import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colorsVar } from "../utils/colors";

const ContentCard = () => {
  return (
    <View>
      <View style={styles.card}>
        <View
          style={{
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Grocery
          </Text>
          <Text
            style={{
              color: "#777",
            }}
          >
            Grocery
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            -$500
          </Text>
          <Text style={{ alignSelf: "flex-end" }}>aug 26</Text>
        </View>
      </View>
    </View>
  );
};

export default ContentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colorsVar.foreground,
    display: "flex",
    flexDirection: "row",
    padding: 20,
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
