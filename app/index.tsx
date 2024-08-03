import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  return (
   <SafeAreaView className="flex-1">
    <View className="flex-1 items-center justify-center">
      <Text className="capitalize text-3xl font-bold">
        Welcome to attendance app
      </Text>
    </View>
   </SafeAreaView>
  );
}
