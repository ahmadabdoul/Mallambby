import {
  View,
  Text,
  Platform,
  SafeAreaView,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colorsVar } from "../../utils/colors";
import { Avatar, Button } from "@rneui/base";
import { Picker } from "@react-native-picker/picker";
import { getApiWallet, getAuth, getUserWallet } from "../../utils/util";
import axios from "axios";
import constants from "../../utils/constants";
import CustomAlert from "../../utils/alert";
import { useRouter } from "expo-router";

const BuyData = () => {
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [userID, setUserID] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [networks, setNetworks] = useState([]);
  const [user, setUser] = useState([]);
  const [network, setNetwork] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    getKeys();
    getNetworks();

    console.log(apiKey);
  }, []);

  console.log(networks);

  const getKeys = async () => {
    setLoading(true);
    const user = await getAuth();
    setUser(user);

    try {
      const response = await axios.post(constants.url + "fetch-keys.php");

      const responseJson = response.data;
      console.log(responseJson);

      if (responseJson.status === 0) {
        console.log(responseJson);
        setUserID(responseJson.keys[0].key);
        setApiKey(responseJson.keys[1].key);
        setLoading(false);
      } else {
        setLoading(false);
        CustomAlert("Failed", responseJson.message);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getNetworks = async () => {
    setLoading(true);
    const user = await getAuth();
    setUser(user);

    try {
      const response = await axios.post(
        constants.url + "fetch-mobile-network.php"
      );

      const responseJson = response.data;
      console.log(responseJson);

      if (responseJson.status === 0) {
        console.log(responseJson);
        setNetworks(responseJson.network);

        setLoading(false);
      } else {
        setLoading(false);
        CustomAlert("Failed", responseJson.message);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const buyAirtime = async () => {
    setLoading(true);

    const balance = await getUserWallet(user.email);
    const apiBalance = await getApiWallet(apiKey, userID);
    if (parseFloat(balance) > parseFloat(apiBalance)) {
      CustomAlert("Warning", "Network Error, please try again later");
      setLoading(false);
      return;
    }
    if (parseFloat(amount) > parseFloat(balance)) {
      CustomAlert("Warning", "Insufficient balance");
      setLoading(false);
      return;
    }

    try {
      const buyUrl = `https://www.nellobytesystems.com/APIAirtimeV1.asp?UserID=${userID}&APIKey=${apiKey}&MobileNetwork=${network}&Amount=${amount}&MobileNumber=${phone}&CallBackURL=${constants.url}airtime-callback.php`;

      const buyResponse = await axios.get(buyUrl);
      const buyResponseData = buyResponse.data;

      console.log("Buy response:", buyResponseData);

      // Handle buy response here...

      // Query transaction using the OrderID from buy response
      if (buyResponseData.orderid) {
        const queryUrl = `https://www.nellobytesystems.com/APIQueryV1.asp?UserID=${userID}&APIKey=${apiKey}&OrderID=${buyResponseData.orderid}`;

        const queryResponse = await axios.get(queryUrl);
        const queryResponseData = queryResponse.data;

        console.log("Query response:", queryResponseData);

        // Handle query response here...
        const newbalance = parseFloat(balance) - parseFloat(amount);
        const data = JSON.stringify({
          amountcharged: queryResponseData.amountcharged,
          mobilenumber: queryResponseData.mobilenumber,
          orderid: queryResponseData.orderid,
          status: queryResponseData.status,
          email: user.email,
          amountpaid: amount,
          balance: newbalance,
          network: queryResponseData.mobilenetwork,
        });
        console.log(data);

        try {
          const response = await axios.post(
            constants.url + "airtime-process.php",
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const responseJson = response.data;
          console.log(responseJson);

          if (responseJson.status === 0) {
            CustomAlert(responseJson.message);
            console.log("saved");

            setLoading(false);
            router.replace("../home");
          } else {
            setLoading(false);
            CustomAlert("Failed", responseJson.message);
          }
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      } else {
        CustomAlert("Warning", "All fields are required");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error buying airtime:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 4,
        }}
      >
        <View
          style={{
            flex: 4,
            // backgroundColor: "blue",
            width: "100%",
            padding: 8,
          }}
        >
          <View>
            <Text>Data Plan</Text>
            <Picker
              pickerStyleType={{
                flex: 1,
                marginTop: 20,
              }}
              style={{
                backgroundColor: colorsVar.foreground,
                borderRadius: 5,
                shadowColor: "#171717",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 10,
                height: 30,
              }}
              mode="dialog"
              selectedValue={network}
              onValueChange={(itemValue, itemIndex) => {
                setNetwork(itemValue);
                console.log(itemValue);
              }}
            >
              <Picker.Item
                style={{ color: "#777" }}
                label="Choose a data plan"
                value=""
              />
              {networks.map((service) => {
                return (
                  <Picker.Item
                    key={service.id}
                    label={service.network}
                    value={service.code}
                  />
                );
              })}
            </Picker>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text>Phone Number</Text>

            <TextInput
              placeholder="Phone Number"
              style={{
                marginTop: 10,
                padding: 18,
                borderRadius: 6,
                backgroundColor: colorsVar.foreground,
              }}
              onChangeText={(text) => setPhone(text)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text>Amount (50-50,000)</Text>

            <TextInput
              placeholder="Amount"
              style={{
                marginTop: 10,
                padding: 18,
                borderRadius: 6,
                backgroundColor: colorsVar.foreground,
              }}
              onChangeText={(text) => setAmount(text)}
              keyboardType="numeric"
            />
          </View>

          <Button
            buttonStyle={[styles.btn, { backgroundColor: colorsVar.secondary }]}
            onPress={() => buyAirtime()}
            title="Proceed"
            loading={loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BuyData;

const styles = StyleSheet.create({
  btn: {
    marginTop: 30,
    backgroundColor: colorsVar.background,
    padding: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  btn_text: {
    fontSize: 16,
    fontWeight: "bold",
    color: colorsVar.foreground,
  },
});
