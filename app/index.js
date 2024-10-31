import { SplashScreen, useRouter } from "expo-router";
import React from "react";
import { View, ImageBackground, Image, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';
import { colorsVar } from "./utils/colors";
import { BlurView } from 'expo-blur'; // Ensure you have expo-blur installed

export default function Splash() {
  const router = useRouter();

  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
      router.replace("login");
    }, 4000);
  }, []);

  return (
    <ImageBackground
      source={require("../assets/bby.png")} // Path to the background image
      style={styles.background}
      resizeMode="cover"
    >
      {/* Apply a blur effect to the background */}
      <BlurView intensity={50} style={StyleSheet.absoluteFillObject}>
        {/* Color overlay */}
        <View style={styles.overlay} />

        {/* Container for the loader and logo at the bottom */}
        <View style={styles.contentContainer}>
          {/* Bubble Loader above the logo */}
          <LottieView
            source={require("../assets/bubble-loader.json")}
            autoPlay
            loop
            style={styles.loader}
          />
          {/* Centered and larger logo */}
          <Image
            style={styles.logo}
            source={require("../assets/logo1.png")}
          />
        </View>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 255, 0.5)', // Adjust color and opacity to match the sample
  },
  contentContainer: {
    position: "absolute",
    bottom: 50, // Move the container lower on the screen
    alignItems: "center",
    alignSelf: "center",
    height: 240
  },
  loader: {
    width: 100,
    height: 100,
    marginBottom: 0, // Reduce space between loader and logo
  },
  logo: {
    width: 170, // Increase the logo size slightly
    height: 170,
    resizeMode: "contain",
  },
});
