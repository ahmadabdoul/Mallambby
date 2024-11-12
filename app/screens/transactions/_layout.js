import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { colorsVar } from "../../utils/colors";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true, title: "Transactions", headerBlurEffect: "regular", headerTransparent: true }} />
      <Stack.Screen name="receipt" options={{ headerShown: true, title: "Transaction Receipt", headerBlurEffect: "regular", headerTransparent: true }} />
    </Stack>
  );
};

export default StackLayout;
