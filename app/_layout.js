import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastProvider } from "react-native-toast-notifications";
//import { ToastProvider } from "react-native-toast-notifications";
// import * as Sentry from "sentry-expo";

// Sentry.init({
//   dsn: "https://efbf693116c443f78dde2ec19b1947e2@o1007041.ingest.sentry.io/5969672",
//   enableInExpoDevelopment: true,
//   debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
// });

const StackLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider>
      <Stack initialRouteName="index">
        <Stack.Screen name="screens" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="landing" options={{ headerShown: false }} />
      </Stack>
      </ToastProvider>
    </GestureHandlerRootView>
  );
};

export default StackLayout;