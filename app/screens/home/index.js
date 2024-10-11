import { colorsVar } from "../../utils/colors";
import HeaderComponent from "../../components/header";
import ContentComponent from "../../components/content";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { Link } from "expo-router";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent />
      <ContentComponent />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorsVar.secondary,
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
});
