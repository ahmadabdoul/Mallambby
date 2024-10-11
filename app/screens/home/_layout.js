import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { colorsVar } from "../../utils/colors";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="topup"
        options={{ presentation: "modal", title: "Add Money" }}
      />
      <Stack.Screen name="buydata" options={{ title: "Buy Data" }} />
      <Stack.Screen name="electricity" options={{ title: "Buy Electricity" }} />

      <Stack.Screen
        name="topUp2"
        options={{ title: "Payment", headerShown: false }}
      />
      <Stack.Screen name="success" options={{ headerShown: false }} />
    </Stack>
  );
};

export default StackLayout;
