import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const SignIn = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold">SignIn</Text>
        
        <Text>Don't have account</Text>
        <Button title="Sign up" onPress={() => router.push("/sign-up")} />
        <Button title="Home" onPress={() => router.push("/home")} />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
