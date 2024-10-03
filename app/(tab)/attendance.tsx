import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Alert, StatusBar } from "react-native";
// import Image from 'react-native-scalable-image';
import * as LocalAuthentication from "expo-local-authentication";
import { SafeAreaView } from "react-native-safe-area-context";

const fingerPrintImage = require("../../assets/images/fingerprint.png");

const LocalAuth = (props: any) => {
  const [compatible, isCompatible] = useState(false);
  const [fingerPrints, setFingerPrints] = useState(false);

  useEffect(() => {
    checkDeviceForHardware();
    checkForFingerprints();
  }, []);

  const checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    isCompatible(compatible);
    console.log("compatible", compatible);
  };

  const checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    setFingerPrints(fingerprints);
    console.log("fingerPrints", fingerprints);
  };

  const scanFingerprint = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authentication with fingerprint",
      fallbackLabel: "Use Passcode",
    });
    if (result.success) {
      Alert.alert("Attendance Marked");
      console.log(result);
    } else {
      Alert.alert("Attendance Marked failed");
      console.log(result);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle={"dark-content"} />
      <View className="flex-1 items-center ">
        <View className="flex-auto">
          {/* Header */}
          <Text className="text-3xl font-bold">Attendance</Text>
        </View>
        <View className="flex-[2]">{/* Face recognisation */}</View>
        <View className="flex-1 bg-white  w-screen items-center justify-center shadow-lg rounded-ss-3xl">
          {/* Biometrric authentication */}
          <TouchableOpacity onPress={() => scanFingerprint()}>
            <Image source={fingerPrintImage} className="w-32 h-32 " />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LocalAuth;
