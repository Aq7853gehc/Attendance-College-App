// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  ActivityIndicator,
  Alert,
  RefreshControl,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons"; // Importing icons for a modern look
import { UserContext, useUserContext } from "@/context/GlobalProvider";
import { getAttendanceData } from "@/lib/appwrite";

const StaffHomePage = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const [refresh, setrefresh] = useState(false);
  const [attData, setAttData] = useState([]);
  // console.log("Attendance data ", attData);
  useEffect(() => {
    const fetch = async () => {
      const data = await getAttendanceData(user?.$id);
      if (data === null) {
        console.error("data not get ");
        return;
      }
      setAttData(data);
    };
    fetch();
  }, []);
  if (user === null && attData === null) {
    return (
      <View className="w-full h-screen justify-center items-center">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  const onRefresh = async () => {
    setrefresh(true);
    const data = await getAttendanceData(user?.$id);
    if (user === null && data === null) {
      setrefresh(false);
      Alert.alert("Please Login Again");
      router.replace("/sign-in");
      return;
    }
    setAttData(data);
    setrefresh(false);
  };

  return (
    <SafeAreaView className="flex-1 h-full w-full">
      <ScrollView
        className="flex-1 bg-gray-100 p-4 h-full"
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <StatusBar barStyle={"dark-content"} />
        {/* User Information Section */}
        <View className="flex flex-row items-center  bg-white p-4 rounded-xl shadow-lg mb-6">
          <Image
            source={{ uri: user?.avatar }} // Replace with actual avatar URL
            className="w-16 h-16 rounded-full"
          />
          <View className="ml-4">
            <Text className="text-xl font-bold text-gray-800">
              {user?.name}
            </Text>
            <Text className="text-md text-gray-600">{user?.email}</Text>
          </View>
        </View>
        <View className="mb-6 flex-1 ">
          <View className="bg-white p-4 rounded-xl shadow-lg">
            <Text className="text-2xl font-bold text-gray-800 mb-4">
              Recent Attendance
            </Text>
            {attData.length > 0 ? (
              <FlatList
                data={attData}
                keyExtractor={(item) => item.$id}
                scrollEnabled={false}
                renderItem={({ item }) => {
                  const formattedDate = new Date(item.date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  );
                  return (
                    <View className="mb-4">
                      <Text className="text-lg font-semibold text-gray-700">
                        {formattedDate}
                      </Text>
                      <Text
                        className={`text-sm ${
                          item.attendence ? "text-green-600" : "text-red-600"
                        } font-semibold`}
                      >
                        Status: {item.attendence ? "Present" : "Absent"}
                      </Text>
                    </View>
                  );
                }}
              />
            ) : (
              <View className="mb-6 flex-1">
                <Text className="text-center text-gray-500 text-xl font-bold ">
                  No attendance records found.
                </Text>
              </View>
            )}
          </View>
        </View>
        {/* Mark Attendance Button */}
        <View className="mb-6 flex-1">
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
