import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    Dimensions,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { Avatar, Button } from "@rneui/base";
  import { Ionicons } from "@expo/vector-icons";
  import { colorsVar } from "../utils/colors";
  import { getAuth } from "../utils/util";
  import axios from "axios";
  import constants from "../utils/constants";
  import CustomAlert from "../utils/alert";
  import { TabView, SceneMap, TabBar } from "react-native-tab-view";
  import * as WebBrowser from 'expo-web-browser';
  
  const AccountTabs = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState("");
    const [manual, setManual] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: "bank", title: "Bank" },
      { key: "manual", title: "Manual" },
    ]);
    const [wema, setWema] = useState({});
    const [sterling, setSterling] = useState({});
   
    const [rolex, setRolex] = useState({});
    const [kycReq, setKycReq] = useState("")
  
    // Fetch user and accounts when component mounts
    useEffect(() => {
      const fetchUserData = async () => {
        const auth = await getAuth();
        setUser(auth);
        fetchAccounts(auth.email);
      };
      fetchUserData();
    }, []);

    const openWebsiteAsync = async () => {
        let result = await WebBrowser.openBrowserAsync('https://malambby.com.ng/mobile');

      };
  
    // Function to fetch accounts using email
    const fetchAccounts = async (email) => {
        setLoading(true);
        try {
          const data = JSON.stringify({ email });
          const response = await axios.post(
            constants.url + "fetch-virtual-accounts.php",
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const responseJson = response.data;
          console.log(responseJson)
          
          if (responseJson.status === 0) {
         // Success
  const wemabank = { account: responseJson.data.sBankNo };
  const rolexbank = { account: responseJson.data.sRolexBank };
  const sterlingbank = { account: responseJson.data.sSterlingBank };
  const manualbank = responseJson.siteAccount;
  
  setManual(manualbank);
  setWema(wemabank);
  setRolex(rolexbank);
  setSterling(sterlingbank);
          
        } else if (responseJson.status === 1) {
            setKycReq(responseJson.message);
            const manualbank = responseJson.siteAccount;
  
  setManual(manualbank);
          } else {
            CustomAlert("Failed", responseJson.message);
          }
        } catch (error) {
          CustomAlert("Error", "Failed to fetch accounts");
        } finally {
          setLoading(false);
        }
      };
  
    // Refresh control handler
    const refresh = () => {
      setRefreshing(true);
      fetchAccounts(user.email);
      setRefreshing(false);
    };
  
    // Render accounts in card format
    const renderAccount = ({ item }) => (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.accountName}</Text>
        <Text style={styles.cardSubtitle}>Account No: {item.accountNumber}</Text>
        <Text style={styles.cardSubtitle}>Bank: {item.bankName}</Text>
      </View>
    );
  
    const BankTab = () => (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        >
          {kycReq ? (
  <View style={styles.noticeContainer}>
    <Text style={styles.noticeText}>
      KYC is required. Please update your KYC details to continue using your account.
    </Text>
    <Button
      title="Update KYC"
      buttonStyle={styles.updateKycButton}
      onPress={() => {
        openWebsiteAsync()
      }}
    />
  </View>
) : (
  <>
    {wema.account && (
  <View style={styles.card}>
    <Text style={styles.cardSubtitle}>Account No: {wema.account}</Text>
    <Text style={styles.cardSubtitle}>Bank: Wema Bank</Text>
  </View>
)}

{sterling.account && (
  <View style={styles.card}>
    <Text style={styles.cardSubtitle}>Account No: {sterling.account}</Text>
    <Text style={styles.cardSubtitle}>Bank: Sterling Bank</Text>
  </View>
)}

{rolex.account && (
  <View style={styles.card}>
    <Text style={styles.cardSubtitle}>Account No: {rolex.account}</Text>
    <Text style={styles.cardSubtitle}>Bank: Rolex Bank</Text>
  </View>
)}

      
              
      
              
            </>
          )}
        </ScrollView>
      );
      
  
      const ManualTab = () => (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        >
          {manual && manual.accountName ? (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{manual.accountName}</Text>
              <Text style={styles.cardSubtitle}>Account No: {manual.accountNo}</Text>
              <Text style={styles.cardSubtitle}>Bank: {manual.bankName}</Text>
            </View>
          ) : (
            <Text style={styles.emptyText}>Manual account information is not available.</Text>
          )}
        </ScrollView>
      );
      
  
    // TabView Scenes
    const renderScene = SceneMap({
      bank: BankTab,
      manual: ManualTab,
    });
  
    return (
      <View style={styles.container}>
        <View style={styles.header_top}>
          <Text style={styles.headerText}>Accounts</Text>
          {loading ? (
            <ActivityIndicator size={28} animating={loading} color="white" />
          ) : (
            <TouchableOpacity onPress={refresh}>
              <Ionicons name="refresh" size={30} color="white" />
            </TouchableOpacity>
          )}
        </View>
  
        {/* TabView Component */}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get("window").width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={styles.tabIndicator}
              style={styles.tabBar}
              labelStyle={styles.tabLabel}
            />
          )}
        />
      </View>
    );
  };
  
  export default AccountTabs;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    header_top: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 20,
      backgroundColor: colorsVar.primaryColor,
    },
    headerText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
    },
    card: {
      backgroundColor: "#f9f9f9",
      padding: 20,
      marginVertical: 10,
      marginHorizontal: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 5,
      elevation: 3,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
    cardSubtitle: {
      fontSize: 14,
      color: "#666",
    },
    emptyText: {
      textAlign: "center",
      marginTop: 20,
      fontSize: 16,
      color: "#999",
    },
    tabBar: {
      backgroundColor: colorsVar.primaryColor,
    },
    tabLabel: {
      color: "white",
      fontSize: 16,
    },
    tabIndicator: {
      backgroundColor: "white",
    },
    noticeContainer: {
        backgroundColor: "#ffe5e5",
        padding: 20,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ff4d4d",
      },
      noticeText: {
        fontSize: 16,
        color: "#d32f2f",
        textAlign: "center",
        marginBottom: 10,
      },
      updateKycButton: {
        backgroundColor: colorsVar.primaryColor,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: "center",
      },
  });
  