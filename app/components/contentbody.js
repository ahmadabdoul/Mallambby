import { View, Text, StyleSheet } from "react-native";
import ContentCard from "./contentcard";

const ContentBody = () => {
  return (
    <View style={{ padding: 15, gap: 10 }}>
      <View style={{ gap: 10 }}>
        <Text style={styles.text}>Today</Text>
        <ContentCard />
      </View>
    </View>
  );
};

export default ContentBody;

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    color: "white",
    margin: 10,
    marginBottom: 15,
    color: "black",
  },
});
