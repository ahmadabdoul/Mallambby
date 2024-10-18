import React, { Component } from "react";
import { Alert, Platform } from "react-native";
import store from "react-native-simple-store";
import axios from "axios";
import constants from "./constants";
import CustomAlert from "./alert";

export const saveAuth = async (user) => {
  try {
    await store.save("user", user);
    console.log("User Saved");
  } catch (error) {
    console.error(error);
    Alert.alert("Error Saving User " + error);
  }
};

export const deleteAuth = async () => {
  try {
    await store.delete("user");
    console.log("User Deleted");
  } catch (error) {
    console.error(error);
  }
};
export const getAuth = async () => {
  try {
    const user = await store.get("user");
    if (user) {
      console.log("User retrieved:", user);
      return user;
    } else {
      console.log("No user found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    Alert.alert("Error fetching user:", error.message);
    return null;
  }
};

export const getUserWallet = async (email) => {
  try {
    const data = JSON.stringify({ email });
    const response = await axios.post(
      constants.url + "fetch-wallet-account.php", data, {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = response.data;
    console.log(responseJson);

    if (responseJson.status === 0) {
      console.log(responseJson);
      return responseJson.wallet.balance;
    } else {
      CustomAlert("Failed", responseJson.message);
    }
  } catch (error) {
    console.error(error);
    CustomAlert("Failed", error);
  }
};

export const getApiWallet = async (apiKey, userID) => {
  try {
    const walletBalanceUrl = `https://www.nellobytesystems.com/APIWalletBalanceV1.asp?UserID=${userID}&APIKey=${apiKey}`;
    const response = await axios.get(walletBalanceUrl);

    const responseData = response.data;
    console.log("Wallet balance response:", responseData);

    if (responseData.balance) {
      return responseData.balance;
    } else {
      console.error("Failed to get wallet balance:", responseData);
      CustomAlert("Failed", "Failed to get wallet balance");
    }
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    CustomAlert("Failed", error);
  }
};