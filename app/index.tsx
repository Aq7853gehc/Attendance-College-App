import { Button, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Text className="capitalize text-3xl font-bold">
          Welcome to attendance app
        </Text>
        <View className="flex-row items-center ">
          <Button title="Auth" onPress={() => router.push("/sign-in")} />
          <Button title="Home" onPress={() => router.push("/home")} />
        </View>
      </View>
    </SafeAreaView>
  );
}
