import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
  } from "react-native";
  import { MaterialIcons } from "@expo/vector-icons";
  import { useBalance } from "./components/BalanceContext";
  
  export default function History() {
    const { transactions } = useBalance();
  
    const renderItem = ({ item }) => (
      <View style={styles.transaction} accessible accessibilityLabel={`လွှဲပြောင်းမှု ${item.to}`}>
        <MaterialIcons
          name="compare-arrows"
          size={32}
          color={item.amount > 0 ? "#6f6" : "#ff009d"}
        />
        <View style={styles.details}>
          <Text style={styles.text.payment}>
            {item.to} ({item.amount > 0 ? "လက်ခံ" : "ပို့လွှဲ"})
          </Text>
          <Text style={styles.text.muted}>
            {new Date(item.date).toLocaleDateString("my-MM", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>
          {item.note && <Text style={styles.text.note}>{item.note}</Text>}
        </View>
        <Text
          style={[
            styles.text.amount,
            { color: item.amount > 0 ? "#6f6" : "#ff009d" },
          ]}
        >
          {item.amount > 0 ? "+" : "-"}
          {Math.abs(item.amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          MMK
        </Text>
      </View>
    );
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>လွှဲပြောင်းမှု မှတ်တမ်း</Text>
        {transactions.length === 0 ? (
          <Text style={styles.empty}>မှတ်တမ်းမရှိပါ</Text>
        ) : (
          <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
          />
        )}
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 20,
      color: "#333",
    },
    empty: {
      textAlign: "center",
      color: "#aaa",
      fontSize: 16,
      marginTop: 50,
    },
    list: {
      paddingBottom: 20,
    },
    transaction: {
      flexDirection: "row",
      gap: 15,
      alignItems: "center",
      padding: 15,
      backgroundColor: "#f5f5f5",
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