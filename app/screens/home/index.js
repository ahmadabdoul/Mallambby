import { colorsVar } from "../../utils/colors";
import HeaderComponent from "../../components/header";
import ContentComponent from "../../components/content";
import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
import { Link } from "expo-router";
import Carousel from "../../components/carousel";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <HeaderComponent />
      <Carousel />
      <ContentComponent />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
});
