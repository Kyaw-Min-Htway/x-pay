import {
  View,
  TextInput,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { MaterialIcons } from "@expo/vector-icons";

const api = "https://api.frankfurter.app/latest?from=USD";

export default function FxRate() {
  const amountInput = useRef();
  const [amount, setAmount] = useState("1");
  const [baseCurrency, setBaseCurrency] = useState("USD");

  const { isLoading, isError, error, data } = useQuery(
    ["fxrate", baseCurrency],
    async () => {
      const res = await fetch(
        `https://api.frankfurter.app/latest?from=${baseCurrency}`
      );
      const json = await res.json();
      if (!json.rates.MMK) {
        json.rates.MMK = 2100; // Mock rate: 1 USD = 2100 MMK
      }
      return json;
    },
    { keepPreviousData: true }
  );

  const handleAmountChange = (text) => {
    const cleanText = text.replace(/[^0-9.]/g, "");
    if (cleanText === "" || parseFloat(cleanText) >= 0) {
      setAmount(cleanText);
    }
  };

  const convert = (code) => {
    if (!data || !data.rates[code]) return 0;
    const value = parseFloat(amount) > 0 ? parseFloat(amount) : 1;
    return (value * data.rates[code]).toFixed(2);
  };

  const currencies = [
    { code: "MMK", icon: "currency-exchange", label: "ကျပ်" },
    { code: "EUR", icon: "euro", label: "ယူရို" },
    { code: "GBP", icon: "currency-pound", label: "ပေါင်" },
    { code: "JPY", icon: "currency-yen", label: "ယန်း" },
    { code: "CNY", icon: "currency-yuan", label: "ယွမ်" },
    { code: "INR", icon: "currency-rupee", label: "ရူပီး" },
    { code: "CAD", icon: "currency-exchange", label: "ကနေဒါဒေါ်လာ" },
    { code: "AUD", icon: "currency-exchange", label: "သြစတြေးလျဒေါ်လာ" },
    { code: "SGD", icon: "currency-exchange", label: "စင်ကာပူဒေါ်လာ" },
    { code: "THB", icon: "currency-exchange", label: "ဘတ်" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ဖလှယ်နှုန်းများ</Text>
      {isLoading ? (
        <View style={styles.center}>
          <Text style={styles.loading}>ဒေတာယူနေပါသည်...</Text>
        </View>
      ) : isError ? (
        <View style={styles.center}>
          <Text style={styles.error}>ဒေတာယူရာတွင် အမှားဖြစ်ပါသည်။</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={`ပမာဏ (${baseCurrency})`}
              ref={amountInput}
              value={amount}
              onChangeText={handleAmountChange}
              keyboardType="numeric"
              accessible
              accessibilityLabel={`ဖလှယ်ရန် ပမာဏ ${baseCurrency}`}
            />
            <TouchableOpacity
              style={styles.currencyToggle}
              onPress={() =>
                setBaseCurrency(baseCurrency === "USD" ? "MMK" : "USD")
              }
              accessible
              accessibilityLabel="ငွေကြေးပြောင်းရန်"
            >
              <Text style={styles.toggleText}>
                {baseCurrency === "USD" ? "MMK" : "USD"}
              </Text>
            </TouchableOpacity>
          </View>
          {currencies.map((currency) => (
            <View style={styles.item} key={currency.code}>
              <MaterialIcons
                name={currency.icon}
                size={24}
                color="#0e9ce2"
              />
              <Text style={styles.currencyLabel}>{currency.label}</Text>
              <Text style={styles.result}>
                {convert(currency.code)} {currency.code}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    fontSize: 16,
    color: "#6d25e5",
  },
  error: {
    fontSize: 16,
    color: "#ff009d",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: "#333",
  },
  currencyToggle: {
    backgroundColor: "#6d25e5",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  toggleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  currencyLabel: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  result: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0e9ce2",
  },
});