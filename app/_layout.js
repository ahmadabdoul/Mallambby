import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
// import * as Sentry from "sentry-expo";

// Sentry.init({
//   dsn: "https://efbf693116c443f78dde2ec19b1947e2@o1007041.ingest.sentry.io/5969672",
//   enableInExpoDevelopment: true,
//   debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
// });

const StackLayout = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <ToastProvider>
        <Stack>
          <Stack.Screen name="customer" options={{ headerShown: false }} />

          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={{ headerShown: false }} />
          <Stack.Screen name="Landing" options={{ headerShown: false }} />
        </Stack>
      </ToastProvider>
    </ApplicationProvider>
  );
};

export default StackLayout;
