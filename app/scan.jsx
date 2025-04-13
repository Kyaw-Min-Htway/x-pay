import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    Alert,
  } from "react-native";
  import { useState, useRef } from "react";
  import { MaterialIcons } from "@expo/vector-icons";
  import { CameraView, useCameraPermissions } from "expo-camera";
  import * as Haptics from "expo-haptics";
  import { router } from "expo-router";
  
  export default function Scan() {
    const [facing, setFacing] = useState("back");
    const [torch, setTorch] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
  
    if (!permission) {
      return (
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>ကင်မရာ ခွင့်ပြုချက်ကို စစ်ဆေးနေပါသည်...</Text>
        </SafeAreaView>
      );
    }
  
    if (!permission.granted) {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.permissionText}>
            QR code စကင်ဖတ်ရန် ကင်မရာ ခွင့်ပြုချက် လိုအပ်ပါသည်။
          </Text>
          <View style={styles.permissionButton}>
            <Button title="ခွင့်ပြုရန်" onPress={requestPermission} />
          </View>
          <View style={styles.cancelButton}>
            <Button
              title="မလုပ်တော့ပါ"
              onPress={() => router.navigate("/")}
              color="red"
            />
          </View>
        </SafeAreaView>
      );
    }
  
    const toggleCameraFacing = () => {
      setFacing((current) => (current === "back" ? "front" : "back"));
    };
  
    const toggleTorch = () => {
      setTorch((current) => !current);
    };
  
    const handleBarcodeScanned = ({ type, data }) => {
      if (!scanned) {
        setScanned(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        try {
          let recipient = data;
          try {
            const parsedData = JSON.parse(data);
            recipient = parsedData.to || data; // JSON ထဲမှာ "to" ရှိရင်ယူမယ်
          } catch (e) {
            // JSON မဟုတ်ရင် ဒေတာကို တိုက်ရိုက်သုံးမယ်
          }
          if (!recipient) {
            Alert.alert("အမှား", "QR code ထဲတွင် လက်ခံသူ အချက်အလက်မရှိပါ။");
            setTimeout(() => setScanned(false), 2000);
            return;
          }
          router.navigate({
            pathname: "/transfer",
            params: { recipient },
          });
        } catch (error) {
          Alert.alert("အမှား", "QR code ဖတ်ရာတွင် ပြဿနာရှိနေပါသည်။");
          console.error("Scan error:", error);
        }
        setTimeout(() => setScanned(false), 2000);
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          enableTorch={torch}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        >
          <View style={styles.overlay}>
            <View style={styles.scanFrame}>
              <View style={styles.scanFrameCornerTopLeft} />
              <View style={styles.scanFrameCornerTopRight} />
              <View style={styles.scanFrameCornerBottomLeft} />
              <View style={styles.scanFrameCornerBottomRight} />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <MaterialIcons name="cameraswitch" size={32} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={toggleTorch}>
                <MaterialIcons
                  name={torch ? "flash-on" : "flash-off"}
                  size={32}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: "black",
    },
    camera: {
      flex: 1,
      width: "100%",
    },
    overlay: {
      flex: 1,
      backgroundColor: "transparent",
    },
    scanFrame: {
      alignSelf: "center",
      marginTop: 100,
      width: 250,
      height: 250,
      position: "relative",
    },
    scanFrameCornerTopLeft: {
      position: "absolute",
      top: -2,
      left: -2,
      width: 30,
      height: 30,
      borderTopWidth: 4,
      borderLeftWidth: 4,
      borderColor: "#00ff00",
    },
    scanFrameCornerTopRight: {
      position: "absolute",
      top: -2,
      right: -2,
      width: 30,
      height: 30,
      borderTopWidth: 4,
      borderRightWidth: 4,
      borderColor: "#00ff00",
    },
    scanFrameCornerBottomLeft: {
      position: "absolute",
      bottom: -2,
      left: -2,
      width: 30,
      height: 30,
      borderBottomWidth: 4,
      borderLeftWidth: 4,
      borderColor: "#00ff00",
    },
    scanFrameCornerBottomRight: {
      position: "absolute",
      bottom: -2,
      right: -2,
      width: 30,
      height: 30,
      borderBottomWidth: 4,
      borderRightWidth: 4,
      borderColor: "#00ff00",
    },
    buttonContainer: {
      position: "absolute",
      bottom: 64,
      left: 0,
      right: 0,
      flexDirection: "row",
      justifyContent: "center",
      gap: 20,
    },
    button: {
      padding: 15,
      backgroundColor: "rgba(0,0,0,0.7)",
      borderRadius: 50,
    },
    permissionText: {
      textAlign: "center",
      fontSize: 16,
      marginHorizontal: 20,
      color: "white",
    },
    permissionButton: {
      marginTop: 20,
      width: 250,
      alignSelf: "center",
    },
    cancelButton: {
      marginTop: 10,
      width: 250,
      alignSelf: "center",
    },
  });