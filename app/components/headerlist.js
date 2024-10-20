import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const HeaderList = () => {
  const router = useRouter();
  const topup = async () => {
    return topup();
  };

  return (
    <>
      <View style={styles.header_list_wrapper}>
        <View style={styles.header_item}>
          <TouchableOpacity
            onPress={() => router.push("screens/home/buydata")}
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
          <Text style={{ color: "#ffff" }}>Airtime</Text>
        </View>
        <View style={styles.header_item}>
          <View style={styles.header_list}>
            <Image
              source={require("../../assets/data.jpg")}
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
              }}
            />
          </View>
          <Text style={{ color: "#ffff" }}>Data</Text>
        </View>
        <View style={styles.header_item}>
          <View style={styles.header_list}>
            <Image
              source={require("../../assets/tv.jpg")}
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
              }}
            />
          </View>
          <Text style={{ color: "#ffff" }}>Cable Tv</Text>
        </View>
        <TouchableOpacity
          style={styles.header_item}
          onPress={() => router.push("screens/home/electricity")}
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
          <Text style={{ color: "#ffff" }}>Electricity</Text>
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
          <TouchableOpacity
            onPress={() => router.push("screens/home/buydata")}
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
          <Text style={{ color: "#ffff" }}>Airtime</Text>
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
