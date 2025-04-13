import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
  } from "react-native";
  import { LinearGradient } from "expo-linear-gradient";
  import Transactions from "./components/Transactions";
  import ActionButton from "./components/ActionButton";
  import BalanceCard from "./components/BalanceCard";
  
  export default function Home() {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["rgba(0,0,0,0.8)", "transparent"]}
          style={styles.background}
        />
        <View>
          <BalanceCard />
          <View style={styles.actions}>
            <ActionButton
              color="#ff009d"
              icon="compare-arrows"
              label="လွှဲပြောင်း"
              path="/transfer"
            />
            <ActionButton
              color="#0e9ce2"
              icon="qr-code-2"
              label="စကင်ဖတ်ရန်"
              path="/scan"
            />
            <ActionButton
              color="#7b48f4"
              icon="attach-money"
              label="ဖလှယ်နှုန်း"
              path="/fxrate"
            />
            <ActionButton
              color="#ff379e"
              icon="history"
              label="မှတ်တမ်း"
              path="/history"
            />
          </View>
          <View style={styles.moreActionBar}></View>
          <View style={styles.transactions}>
            <Text style={styles.text.label}>လတ်တလော လွှဲပြောင်းမှုများ</Text>
            <Transactions />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    background: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 100,
      height: 300,
    },
    container: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? 25 : 0,
      backgroundColor: "#6d25e5",
    },
    actions: {
      paddingTop: 30,
      paddingHorizontal: 25,
      paddingBottom: 25,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    moreActionBar: {
      width: 100,
      height: 4,
      backgroundColor: "#ddd",
      borderRadius: 50,
      alignSelf: "center",
      marginBottom: 8,
    },
    transactions: {
      padding: 20,
      gap: 10,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: "#f1f1f1",
      flex: 1,
    },
    text: {
      label: {
        fontWeight: "bold",
        color: "#aaa",
        fontSize: 16,
      },
    },
  });