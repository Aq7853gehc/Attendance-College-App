import { View, Text, Button, ScrollView, Image, StatusBar, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomizeButton";
import { image } from "@/constants";
import { createUser } from "@/lib/appwrite";
import { Models } from "react-native-appwrite";

const SignIn = () => {
  const [form, setForm] = useState({
  empid: "",
    email:"",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async() => {
    if(!form.empid||!form.email||!form.password){
      Alert.alert("Error","Please fill all the fields")
    }
    setIsSubmitting(true)
    try {
      const result:Models.Document = await createUser(form.email,form.password,form.empid)
      router.replace('/home')
      // 
    } catch (error:any) {
      Alert.alert("Error",error.message)
    }finally {
      setIsSubmitting(false)
    }
  };
  return (
    <SafeAreaView className="h-full">
       <StatusBar barStyle={"dark-content"}/>
      <ScrollView>
        <View className="flex-1 justify-center px-4 my-4 w-full min-h-[80vh] items-center">
          <Text className="text-2xl font-black">Register here </Text>
          
          <Image source={image.loginImage} resizeMode="contain" />
          <FormField
            title="Employee Id"
            value={form.empid}
            handleChangeText={(e) => setForm({ ...form, empid: e })}
            otherStyle="mt-5"
            placeholder="Employee ID"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyle="mt-5"
            placeholder="Email"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyle="mt-5"
            placeholder="Password"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-black/50 text-lg font-pregular">
              Already have account?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-blue-500 font-semibold text-lg"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
