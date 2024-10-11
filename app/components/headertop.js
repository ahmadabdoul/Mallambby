import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Avatar, Button } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import { colorsVar } from "../utils/colors";
import { getAuth, getUserWallet } from "../utils/util";
import axios from "axios";
import constants from "../utils/constants";
import CustomAlert from "../utils/alert";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";

const HeaderTop = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [walletStatus, setWalletStatus] = useState(false);
  const [balance, setBalance] = useState("0.00");
  const router = useRouter();

  useEffect(() => {
    const user = getAuth();
    setUser(user);
    refresh();
  }, []);

  const refresh = async () => {
    setLoading(true);
    const user = await getAuth();
    setUser(user);

    const balance = await getUserWallet(user.email);
    setBalance(balance);

    setLoading(false);
    // try {
    //   const response = await axios.post(
    //     constants.url + "fetch-wallet-account.php?email=" + user.email
    //   );

    //   const responseJson = response.data;
    //   console.log(responseJson);

    //   if (responseJson.status === 0) {
    //     console.log(responseJson);
    //     setWalletStatus(true);
    //     setBalance(responseJson.wallet.balance);

    //     setLoading(false);
    //   } else {
    //     setLoading(false);
    //     CustomAlert("Failed", responseJson.message);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setLoading(false);
    // }
  };

  return (
    <View>
      <View style={styles.header_top}>
        <View style={styles.balance_wrapper}>
          <View style={styles.balance_container_wrapper}>
            <Text style={styles.balance}>N{balance}</Text>
            {loading ? (
              <ActivityIndicator size={28} animating={loading} color="white" />
            ) : (
              <TouchableOpacity onPress={refresh}>
                <Ionicons name="refresh" size={30} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View>
          <Avatar
            size={50}
            title="sp"
            rounded
            containerStyle={{ backgroundColor: colorsVar.primaryColor }}
          />
        </View>
      </View>
      <Button
        title={"Add Money"}
        iconPosition="left"
        icon={<Ionicons name="add" color={"white"} size={24} />}
        buttonStyle={{
          marginTop: 2,
          marginBottom: 2,
          backgroundColor: colorsVar.primaryColor,
          width: "40%",
          marginLeft: 5,
          borderRadius: 10,
          fontSize: 12,
        }}
        onPress={() => router.push("screens/home/topup")}
      />
    </View>
  );
};

export default HeaderTop;

const styles = StyleSheet.create({
  header_top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  balance_wrapper: {
    display: "flex",
    justifyContent: "center",
  },
  balance_container_wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  balance: {
    fontSize: 28,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "600",
  },
});
