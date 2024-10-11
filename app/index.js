import { SplashScreen, useRouter } from "expo-router";

import React from "react";
import { View, Image, Platform } from "react-native";
import { getAuth } from "./utils/util";
SplashScreen.preventAutoHideAsync();

export default function Splash() {
  const router = useRouter();
  const [isReady, setReady] = React.useState(false);
  const [user, setUser] = React.useState([]);
  React.useEffect(() => {
    const authenticate = async () => {
      
        setTimeout(() => {
          // When all loading is setup, unmount the splash screen component.
          SplashScreen.hideAsync();
          setReady(true);
          router.replace("login");
        }, 4000);
      
    };
    authenticate();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00445",
      }}
    >
      <Image
        style={{
          width: 200,
          height: 200,
          resizeMode: "contain",
          justifyContent: "center",
          alignItems: "center",
        }}
        source={require("../assets/images/logo.png")}
        contentFit="cover"
        transition={1000}
      />
    </View>
  );
}