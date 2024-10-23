import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { colorsVar } from "../../utils/colors";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true, title: "Transactions" }} />
    </Stack>
  );
};

export default StackLayout;
