import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons"; 
import { logoutAccount } from "@/lib/appwrite";
import { useRouter } from "expo-router";
import { useUserContext } from "@/context/GlobalProvider";

const ProfilePage = () => {
  const {user} = useUserContext()
  const router = useRouter();
  const logOut = async () => {
    await logoutAccount()
      .then(() => {
        router.replace("/");
      })
      .catch(() => {
        Alert.alert("NOT LOG-OUT yet");
      });
  };
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-gray-100 p-4">
        <StatusBar barStyle={"dark-content"} />
        {/* User Information Section */}
        <View className="flex flex-row items-center bg-white p-4 rounded-xl shadow-lg mb-6">
          <Image
            source={{ uri: user?.avatar }} // Replace with actual avatar URL
            className="w-20 h-20 rounded-full"
          />
          <View className="ml-4">
            <Text className="text-2xl font-bold text-gray-800">{user?.name}</Text>
            <Text className="text-md text-gray-600">{user?.designation}</Text>
            <Text className="text-md text-gray-500">{user?.email}</Text>
          </View>
        </View>

        {/* Attendance Summary Section */}
        <View className="mb-6 bg-white p-4 rounded-xl shadow-lg">
          <Text className="text-2xl font-bold text-gray-800 mb-4">
            Profile Summary
          </Text>

          {/* Personal Details Section */}
          <View className="mb-4">
            <Text className="text-lg font-medium text-gray-600">Name:</Text>
            <Text className="text-xl font-bold text-gray-800">{user?.name}</Text>
          </View>
          <View className="mb-4">
            <Text className="text-lg font-medium text-gray-600">User Name:</Text>
            <Text className="text-xl font-bold text-gray-800">{user?.username}</Text>
          </View>

          <View className="mb-4">
            <Text className="text-lg font-medium text-gray-600">Email:</Text>
            <Text className="text-xl font-bold text-gray-800">
              {user?.email}
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-medium text-gray-600">
              Designation:
            </Text>
            <Text className="text-xl font-bold text-gray-800">{user?.designation}</Text>
          </View>
        </View>

        {/* Settings Section */}
        <View className="bg-white p-4 rounded-xl shadow-lg">
          <Text className="text-2xl font-bold text-gray-800 mb-4">
            Settings
          </Text>

          {/* Logout */}
          <TouchableOpacity
            className="flex flex-row items-center py-4"
            onPress={() => logOut()}
          >
            <MaterialIcons name="logout" size={24} color="red" />
            <Text className="ml-4 text-lg font-medium text-red-500">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;
