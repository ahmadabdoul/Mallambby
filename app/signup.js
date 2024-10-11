import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
  } from "react-native";
  import { useState } from "react";
  import { colorsVar } from "./utils/colors";
  import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
  import Waves from "./Assets/ssspill1.svg";
  import { StatusBar } from "expo-status-bar";
  
  import { Icon, Button } from "@rneui/themed";
  import { useRouter } from "expo-router";
  import CustomAlert from "./utils/alert";
  import axios from "axios";
  import constants from "./utils/constants";
  import { saveAuth } from "./utils/util";
  
  const SignUpScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
  
    const [referral, setReferral] = useState("");
  
    const handleSubmit = async () => {
      if (email === "" || password === "" || fullname === "" || phone === "") {
        CustomAlert("Warning", "All fields are required");
        return;
      }
  
      const data = JSON.stringify({ email, password, fullname, referral, phone });
  
      setLoading(true);
  
      try {
        const response = await axios.post(
          constants.url + "create-account.php",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        const responseJson = response.data;
        console.log(responseJson);
  
        if (responseJson.status === 0) {
          await saveAuth(responseJson);
          console.log("saved");
  
          setLoading(false);
          router.replace("screens");
        } else {
          setLoading(false);
          CustomAlert("Failed", responseJson.message);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
  
    return (
      <SafeAreaView
        style={{
          flex: Platform.OS !== "web" && 1,
          paddingTop: Platform.OS === "android" ? 30 : 0,
          backgroundColor: colorsVar.primaryColor,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => Platform.OS !== "web" && Keyboard.dismiss()}
        >
          <View style={styles.container}>
            <View style={styles.container_childBox}>
              <View style={styles.header}>
                <View style={styles.header_text_box}>
                  <Text style={styles.header_text_h1}>Create Account</Text>
                </View>
                {/* <Waves style={styles.waves} /> */}
              </View>
              <View style={styles.content}>
                <View style={styles.content_textInput_box}>
                  <View style={styles.inputs_wrapper}>
                    <Icon
                      style={styles.inputIcon}
                      name="person"
                      type="ionicons"
                      color={colorsVar.primaryColor}
                    />
                    <TextInput
                      style={styles.content_textInput}
                      placeholder="Full Name"
                      placeholderTextColor={"#888"}
                      onChangeText={(text) => setFullname(text)}
                    />
                  </View>
                  <View style={styles.inputs_wrapper}>
                    <Icon
                      style={styles.inputIcon}
                      name="mail"
                      type="ionicons"
                      color={colorsVar.primaryColor}
                    />
                    <TextInput
                      style={styles.content_textInput}
                      placeholder="Email"
                      placeholderTextColor={"#888"}
                      secureTextEntry
                      keyboardType="email-address"
                      onChangeText={(text) => setEmail(text)}
                    />
                  </View>
                  <View style={styles.inputs_wrapper}>
                    <Icon
                      style={styles.inputIcon}
                      name="call"
                      type="ionicons"
                      color={colorsVar.primaryColor}
                    />
                    <TextInput
                      style={styles.content_textInput}
                      placeholder="Phone Number"
                      placeholderTextColor={"#888"}
                      keyboardType="numeric"
                      onChangeText={(text) => setPhone(text)}
                    />
                  </View>
                  <View style={styles.inputs_wrapper}>
                    <Icon
                      style={styles.inputIcon}
                      name="lock"
                      type="ionicons"
                      color={colorsVar.primaryColor}
                    />
                    <TextInput
                      style={styles.content_textInput}
                      placeholder="Password"
                      placeholderTextColor={"#888"}
                      secureTextEntry={false}
                      keyboardType="default"
                      onChangeText={(text) => setPassword(text)}
                    />
                  </View>
                  <View style={styles.inputs_wrapper}>
                    <Icon
                      style={styles.inputIcon}
                      name="person"
                      type="ionicons"
                      color={colorsVar.primaryColor}
                    />
                    <TextInput
                      style={styles.content_textInput}
                      placeholder="Referral Code (optional)"
                      placeholderTextColor={"#888"}
                      onChangeText={(text) => setReferral(text)}
                    />
                  </View>
                </View>
                <View style={styles.btn_box}>
                  <Button
                    buttonStyle={styles.btn}
                    title={"Create Account"}
                    loading={loading}
                    onPress={() => {
                      handleSubmit();
                    }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      margin: 10,
                      color: colorsVar.background,
                    }}
                  >
                    ---------- OR ----------
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.btn,
                      {
                        backgroundColor: "transparent",
                        borderWidth: 2,
                        borderColor: colorsVar.primaryColor,
                      },
                    ]}
                    onPress={() => router.push("login")}
                  >
                    <Text style={[styles.btn_text, { color: colorsVar.primaryColor }]}>
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  };
  
  export default SignUpScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === "android" && 30,
      backgroundColor: colorsVar.primaryColor,
    },
    container_childBox: {
      flex: 1,
      width: "100%",
      maxWidth: 700,
      marginRight: "auto",
      marginLeft: "auto",
    },
    header: {
      
      width: "100%",
      height: "20%",
      backgroundColor: colorsVar.primaryColor,
    },
    header_text_box: {
      paddingTop: 15,
      paddingLeft: 20,
      height: "70%",
      // borderWidth: 3,
      // borderColor: "black",
    },
    header_text_h1: {
      fontSize: 35,
      color: "white",
    },
    waves: {
      marginTop: "auto",
      height: "80%",
      marginBottom: "auto",
      width: "100%",
      backgroundColor: colorsVar.primaryColor,
      // borderWidth: 3,
      // borderColor: "black",
    },
    content: {
      flex: 2,
      backgroundColor: "#ffff",
      padding: 5,
      // borderWidth: 3,
      // borderColor: "black",
    },
    content_textInput_box: {
      padding: 12,
      display: "flex",
      gap: 35,
    },
    content_textInput: {
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
      borderBottomWidth: 2,
      borderBottomColor: colorsVar.primaryColor,
      color: "black",
      padding: 5,
      fontSize: 16,
    },
    btn: {
      backgroundColor: colorsVar.primaryColor,
      padding: 14,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      width: "90%",
      marginRight: "auto",
      marginLeft: "auto",
    },
    btn_text: {
      fontSize: 16,
      fontWeight: "bold",
    },
    btn_box: {
      paddingBottom: 20,
      paddingLeft: 10,
      paddingRight: 10,
    },
    inputs_wrapper: {
      marginTop: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 10,
      marginRight: 10,
    },
    inputs_icon: {
      justifyContent: "center",
      alignSelf: "flex-start",
    },
    inputs_icon_color: {
      color: "#777",
    },
    inputIcon: {
      paddingHorizontal: 8,
    },
  });