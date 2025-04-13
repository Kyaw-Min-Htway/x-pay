import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ResultScreen() {
  const { data } = useLocalSearchParams();
  const router = useRouter();

  let parsedData;
  try {
    parsedData = JSON.parse(data);
  } catch {
    parsedData = { to: "အမည်မသိ", amount: 0 };
  }

  const handleTransfer = () => {
    router.push({
      pathname: "/transfer",
      params: { to: parsedData.to, amount: parsedData.amount },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>စကင်ဖတ်ရလဒ်</Text>
      <View style={styles.card}>
        <Text style={styles.label}>လက်ခံသူ: {parsedData.to}</Text>
        <Text style={styles.label}>
          ပမာဏ: {parsedData.amount || 0} MMK
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleTransfer}>
        <Text style={styles.buttonText}>လွှဲပြောင်းရန်</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  button: {
    backgroundColor: "#6d25e5",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});