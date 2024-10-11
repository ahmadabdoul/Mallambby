import {
  View,
  Text,
  Platform,
  SafeAreaView,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colorsVar } from "../../utils/colors";
import { Avatar, Button } from "@rneui/base";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import constants from "../../utils/constants";
import { useRouter } from "expo-router";
import { getAuth } from "../../utils/util";
import CustomAlert from "../../utils/alert";
import * as WebBrowser from "expo-web-browser";

const BuyData = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [user, setUser] = useState("");
  //const [walletStatus, setWalletStatus] = useState(false);
  const [balance, setBalance] = useState("0.00");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const user = getAuth();
    setUser(user);

    //getWallet();
  }, []);

  // const getWallet = async () => {
  //   setLoading(true);

  //   try {
  //     const response = await axios.post(
  //       constants.url + "fetch-wallet-account.php?email=" + user.email
  //     );

  //     const responseJson = response.data;
  //     console.log(responseJson);

  //     if (responseJson.status === 0) {
  //       console.log(responseJson);
  //       setWalletStatus(true);
  //       setBalance(responseJson.balance);

  //       setLoading(false);
  //     } else {
  //       setLoading(false);
  //       CustomAlert("Failed", responseJson.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //   }
  // };

  // const createWallet = async () => {
  //   const user = await getAuth();
  //   const email = user.email;
  //   const data = JSON.stringify({
  //     email,
  //     bvn,
  //   });
  //   console.log(data);
  //   //return;
  //   setFormLoading(true);

  //   try {
  //     const response = await axios.post(
  //       constants.url + "create-wallet.php",
  //       data,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const responseJson = response.data;
  //     console.log(responseJson);

  //     if (responseJson.status === 0) {
  //       console.log(responseJson);
  //       setWalletStatus(true);
  //       setBank(bank);
  //       setNuban(nuban);

  //       setFormLoading(false);
  //     } else {
  //       setFormLoading(false);
  //       CustomAlert("Failed", responseJson.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setFormLoading(false);
  //   }
  // };

  const topup = async () => {
    const user = await getAuth();
    setUser(user);
    console.log(user.email);

    const urlz =
      constants.url + "topup.php?email=" + user.email + "&amount=" + amount;

    router.push({ pathname: "screens/home/topUp2", params: { urlz } });
    // let result = await WebBrowser.openBrowserAsync(urlz);
    // setResult(result);
  };

  const WalletForm = () => {
    return (
      <View
        style={{
          flex: 4,
          // backgroundColor: "blue",
          width: "100%",
          padding: 8,
        }}
      >
        <View style={{ marginTop: 20 }}>
          <TextInput
            placeholder="Enter Amount"
            keyboardType="numeric"
            style={{
              marginTop: 10,
              padding: 18,
              borderRadius: 6,
              backgroundColor: colorsVar.foreground,
            }}
            onChangeText={(text) => setAmount(text)}
          />
          <Text>Min: N100 - Max: N10,000</Text>
        </View>

        <Button
          buttonStyle={[
            styles.btn,
            { backgroundColor: colorsVar.primaryColor },
          ]}
          title="Topup"
          loading={formLoading}
          onPress={() => topup()}
        />
      </View>
    );
  };

  // const Wallet = () => {
  //   return (
  //     <View
  //       style={{
  //         flex: 4,
  //         // backgroundColor: "blue",
  //         width: "100%",
  //         padding: 8,
  //       }}
  //     >
  //       <View>
  //         <Text>Data Plan</Text>
  //         <Picker
  //           style={{
  //             marginTop: 10,
  //             borderWidth: 3,
  //             width: "100%",
  //             aspectRatio: 3 / 1,
  //             justifyContent: "center",
  //           }}
  //           containerStyle={{ borderRadius: 20 }}

  //           // selectedValue={selectedLanguage}
  //           // onValueChange={(itemValue, itemIndex) =>
  //           //   setSelectedLanguage(itemValue)
  //           // }
  //         >
  //           <Picker.Item
  //             style={{ color: "#777" }}
  //             label="Choose a data plan"
  //             value=""
  //           />
  //           <Picker.Item label="JavaScript" value="js" />
  //           <Picker.Item label="typescript" value="js" />
  //           <Picker.Item label="react" value="java" />
  //         </Picker>
  //       </View>
  //       <View style={{ marginTop: 20 }}>
  //         <Text>Phone Number</Text>

  //         <TextInput
  //           placeholder="Phone Number"
  //           keyboardType="numbers-and-punctuation"
  //           style={{
  //             marginTop: 10,
  //             padding: 18,
  //             borderRadius: 6,
  //             backgroundColor: "#888",
  //           }}
  //         />
  //       </View>

  //       <TouchableOpacity
  //         style={[styles.btn, { backgroundColor: colorsVar.secondary }]}
  //       >
  //         <Text style={styles.btn_text}>Sign Up</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colorsVar.background,
        }}
      >
        {WalletForm()}

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignSelf: "center",
            zIndex: 9999,
          }}
        >
          <ActivityIndicator
            size={"large"}
            color={colorsVar.secondary}
            animating={loading}
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
    backgroundColor: "white",
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
    color: "white",
  },
});
