import { StyleSheet, Text, View, SafeAreaView, Platform, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ContentCard from "../../components/contentcard";
import axios from "axios";
import { getAuth } from "../../utils/util"; // Adjust path according to your structure
import constants from "../../utils/constants"; // Adjust path according to your structure

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleTransactions, setVisibleTransactions] = useState([]); // For lazy loading

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const auth = await getAuth(); // Fetch user info
        const userEmail = auth.email;

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

        if (response.data.status === 0) {
          setTransactions(response.data.transactions);
          // Initially show 1.5 screens worth of transactions
          const initialVisibleCount = Math.ceil(response.data.transactions.length * 1.5);
          setVisibleTransactions(response.data.transactions.slice(0, initialVisibleCount));
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []); // Fetch transactions on component mount

  const loadMoreTransactions = () => {
    // Load more transactions when the user scrolls close to the end
    const currentLength = visibleTransactions.length;
    const moreToLoad = transactions.slice(currentLength, currentLength + Math.ceil(transactions.length * 0.5));
    
    if (moreToLoad.length > 0) {
      setVisibleTransactions((prev) => [...prev, ...moreToLoad]);
    }
  };

  if (loading && transactions.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading transactions...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 70 : 0 }}>
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ marginBottom: 10, fontSize: 18, fontWeight: "bold" }}>
          Transactions
        </Text>
        <FlatList
          data={visibleTransactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ContentCard item={item} />
          )}
          onEndReached={loadMoreTransactions} // Load more when scrolled to the end
          onEndReachedThreshold={0.1} // Trigger loading more when 10% from the end
          ListFooterComponent={loading && <ActivityIndicator size="small" color="#0000ff" />} // Show loader at the bottom if loading
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
});
