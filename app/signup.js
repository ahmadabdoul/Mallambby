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
import { Toast, useToast } from "react-native-toast-notifications";

const SignUpScreen = () => {
  const router = useRouter();

  // Step control
  const [step, setStep] = useState(1);

  // Step 1 fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");

  // Step 2 fields
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [transactionPin, setTransactionPin] = useState("");
  //const [bvn, setBvn] = useState("");
  const [referral, setReferral] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleNextStep = () => {
    // Validate step 1
    if (firstName === "" || lastName === "" || phone === "" || email === "" || state === "") {
      toast.show("All fields in this step are required");
      return;
    }
    setStep(2);
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.show("Passwords do not match");
      return;
    }
    if (password === "" || transactionPin === "") {
      toast.show("All fields in this step are required");
      return;
    }

    const data = JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      state,
      password,
      transactionPin,
      
      referral,
    });

    setLoading(true);

    try {
      const response = await axios.post(
        constants.url + "register.php",
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
        await saveAuth(responseJson.data);
        console.log("saved");
        toast.show(responseJson.message)
        setLoading(false);
        router.replace("screens");
      } else {
        setLoading(false);
        toast.show(responseJson.message);
      }
    } catch (error) {
      console.error(error);
      toast.show(error)
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
                <Text style={styles.header_text_h1}>
                  {step === 1 ? "Create Account - Step 1" : "Create Account - Step 2"}
                </Text>
              </View>
            </View>

            <View style={styles.content}>
              {step === 1 ? (
                // Step 1 Form (Basic Information)
                <View style={styles.content_textInput_box}>
                  <View style={styles.inputs_wrapper}>
                    <Icon style={styles.inputIcon} name="person" type="ionicons" color={colorsVar.primaryColor} />
                    <TextInput
                      style={styles.content_textInput}
                      placeholder="First Name"
                      placeholderTextColor={"#888"}
                      onChangeText={(text) => setFirstName(text)}
                      value={firstName}
                    />
                  </View>

                  <View style={styles.inputs_wrapper}>
                    <Icon style={styles.inputIcon} name="person" type="ionicons" color={colorsVar.primaryColor} />
                    <TextInput
                      style={styles.content_textInput}
                      placeholder="Last Name"
                      placeholderTextColor={"#888"}
                      onChangeText={(text) => setLastName(text)}
                      value={lastName}
                    />
                  </View>

                  <View style={styles.inputs_wrapper}>
                    <Icon style={styles.inputIcon} name="call" type="ionicons" color={colorsVar.primaryColor} />
                    <TextInput
                      style={styles.content_textInput}
                      placeholder="Phone Number"
                      placeholderTextColor={"#888"}
                      keyboardType="numeric"
                      onChangeText={(text) => setPhone(text)}
                      value={phone}
                    />
                  </View>

                  <View style={styles.inputs_wrapper}>
                    <Icon style={styles.inputIcon} name="mail" type="ionicons" color={colorsVar.primaryColor} />
                    <TextInput
                      style={styles.content_textInput}
                      placeholder="Email"
                      placeholderTextColor={"#888"}
                      keyboardType="email-address"
                      onChangeText={(text) => setEmail(text)}
                      value={email}
                    />
                  </View>

                  <View style={styles.inputs_wrapper}>
                    <Icon style={styles.inputIcon} name="person" type="ionicons" color={colorsVar.primaryColor} />
                    <TextInput
                      style={styles.content_textInput}
                      placeholder="State"
                      placeholderTextColor={"#888"}
                      onChangeText={(text) => setState(text)}
                      value={state}
                    />
                  </View>

 {/* Adjusted to handle single button layout */}
      <Button 
        buttonStyle={styles.fullWidthBtn} 
        title={"Next"} 
        onPress={handleNextStep} 
      />
                </View>
              ) : (
                // Step 2 Form (Security and BVN)
                <View style={styles.content_textInput_box}>
                  <View style={styles.inputs_wrapper}>
                    <Icon style={styles.inputIcon} name="lock" type="ionicons" color={colorsVar.primaryColor} />
                    <TextInput
                      style={styles.content_textInput}
                      placeholder="Password"
                      placeholderTextColor={"#888"}
                      secureTextEntry
                      onChangeText={(text) => setPassword(text)}
                      value={password}
                    />
                  </View>

                  <View style={styles.inputs_wrapper}>
                    <Icon style={styles.inputIcon} name="lock" type="ionicons" color={colorsVar.primaryColor} />
                    <TextInput
                      style={styles.content_textInput}
                      placeholder="Confirm Password"
                      placeholderTextColor={"#888"}
                      secureTextEntry
                      onChangeText={(text) => setConfirmPassword(text)}
                      value={confirmPassword}
                    />
                  </View>

                  <View style={styles.inputs_wrapper}>
                    <Icon style={styles.inputIcon} name="key" type="ionicons" color={colorsVar.primaryColor} />
                    <TextInput
                      style={styles.content_textInput}
                      placeholder="Transaction Pin"
                      placeholderTextColor={"#888"}
                      secureTextEntry
                      onChangeText={(text) => setTransactionPin(text)}
                      value={transactionPin}
                    />
                  </View>

                  {/* <View style={styles.inputs_wrapper}>
                    <Icon style={styles.inputIcon} name="shield" type="ionicons" color={colorsVar.primaryColor} />
                    <TextInput
                      style={styles.content_textInput}
                      placeholder="BVN"
                      placeholderTextColor={"#888"}
                      keyboardType="numeric"
                      onChangeText={(text) => setBvn(text)}
                    />
                  </View> */}
                  <View style={styles.inputs_wrapper}>
                    <Icon style={styles.inputIcon} name="person" type="ionicons" color={colorsVar.primaryColor} />
                    <TextInput
                      style={styles.content_textInput}
                      placeholder="Referral Code (optional)"
                      placeholderTextColor={"#888"}
                      onChangeText={(text) => setReferral(text)}
                      value={referral}
                    />
                  </View>

                  {/* <Text style={styles.notice}>
                    Your BVN is required for account verification. We don’t store your BVN; it is used solely for account verification by our payment partners to create virtual accounts.
                  </Text> */}

                  

                   {/* Adjusted to handle two buttons */}
      <Button 
        buttonStyle={[styles.btn, styles.secondaryBtn]} 
        title={"Back"} 
        titleStyle={{color: colorsVar.primaryColor}} 
        onPress={handlePreviousStep} 
      />
      <Button 
        buttonStyle={styles.primaryBtn} 
        title={"Create Account"} 
        loading={loading} 
        onPress={handleSubmit} 
      />
    </View>

                
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUpScreen;
const styles = StyleSheet.create({
  // General Container Styles
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 0,
    backgroundColor: "whitesmoke",
  },

  btn_box_single: {
    width: "100%", // Ensure buttons take full width
    alignItems: "center", // Center the button within the box
    marginTop: 20, // Add some space above the button
  },
  fullWidthBtn: {
    backgroundColor: colorsVar.primaryColor,
    width: "100%", // Ensure button takes full width
    paddingVertical: 12, // Add padding for better touchability
    borderRadius: 5, // Rounded corners
  },
  // Second Step Button (Side-by-side)
  btn_box_double: {
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row", // Side by side layout
    justifyContent: "space-between",
    alignItems: "center",
  },
  primaryBtn: {
    backgroundColor: colorsVar.primaryColor,
    padding: 14,
    borderRadius: 10,
    width: "70%", // Wider create account button
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colorsVar.primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: "25%", // Smaller back button
    justifyContent: "center",
    alignItems: "center",
  },

  // Other Styles
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
  inputs_wrapper: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  inputIcon: {
    paddingHorizontal: 8,
  },
  notice: {
    marginLeft: 20,
    marginRight: 20,
    color: "#888",
    fontSize: 14,
    marginBottom: 15,
  },
});
