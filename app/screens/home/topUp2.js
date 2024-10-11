import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colorsVar } from "../../utils/colors";
import WebView from "react-native-webview";
import CustomAlert from "../../utils/alert";

const topUp2 = () => {
  const data = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log(data);

  useEffect(() => {
    // Add event listener for messages from iframes
  }, []);
  return (
    <View style={styles.MainContainer}>
      <StatusBar
        animated={true}
        backgroundColor={"#007445"}
        barStyle="light-content"
      />
      <View style={{ width: "100%", height: 20, flexDirection: "column" }}>
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => router.replace("../home")}
        >
          <Text style={{ color: colorsVar.secondary }}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 1500 }}>
        {Platform.OS == "web" ? (
          <iframe
            src={data.urlz}
            style={{ flex: 1 }}
            loading={() => setLoading(true)}
          />
        ) : (
          <WebView
            source={{
              uri: data.urlz,
            }}
            onLoadStart={() => {
              console.log("loading");
              setLoading(true);
            }}
            onLoadProgress={() => {
              console.log("loading");
              setLoading(true);
            }}
            onLoadEnd={() => {
              console.log(data.urlz);
              setLoading(false);
            }}
            style={{ flex: 1 }}
            automaticallyAdjustContentInsets={false}
            startInLoadingState={true}
            onMessage={(e) => {
              const resp = e.nativeEvent.data;
              CustomAlert("Notice", resp);

              console.log(resp);
              if (resp == "payment successful") {
                router.replace("screens/home/success");
              } else {
                router.back();
              }
            }}
          />
        )}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignSelf: "center",
            zIndex: 9999,
          }}
        >
          <ActivityIndicator
            animating={loading}
            size="large"
            color={colorsVar.primaryColor}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 20 : 20,
    backgroundColor: "#f3f3f3",
  },
});

export default topUp2;
