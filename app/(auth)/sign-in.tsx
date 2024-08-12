import { View, Text, Button, ScrollView, Image, StatusBar } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomizeButton";
import { image } from "@/constants";

const SignIn = () => {
  const [form, setForm] = useState({
    empid: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    
  };
  return (
    <SafeAreaView className="h-full">
      <StatusBar barStyle={"dark-content"}/>
      <ScrollView>
        <View className="flex-1 justify-center px-4 my-6 w-full min-h-[80vh] items-center">
          <Text className="text-2xl font-black">Welcome Back </Text>
          <Text className="text-base font-bold text-gray-400">
            Time to mark your attendance
          </Text>
          <Image source={image.loginImage} resizeMode="contain" />
          <FormField
            title="Employee Id"
            value={form.empid}
            handleChangeText={(e) => setForm({ ...form, empid: e })}
            otherStyle="mt-5"
            placeholder="Employee ID"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyle="mt-5"
            placeholder="Password"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-black/50 text-lg font-pregular">
              Don't have account?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-blue-500 font-semibold text-lg"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
