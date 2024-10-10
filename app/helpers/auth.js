import React, { Component } from "react";
import { Alert, Platform } from "react-native";
import store from "react-native-simple-store";
import axios from "axios";
import constants from "./constants";

export const saveAuth = async (user) => {
  try {
    await store.save("user", user);
    console.log("User Saved");
  } catch (error) {
    console.error(error);
    Alert.alert("Error Saving User " + error);
  }
};

export const storeNotifToken = async (token) => {
  try {
    await store.save("notif", token);
    console.log("Token Saved");
  } catch (error) {
    console.error(error);
    Alert.alert("Error Saving Token " + error);
  }
};

export const saveNotifListener = async (notification) => {
  try {
    await store.save("notifListener", notification);
    console.log("Notification Listener Saved");
  } catch (error) {
    console.error(error);
    Alert.alert("Error Saving Notification Listener " + error);
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

export const getTokenFromDB = async () => {
  try {
    const token = await store.get("token");
    if (token) {
      console.log("Token retrieved:", token);
      return token;
    } else {
      console.log("No token found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching token:", error);
    Alert.alert("Error fetching token:", error.message);
    return null;
  }
};
