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
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { colorsVar } from "./utils/colors";
import { Icon, Button } from "@rneui/themed";
import { useRouter } from "expo-router";
import constants from "./utils/constants";
import axios from "axios";
import CustomAlert from "./utils/alert";
import { saveAuth, getAuth } from "./utils/util";
import * as LocalAuthentication from "expo-local-authentication"; // For biometric authentication

const LoginScreen = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false); // State for biometrics support
  const [savedName, setSavedName] = useState(""); // State to hold the saved user's name if it exists

  useEffect(() => {
    // Check if the device supports biometric authentication
    const checkBiometricSupport = async () => {
      const isSupported = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(isSupported);
    };

    // Check for saved authentication data and prepopulate fields
    const checkSavedAuth = async () => {
      const savedAuth = await getAuth();
      if (savedAuth) {
        setPhone(savedAuth.phone);
        setSavedName(savedAuth.name); // Assuming savedAuth contains a 'name' field
      }
    };

    checkBiometricSupport();
    checkSavedAuth();
  }, []);

  const handleSubmit = async () => {
    if (phone === "" || password === "") {
      CustomAlert("Warning", "All fields are required");
      return;
    }

    const data = JSON.stringify({ phone, password });
    console.log(data);

    setLoading(true);

    try {
      const response = await axios.post(constants.url + "login.php", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseJson = response.data;
      console.log(responseJson);

      if (responseJson.status === 0) {
        await saveAuth(responseJson.data);
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

  const handleBiometricLogin = async () => {
    try {
      // Retrieve saved authentication details
      const savedAuth = await getAuth();

      if (savedAuth === null) {
        CustomAlert("Error", "No saved user data found for biometric login.");
        return;
      }

      // Authenticate using biometrics
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Biometrics",
        fallbackLabel: "Use Password",
      });

      if (biometricAuth.success) {
        // Use saved credentials to log in if biometrics are successful
        router.replace("screens");
      } else {
        CustomAlert("Failed", "Biometric authentication failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
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
                {/* Display a personalized message if user data exists */}
                <Text style={styles.header_text_h1}>
                  {savedName ? `Welcome Back, ${savedName}` : "Welcome Back"}
                </Text>
              </View>
            </View>
            <View style={styles.content}>
              <View style={styles.content_textInput_box}>
                <View style={styles.inputs_wrapper}>
                  <Icon
                    style={styles.inputIcon}
                    name="mail"
                    type="ionicons"
                    color={colorsVar.primaryColor}
                  />
                  <TextInput
                    style={styles.content_textInput}
                    placeholder="Phone"
                    autoCapitalize="none"
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    value={phone} // Prepopulate with saved phone number
                    onChangeText={(phone) => setPhone(phone)}
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
                    secureTextEntry
                    keyboardType="default"
                    onChangeText={(password) => setPassword(password)}
                  />
                </View>
                <TouchableOpacity>
                  <Text
                    style={{
                      textAlign: "right",
                      color: "#666",
                      paddingRight: 23,
                    }}
                  >
                    Forget Password
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btn_box}>
                <View style={styles.btn_row}>
                  <Button
                    buttonStyle={[styles.btn, { width: "95%" }]}
                    title={"Login"}
                    loading={loading}
                    onPress={() => handleSubmit()}
                  />

                  {isBiometricSupported && (
                    <TouchableOpacity
                      style={styles.fingerprintButton}
                      onPress={handleBiometricLogin}
                    >
                      <Icon
                        name="finger-print"
                        type="ionicon"
                        size={30}
                        color={colorsVar.primaryColor}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    margin: 10,
                    color: colorsVar.secondary,
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
                  onPress={() => router.push("signup")}
                >
                  <Text style={[styles.btn_text, { color: colorsVar.primaryColor }]}>
                    Create Account
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

export default LoginScreen;


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
    flex: 1,
    width: "100%",
    backgroundColor: colorsVar.primaryColor,
  },
  header_text_box: {
    paddingTop: 15,
    paddingLeft: 20,
    height: "70%",
  },
  header_text_h1: {
    fontSize: 35,
    color: "white",
  },
  content: {
    flex: 2,
    backgroundColor: "#ffff",
    padding: 5,
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
    width: "95%",
    marginLeft: "auto"
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
  btn_row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  fingerprintButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: colorsVar.primaryColor,
    borderWidth: 2,
  },
  inputs_wrapper: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  inputIcon: {
    paddingHorizontal: 8,
  },
});
