import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useBalance } from "./BalanceContext";

export default function BalanceCard() {
  const { balance } = useBalance();

  return (
    <LinearGradient
      colors={["#6d25e5", "#0e9ce2"]}
      style={styles.container}
    >
      <Text style={styles.label}>လက်ကျန်ငွေ</Text>
      <Text style={styles.amount}>
        {balance.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{" "}
        MMK
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    marginTop: 50,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    color: "#fff",
    fontSize: 16,
  },
  amount: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
  },
});