import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colorsVar } from "../utils/colors";
import { getAuth } from "../utils/util";
import axios from "axios";
import constants from "../utils/constants";
import CustomAlert from "../utils/alert";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Button } from "@rneui/base";
import * as WebBrowser from 'expo-web-browser';
import * as Clipboard from 'expo-clipboard'; // Import the clipboard functionality

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
  const [kycReq, setKycReq] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = await getAuth();
      setUser(auth);
      fetchAccounts(auth.email);
    };
    fetchUserData();
  }, []);

  const openWebsiteAsync = async () => {
    await WebBrowser.openBrowserAsync('https://malambby.com.ng/mobile');
  };

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
        const wemabank = { account: responseJson.data.sBankNo };
        const rolexbank = { account: responseJson.data.sRolexBank };
        const sterlingbank = { account: responseJson.data.sSterlingBank };
        const manualbank = responseJson.data.siteAccount;

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

  const refresh = () => {
    setRefreshing(true);
    fetchAccounts(user.email);
    setRefreshing(false);
  };

  const BankTab = () => (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
      style={styles.scrollViewContainer}
    >
      {kycReq ? (
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>
            KYC is required. Please update your KYC details to continue using your account.
          </Text>
          <Button
            title="Update KYC"
            buttonStyle={styles.updateKycButton}
            onPress={openWebsiteAsync}
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

 


const ManualTab = () => {
  const copyToClipboard = () => {
    const accountDetails = `Account Name: ${manual.accountName}, Account No: ${manual.accountNo}, Bank: ${manual.bankName}`;
    Clipboard.setString(accountDetails);
    CustomAlert("Copied", "Account details copied to clipboard!");
  };

  const contactAdmin = async() => {
    await WebBrowser.openBrowserAsync('https://wa.me/+2348062278474');
  };

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
      style={styles.scrollViewContainer}
    >
      {manual && manual.accountName && manual.accountNo && manual.bankName ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{manual.accountName}</Text>
          <Text style={styles.cardSubtitle}>Account No: {manual.accountNo}</Text>
          <Text style={styles.cardSubtitle}>Bank: {manual.bankName}</Text>

          {/* Buttons Container */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
              <Ionicons name="copy" size={20} color="white" />
              <Text style={styles.buttonText}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={contactAdmin}>
              <Ionicons name="logo-whatsapp" size={20} color="white" />
              <Text style={styles.buttonText}>Contact Admin</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.emptyText}>Manual account information is not available.</Text>
      )}
    </ScrollView>
  );
};


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
    backgroundColor: "#fff", // Set the entire container's background to white
    height: "100%",
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
  scrollViewContainer: {
    backgroundColor: "#fff", // Ensure the ScrollView background is white
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colorsVar.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "48%", // To make the buttons side by side and of equal width
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5, // To provide some space between the icon and text
  },
  
});
