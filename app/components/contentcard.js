import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colorsVar } from "../utils/colors";
import { useRouter } from "expo-router";

const ContentCard = ({ item }) => {
  // Define transaction success based on status
  const transactionStatus = item.status == 0; // Assuming 0 is for success
  const statusColor = transactionStatus ? "green" : "red";
  const router = useRouter()

  return (
    <TouchableOpacity
  style={styles.cardContainer}
  onPress={() => router.push({ pathname: "screens/transactions/receipt", params: item })}> 
 {/* Vertical line based on status */}
      <View style={[styles.statusLine, { backgroundColor: statusColor }]} />

      {/* Card content */}
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.serviceName} numberOfLines={1}>{item.servicename}</Text>
          <Text style={styles.serviceDesc} >{item.servicedesc}</Text>
        </View>

        <View style={styles.amountContainer}>
          {item.amount !== undefined && (
            <Text style={styles.amount}>{`-N${item.amount}`}</Text>
          )}
          {item.date !== undefined && (
            <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ContentCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row", // Enables horizontal layout to include status line
    alignItems: "center",
    width: '100%', // Ensure the card takes the full width of its container
  },
  statusLine: {
    width: 5, // Thin vertical line for status
    height: "90%",
    marginRight: 10, // Add spacing between status line and card content
  },
  card: {
    flex: 1, // Takes up remaining space after the status line
    backgroundColor: colorsVar.background,
    flexDirection: "row",
    padding: 20,
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 10, // Adds spacing between cards
  },
  textContainer: {
    flexShrink: 1, // Allows the text to shrink if needed
    justifyContent: "center",
    gap: 5,
    marginRight: 10, // Adds space between text and amount
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  serviceDesc: {
    color: "#777",
    flexShrink: 1, // Allows service description to shrink to fit within the card
    width: "50%", // Ensures the text doesn't take up too much space
  },
  amountContainer: {
    alignItems: "flex-end",
    flexGrow: 1, // Allows the amount and date to grow and fit within the remaining space
  },
  amount: {
    fontSize: 16,
  },
  date: {
    alignSelf: "flex-end",
    color: "#777", // Optional: subtle color for date text
  },
});
