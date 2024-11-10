import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser"; 

const HeaderList = () => {
  const router = useRouter();
  
  // Function to handle the confirmation and website redirect
  const handleComingSoon = (serviceName) => {
    Alert.alert(
      `${serviceName} Coming Soon`,
      `This service will be available soon on the app, but it's available on the website. In the meantime, you can visit our website to perform this action.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Go to Website",
          onPress: async () => {
            await WebBrowser.openBrowserAsync('https://malambby.com.ng/mobile');
          },
        },
      ],
      { cancelable: true }
    );
  };
  

  return (
    <>
      <View style={styles.header_list_wrapper}>
        <View style={styles.header_item}>
          <TouchableOpacity
            onPress={() => router.push("screens/home/airtime")}
            style={styles.header_list}
          >
            <Image
              source={require("../../assets/airtime.jpg")}
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
          <Text style={{ color: "black" }}>Airtime</Text>
        </View>

        <View style={styles.header_item}>
          <TouchableOpacity
            onPress={() => router.push("screens/home/buydata")}
            style={styles.header_list}
          >
            <Image
              source={require("../../assets/data.jpg")}
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
          <Text style={{ color: "black" }}>Data</Text>
        </View>

        <View style={styles.header_item}>
          <TouchableOpacity
            onPress={() => handleComingSoon("Cable TV")}
            style={styles.header_list}
          >
            <Image
              source={require("../../assets/tv.jpg")}
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
          <Text style={{ color: "black" }}>Cable TV</Text>
        </View>

        <TouchableOpacity
          style={styles.header_item}
          onPress={() => handleComingSoon("Electricity")}
        >
          <View style={styles.header_list}>
            <Image
              source={require("../../assets/electricity.jpg")}
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
              }}
            />
          </View>
          <Text style={{ color: "black" }}>Electricity</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 43,
          marginTop: 5,
          paddingHorizontal: 15,
        }}
      >
        <View style={styles.header_item}>
          {/* Placeholder for additional items if needed */}
        </View>
      </View>
    </>
  );
};

export default HeaderList;

const styles = StyleSheet.create({
  header_list_wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingTop: 4,
    flexWrap: "wrap",
    marginTop: 20,
  },
  header_item: {
    justifyContent: "center",
    alignItems: "center",
  },
  header_list: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
