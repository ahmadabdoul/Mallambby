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

const Electricity = () => {
  const [loading, setLoading] = useState(false);
  const [userID, setUserID] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [electricCompanies, setElectricCompanies] = useState([]);
  const [electricCompany, setElectricCompany] = useState("");
  const [meterType, setMeterType] = useState("");
  const [meterNo, setMeterNo] = useState("");
  const [amount, setAmount] = useState(0);
  const [phoneNo, setPhoneNo] = useState("");
  const [requestID, setRequestID] = useState("");
  const [callbackURL, setCallbackURL] = useState("");
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    getKeys();
    getElectricCompanies();

    console.log(apiKey);
  }, []);

  console.log(electricCompanies);

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

  const getElectricCompanies = async () => {
    try {
      const response = await axios.get(
        "https://www.nellobytesystems.com/APIElectricityDiscosV1.asp"
      );
      const data = response.data.ELECTRIC_COMPANY;

      const companies = [];
      for (const key in data) {
        const company = data[key][0];
        companies.push({
          id: company.ID,
          name: company.NAME,
          products: company.PRODUCT.map((product) => ({
            id: product.PRODUCT_ID,
            type: product.PRODUCT_TYPE,
            minimumAmount: product.MINIMUN_AMOUNT,
            maximumAmount: product.MAXIMUM_AMOUNT,
            discountAmount: product.PRODUCT_DISCOUNT_AMOUNT,
            discount: product.PRODUCT_DISCOUNT,
          })),
        });
      }

      setElectricCompanies(companies);
      // Assuming the response data is an array of electric companies
      //setElectricCompanies(data);
    } catch (error) {
      console.error("Error fetching electric companies:", error);
      return [];
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

  const buyElectricity = async () => {
    setLoading(true);
    // Perform electricity purchase
    try {
      const buyUrl = `https://www.nellobytesystems.com/APIElectricityV1.asp?UserID=${userID}&APIKey=${apiKey}&ElectricCompany=${electricCompany}&MeterType=${meterType}&MeterNo=${meterNo}&Amount=${amount}&PhoneNo=${phoneNo}&RequestID=${requestID}&CallBackURL=${callbackURL}`;
      const buyResponse = await axios.get(buyUrl);
      const buyResponseData = buyResponse.data;
      console.log("Buy response:", buyResponseData);
      // Handle buy response here...
    } catch (error) {
      console.error("Error buying electricity:", error);
    }
    setLoading(false);
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
          <Text>Select Electric Company (Min: N1000 - Max: N50,000)</Text>
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
            selectedValue={electricCompany}
            onValueChange={(itemValue, itemIndex) =>
              setElectricCompany(itemValue)
            }
          >
            <Picker.Item label="Select Electric Company" value="" />
            {electricCompanies.map((company) => (
              <Picker.Item
                key={company.id}
                label={company.name}
                value={company.id}
              />
            ))}
          </Picker>
          <Text>Select Meter Type</Text>
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
            selectedValue={meterType}
            onValueChange={(itemValue, itemIndex) => setMeterType(itemValue)}
          >
            <Picker.Item label="Select Meter Type" value="" />
            <Picker.Item label="Prepaid" value="01" />
            <Picker.Item label="Postpaid" value="02" />
          </Picker>

          <TextInput
            style={{
              marginTop: 10,
              padding: 18,
              borderRadius: 6,
              backgroundColor: colorsVar.foreground,
            }}
            placeholder="Meter Number"
            onChangeText={(text) => setMeterNo(text)}
          />

          <TextInput
            style={{
              marginTop: 10,
              padding: 18,
              borderRadius: 6,
              backgroundColor: colorsVar.foreground,
            }}
            placeholder="Amount"
            onChangeText={(text) => setAmount(parseFloat(text))}
            keyboardType="numeric"
          />

          <TextInput
            style={{
              marginTop: 10,
              marginBottom: 10,
              padding: 18,
              borderRadius: 6,
              backgroundColor: colorsVar.foreground,
            }}
            placeholder="Phone Number"
            value={phoneNo}
            onChangeText={(text) => setPhoneNo(text)}
            keyboardType="phone-pad"
          />

          <Button
            title="Buy Electricity"
            onPress={buyElectricity}
            loading={loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Electricity;

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
