import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import ContentCard from "./contentcard";
import axios from "axios";
import { getAuth } from "../utils/util"; // Assuming you have a function to get the authenticated user
import constants from "../utils/constants"; // Assuming constants contains the URL

const ContentBody = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  // Fetch user and transactions when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const auth = await getAuth(); // Fetch user info
      setEmail(auth.email); // Set the email in the state
      fetchTransactions(auth.email); // Call to fetch transactions with the email
    };

    fetchUserData();
  }, []);

  // Fetch transactions from the API
  const fetchTransactions = async (userEmail) => {
    try {
      setLoading(true);
      const data = JSON.stringify({ email: userEmail });
      const response = await axios.post(
        constants.url + "fetch-transactions.php", // Modify this URL according to your backend setup
        data, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if(response.data.status == 0){
        // Sort transactions by date (assuming 'date' is in a format that allows direct sorting)
        const sortedTransactions = response.data.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        // Limit to 5 latest transactions
        const limitedTransactions = sortedTransactions.slice(0, 5);
        setTransactions(limitedTransactions);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading transactions...</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 15, gap: 10 }}>
      <View style={{ gap: 10 }}>
        <FlatList
          data={transactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ContentCard
              item={item}
            />
          )}
        />
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
