import { View, Text, Image, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { image } from "@/constants";
import { router } from "expo-router";
import * as Location from "expo-location";
import PermissionLocation from "@/components/PermissionLocation";

const index = () => {
  const permentLocation:Location.LocationObjectCoords = {
    latitude:28.635349,
    longitude:77.273376,
    accuracy:50,
    altitude:null,
    altitudeAccuracy:null,
    heading:null,
    speed:null

  }

  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  
  return (
    <SafeAreaView className="flex-1 h-screen w-screen">
      {Location.PermissionStatus.DENIED && location?.coords === permentLocation  ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-500 text-3xl font-black">Permit the location AND Reach to the location </Text>
          
        </View>
      ) : (
        <View className="flex-1 items-center gap-20 py-20">
          <View className="w-[300px] h-[300px] items-center">
            <Image source={image.homeImage} className="w-full h-full" />
            <View className="border-[0.3px] w-full relative bottom-5"></View>
          </View>
          <View className="items-center ">
            <Text className="text-3xl font-black">Welcome to College</Text>
            <Text>Mark your precious attendance</Text>
          </View>
          <View className="flex-row w-full justify-evenly">
            <Button title="Login" onPress={() => router.push("/sign-in")} />
            <Button title="Login" onPress={() => router.push("/sign-in")} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default index;




//  Near my place
// latitude : 28.635349
// longitute : 77.273376