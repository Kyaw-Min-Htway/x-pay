import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Alert,
  } from "react-native";
  import { useState } from "react";
  import { useBalance } from "./components/BalanceContext";
  import { useRouter, useLocalSearchParams } from "expo-router";
  
  export default function Transfer() {
    const { balance, addTransaction } = useBalance();
    const router = useRouter();
    const { recipient } = useLocalSearchParams(); // QR code ကနေ လက်ခံသူဒေတာရယူမယ်
    const [to, setTo] = useState(recipient || "");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [error, setError] = useState({ to: false, amount: false });
  
    const handleTransfer = () => {
      const parsedAmount = parseFloat(amount);
      if (!to || !parsedAmount) {
        setError({ to: !to, amount: !parsedAmount });
        Alert.alert("အမှား", "လက်ခံသူ နှင့် ပမာဏ ထည့်ပါ။");
        return;
      }
      if (parsedAmount > balance) {
        setError({ to: false, amount: true });
        Alert.alert("အမှား", "လက်ကျန်ငွေ မလုံလောက်ပါ။");
        return;
      }
      if (parsedAmount < 100) {
        setError({ to: false, amount: true });
        Alert.alert("အမှား", "အနည်းဆုံး ၁၀၀ ကျပ် လွှဲပြောင်းရပါမည်။");
        return;
      }
      setError({ to: false, amount: false });
      Alert.alert(
        "အတည်ပြုရန်",
        `လက်ခံသူ: ${to}\nပမာဏ: ${parsedAmount} MMK\nမှတ်ချက်: ${note || "မရှိ"}\nဆက်လက်လွှဲပြောင်းမည်လား?`,
        [
          { text: "မလုပ်တော့ပါ", style: "cancel" },
          {
            text: "လွှဲပြောင်းမည်",
            onPress: () => {
              addTransaction({ to, amount: parsedAmount, note });
              Alert.alert("အောင်မြင်ပါသည်", "လွှဲပြောင်းမှု ပြီးဆုံးပါပြီ။");
              router.push("/");
            },
          },
        ]
      );
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.label}>လက်ခံသူ</Text>
        <TextInput
          style={[styles.input, error.to && styles.inputError, recipient && styles.inputFromQR]}
          value={to}
          onChangeText={setTo}
          placeholder="လက်ခံသူ အမည် သို့မဟုတ် အကောင့်"
          editable={!recipient} // QR code ကနေ လာရင် တည်းဖြတ်လို့မရဘူး
        />
        <Text style={styles.label}>ပမာဏ (MMK)</Text>
        <TextInput
          style={[styles.input, error.amount && styles.inputError]}
          value={amount}
          onChangeText={setAmount}
          placeholder="ပမာဏ ထည့်ပါ"
          keyboardType="numeric"
        />
        <Text style={styles.label}>မှတ်ချက် (မဖြစ်မနေ မဟုတ်ပါ)</Text>
        <TextInput
          style={styles.input}
          value={note}
          onChangeText={setNote}
          placeholder="မှတ်ချက် ထည့်ပါ"
        />
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
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#333",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 12,
      marginBottom: 20,
      fontSize: 16,
      backgroundColor: "#f5f5f5",
    },
    inputError: {
      borderColor: "red",
      borderWidth: 2,
    },
    inputFromQR: {
      borderColor: "#6d25e5",
      backgroundColor: "#e6d9ff",
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