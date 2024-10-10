import { SplashScreen, useRouter } from "expo-router";

import React from "react";
import { View, Image, Platform } from "react-native";
import { getAuth } from "./helpers/auth";
SplashScreen.preventAutoHideAsync();

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Splash() {
  const router = useRouter();
  const [isReady, setReady] = React.useState(false);
  const [user, setUser] = React.useState([]);
  React.useEffect(() => {
    const authenticate = async () => {
      // Perform some sort of async data or asset fetching.
      let userAuth = await getAuth();
      console.log(userAuth);
      setUser(userAuth);
      if (userAuth !== null) {
        setTimeout(() => {
          //console.log(user);
          // When all loading is setup, unmount the splash screen component.
          SplashScreen.hideAsync();
          setReady(true);
          router.replace("/customer");
        }, 1000);
      } else {
        setTimeout(() => {
          // When all loading is setup, unmount the splash screen component.
          SplashScreen.hideAsync();
          setReady(true);
          router.replace("Landing");
        }, 1000);
      }
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
        source={require("../assets/logo.png")}
        contentFit="cover"
        transition={1000}
      />
    </View>
  );
}
