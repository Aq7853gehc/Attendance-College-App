import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import UserProvider from "@/context/GlobalProvider";

const RootLayout = () => {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tab)" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
};

export default RootLayout;
