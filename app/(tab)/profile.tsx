import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons"; // Importing icons for profile and settings

const ProfilePage = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-gray-100 p-4">
        
        {/* User Information Section */}
        <View className="flex flex-row items-center bg-white p-4 rounded-xl shadow-lg mb-6">
          <Image
            source={{ uri: "https://via.placeholder.com/100" }} // Replace with actual avatar URL
            className="w-20 h-20 rounded-full"
          />
          <View className="ml-4">
            <Text className="text-2xl font-bold text-gray-800">John Doe</Text>
            <Text className="text-md text-gray-600">Professor</Text>
            <Text className="text-md text-gray-500">john.doe@college.edu</Text>
          </View>
        </View>

        {/* Attendance Summary Section */}
        <View className="mb-6 bg-white p-4 rounded-xl shadow-lg">
  <Text className="text-2xl font-bold text-gray-800 mb-4">Profile Summary</Text>

  {/* Personal Details Section */}
  <View className="mb-4">
    <Text className="text-lg font-medium text-gray-600">Name:</Text>
    <Text className="text-xl font-bold text-gray-800">John Doe</Text>
  </View>

  <View className="mb-4">
    <Text className="text-lg font-medium text-gray-600">Email:</Text>
    <Text className="text-xl font-bold text-gray-800">john.doe@college.edu</Text>
  </View>

  <View className="mb-4">
    <Text className="text-lg font-medium text-gray-600">Phone Number:</Text>
    <Text className="text-xl font-bold text-gray-800">+1 234 567 8901</Text>
  </View>

  <View className="mb-6">
    <Text className="text-lg font-medium text-gray-600">Designation:</Text>
    <Text className="text-xl font-bold text-gray-800">Professor</Text>
  </View>

  {/* Attendance Summary */}
  <Text className="text-2xl font-bold text-gray-800 mb-4">Attendance Summary</Text>
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


        {/* Settings Section */}
        <View className="bg-white p-4 rounded-xl shadow-lg">
          <Text className="text-2xl font-bold text-gray-800 mb-4">
            Settings
          </Text>

          {/* Account Settings */}
          <TouchableOpacity className="flex flex-row items-center py-4 border-b border-gray-200">
            <Ionicons name="person-outline" size={24} color="gray" />
            <Text className="ml-4 text-lg font-medium text-gray-700">
              Account Settings
            </Text>
          </TouchableOpacity>

          {/* Notification Settings */}
          <TouchableOpacity className="flex flex-row items-center py-4 border-b border-gray-200">
            <Feather name="bell" size={24} color="gray" />
            <Text className="ml-4 text-lg font-medium text-gray-700">
              Notifications
            </Text>
          </TouchableOpacity>

          {/* Privacy Settings */}
          <TouchableOpacity className="flex flex-row items-center py-4 border-b border-gray-200">
            <MaterialIcons name="lock-outline" size={24} color="gray" />
            <Text className="ml-4 text-lg font-medium text-gray-700">
              Privacy
            </Text>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity className="flex flex-row items-center py-4">
            <MaterialIcons name="logout" size={24} color="red" />
            <Text className="ml-4 text-lg font-medium text-red-600">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;