import { Text, View, ScrollView, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useBalance } from "./BalanceContext";

export default function Transactions() {
  const { transactions } = useBalance();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {transactions.length === 0 ? (
        <Text style={styles.emptyText}>လတ်တလော မှတ်တမ်းမရှိပါ</Text>
      ) : (
        transactions.slice(0, 5).map((transaction) => (
          <View style={styles.transaction} key={transaction.id}>
            <MaterialIcons
              name="compare-arrows"
              size={32}
              color={transaction.amount > 0 ? "#6f6" : "#ff009d"}
            />
            <View style={styles.details}>
              <Text style={styles.text.payment}>
                {transaction.to} ({transaction.amount > 0 ? "လက်ခံ" : "ပို့လွှဲ"})
              </Text>
              <Text style={styles.text.muted}>
                {new Date(transaction.date).toLocaleDateString("my-MM", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
              {transaction.note && (
                <Text style={styles.text.note}>{transaction.note}</Text>
              )}
            </View>
            <Text
              style={[
                styles.text.amount,
                { color: transaction.amount > 0 ? "#6f6" : "#ff009d" },
              ]}
            >
              {transaction.amount > 0 ? "+" : "-"}
              {Math.abs(transaction.amount).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              MMK
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  transaction: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  details: {
    flex: 1,
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 20,
  },
  text: {
    payment: {
      fontSize: 18,
      fontWeight: "600",
      color: "#333",
    },
    muted: {
      color: "#888",
      fontSize: 12,
      marginTop: 2,
    },
    note: {
      color: "#666",
      fontSize: 12,
      marginTop: 2,
    },
    amount: {
      fontSize: 16,
      fontWeight: "bold",
    },
  },
});