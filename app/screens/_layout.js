import { Tabs } from "expo-router";
import React, { useState, useEffect } from "react";
import constants from "../utils/constants";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { colorsVar } from "../utils/colors";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default () => {
  return (
    <BottomSheetModalProvider>
      <Tabs initialRouteName="home">
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ focused, size }) => (
              <Ionicons
                name="home"
                size={size}
                color={focused ? colorsVar.primaryColor : "#ccc"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="transactions"
          options={{
            headerShown: false,
            tabBarLabel: "Transactions",
            tabBarIcon: ({ focused, size }) => (
              <Entypo
                name="text-document"
                size={size}
                color={focused ? colorsVar.primaryColor : "#ccc"}
              />
            ),
          }}
        />
      </Tabs>
    </BottomSheetModalProvider>
  );
};
