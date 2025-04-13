import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { BalanceProvider } from "./components/BalanceContext";

export const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <BalanceProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="transfer" options={{ title: "ငွေလွှဲပြောင်း" }} />
          <Stack.Screen name="scan" options={{ title: "QR စကင်ဖတ်ရန်" }} />
          <Stack.Screen name="fxrate" options={{ title: "ဖလှယ်နှုန်း" }} />
          <Stack.Screen name="history" options={{ title: "မှတ်တမ်း" }} />
          <Stack.Screen name="result" options={{ title: "စကင်ဖတ်ရလဒ်" }} />
        </Stack>
      </BalanceProvider>
    </QueryClientProvider>
  );
}