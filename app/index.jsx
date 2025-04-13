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
                colors={["#4b21b0", "#8a4af3"]} // Updated gradient for vibrancy
                style={styles.background}
            />
            <View style={styles.header}>
                <Text style={styles.logoText}>XPay</Text>
            </View>
            <View style={styles.content}>
                <BalanceCard />
                <View style={styles.actions}>
                    <ActionButton
                        color="#ff009d"
                        icon="compare-arrows"
                        label="Transfer "
                        path="/transfer"
                    />
                    <ActionButton
                        color="#0e9ce2"
                        icon="qr-code-2"
                        label="Scan QR "
                        path="/scan"
                    />
                    <ActionButton
                        color="#7b48f4"
                        icon="attach-money"
                        label="Fx Rate "
                        path="/fxrate"
                    />
                    <ActionButton
                        color="#ff379e"
                        icon="history"
                        label="History "
                        path="/history"
                    />
                </View>
                <View style={styles.divider} />
                <View style={styles.transactions}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>
                    <Transactions />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5", // Light background for contrast
        paddingTop: Platform.OS === "android" ? 30 : 0,
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "40%", // Gradient covers header area
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: "center",
    },
    logoText: {
        fontSize: 32,
        fontWeight: "800",
        color: "#fff",
        letterSpacing: 2,
        textTransform: "uppercase",
        fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "Roboto", // Modern font
    },
    content: {
        flex: 1,
        paddingHorizontal: 15,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    divider: {
        width: 120,
        height: 5,
        backgroundColor: "#e0e0e0",
        borderRadius: 50,
        alignSelf: "center",
        marginVertical: 10,
    },
    transactions: {
        flex: 1,
        backgroundColor: "#fff", // White for a clean look
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        elevation: 5, // Subtle shadow for Android
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333",
        marginBottom: 15,
    },
});