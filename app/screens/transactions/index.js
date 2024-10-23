import { StyleSheet, Text, View, SafeAreaView, Platform, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ContentCard from "../../components/contentcard";
import axios from "axios";
import { getAuth } from "../../utils/util"; // Adjust path according to your structure
import constants from "../../utils/constants"; // Adjust path according to your structure

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Pull-to-refresh state
  const [visibleTransactions, setVisibleTransactions] = useState([]); // For lazy loading
  const [message, setMessage] = useState(""); // To store the response message or 'No transactions yet'

  useEffect(() => {
    fetchTransactions(); // Fetch transactions on component mount
  }, []);

  const fetchTransactions = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setLoading(true); // Show the main loader only if not refreshing
      const auth = await getAuth(); // Fetch user info
      const userEmail = auth.email;

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

      if (response.data.status === 0) {
        if (response.data.transactions.length > 0) {
          setTransactions(response.data.transactions);
          // Initially show 1.5 screens worth of transactions
          const initialVisibleCount = Math.ceil(response.data.transactions.length * 1.5);
          setVisibleTransactions(response.data.transactions.slice(0, initialVisibleCount));
        } else {
          // No transactions, set the message
          setMessage("No transactions yet");
        }
      } else {
        // If the response status isn't 0, display the error message from the API
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setMessage("Error loading transactions");
    } finally {
      setLoading(false);
      if (isRefreshing) {
        setRefreshing(false); // Stop the refreshing loader
      }
    }
  };

  const loadMoreTransactions = () => {
    // Load more transactions when the user scrolls close to the end
    const currentLength = visibleTransactions.length;
    const moreToLoad = transactions.slice(currentLength, currentLength + Math.ceil(transactions.length * 0.5));
    
    if (moreToLoad.length > 0) {
      setVisibleTransactions((prev) => [...prev, ...moreToLoad]);
    }
  };

  // Pull-to-refresh handler
  const handleRefresh = () => {
    setRefreshing(true); // Show refreshing spinner
    fetchTransactions(true); // Re-fetch transactions
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.messageText}>{message || "No transactions yet"}</Text>
    </View>
  );

  if (loading && transactions.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading transactions...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === "android" ? 70 : 0 }}>
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        {/* Conditionally render the message if there are no transactions */}
        <FlatList
          data={visibleTransactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ContentCard item={item} />
          )}
          onEndReached={loadMoreTransactions} // Load more when scrolled to the end
          onEndReachedThreshold={0.1} // Trigger loading more when 10% from the end
          ListFooterComponent={loading && <ActivityIndicator size="small" color="#0000ff" />} // Show loader at the bottom if loading

          // Pull-to-refresh props
          refreshing={refreshing} // Show the pull-to-refresh spinner
          onRefresh={handleRefresh} // Handle pull-to-refresh action
          
          ListEmptyComponent={renderEmptyComponent} // Show this when no transactions are available
        />
      </View>
    </SafeAreaView>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  messageText: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
    marginTop: 20,
  },
});
