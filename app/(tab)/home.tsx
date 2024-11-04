import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons"; // Importing icons for a modern look
import { UserContext, useUserContext } from "@/context/GlobalProvider";
import { getAttData } from "@/lib/appwrite";

const StaffHomePage = () => {
  const router = useRouter();
  const {user} = useUserContext()
  console.log(user)
  
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-gray-100 p-4">
      <StatusBar barStyle={"dark-content"} />
        {/* User Information Section */}
        <View className="flex flex-row items-center bg-white p-4 rounded-xl shadow-lg mb-6">
          <Image
            source={{ uri: user?.avatar }} // Replace with actual avatar URL
            className="w-16 h-16 rounded-full"
          />
          <View className="ml-4">
            <Text className="text-xl font-bold text-gray-800">{user?.username}</Text>
            <Text className="text-md text-gray-600">{user?.email}</Text>
          </View>
        </View>

        {/* Attendance Summary Section */}
        <View className="mb-6 bg-white p-4 rounded-xl shadow-lg">
          <Text className="text-2xl font-bold text-gray-800 mb-4">
            Attendance Summary
          </Text>
          <View className="flex flex-row justify-between items-center">
            <View className="flex items-center">
              <Text className="text-3xl font-bold text-green-600">80%</Text>
              <Text className="text-lg font-medium text-gray-600">Present</Text>
            </View>
            <View className="flex items-center">
              <Text className="text-3xl font-bold text-red-600">20%</Text>
              <Text className="text-lg font-medium text-gray-600">Absent</Text>
            </View>
          </View>
        </View>

        {/* Recent Records Section */}
        <View className="mb-6">
          <View className="bg-white p-4 rounded-xl shadow-lg">
          <Text className="text-2xl font-bold text-gray-800 mb-4">
            Recent Attendance
          </Text>
            <View className="mb-4">
              <Text className="text-lg font-semibold text-gray-700">
                August 18, 2024
              </Text>
              <Text className="text-sm text-green-600 font-semibold">
                Status: Present
              </Text>
            </View>
            <View className="mb-4">
              <Text className="text-lg font-semibold text-gray-700">
                August 17, 2024
              </Text>
              <Text className="text-sm text-red-600 font-semibold">
                Status: Absent
              </Text>
            </View>
            <View>
              <Text className="text-lg font-semibold text-gray-700">
                August 16, 2024
              </Text>
              <Text className="text-sm text-green-600 font-semibold">
                Status: Present
              </Text>
            </View>
          </View>
        </View>

        {/* Mark Attendance Button */}
        <View className="mb-6">
          <TouchableOpacity
            className="bg-blue-500 py-4 px-6 rounded-xl shadow-lg flex flex-row items-center justify-center"
            onPress={() => router.push("/attendance")}
          >
            <MaterialIcons name="edit" size={24} color="white" />
            <Text className="text-white text-xl font-semibold ml-2">
              Mark Attendance
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StaffHomePage;
