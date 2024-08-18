import { View, Text, Button, ScrollView, Image, StatusBar, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomizeButton";
import { image } from "@/constants";
import { useUserContext } from "@/context/GlobalProvider";
import { getCurrentUser, signIn } from "@/lib/appwrite";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setUser} = useUserContext()

  const submit = async() => {
    if ( !form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields");
    }
    setIsSubmitting(true);
    try {
      // await account.deleteSession('current')
       await signIn(form.email, form.password);
       const result = await getCurrentUser()
       setUser(result)
       
      router.replace("/home");
    } catch (error:any) {
      Alert.alert(JSON.stringify(error.message));
    } finally {
      setIsSubmitting(false);
    }
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
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyle="mt-5"
            placeholder="abc@gmail.com"
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
