import {
  View,
  Text,
  Image,
  Button,
  Alert,
  ScrollView,
  RefreshControl,
  Linking,
  StatusBar,

} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { image } from "@/constants";
import { router } from "expo-router";
import * as Location from "expo-location";
// import PermissionLocation from "@/components/PermissionLocation";

const index = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Location.requestForegroundPermissionsAsync();
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  }, []);
  const permentLocation: Location.LocationObjectCoords = {
    latitude: 28.6365382,
    longitude: 77.2728965,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  };

  const [location, setLocation] = useState<Location.LocationObject>();
  const [ustatus, setUstatus] = useState<boolean>();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      await Location.requestBackgroundPermissionsAsync();
      let statusBack = await Location.isBackgroundLocationAvailableAsync()
      if (status !== "granted" && !statusBack) {
        setUstatus(false);
        return;
      } else {
        setUstatus(true);
        const region: Location.LocationRegion[] = [
          {
            identifier: "Home aquib",
            latitude: 28.6365382,
            longitude: 77.2728965,
            radius: 1,
          },
        ];

        await Location.startGeofencingAsync("entering", region);
      }
      console.log("Location "+status);
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 h-screen w-screen">
      {ustatus ? (
        <View className="flex-1 items-center gap-20 py-20">
          <View className="items-center ">
            <Text className="text-3xl font-black">Welcome to College</Text>
            <Text>Mark your precious attendance</Text>
          </View>
          <View className="w-[300px] h-[300px] items-center">
            <Image source={image.homeImage} className="w-full h-full" />
            <View className="border-[0.3px] w-full relative bottom-5"></View>
            {/* <Text>{location?.coords.latitude}</Text>
            <Text>{location?.coords.longitude}</Text> */}
          </View>
          <View className="flex-row w-full justify-evenly">
            <Button title="Login" onPress={() => router.push("/sign-in")} />
            <Button title="Login" onPress={() => router.push("/sign-in")} />
          </View>
        </View>
      ) : (
        <View className="flex-1 h-full w-full items-center justify-center gap-y-10">
          <Text className="text-3xl font-bold text-red-600">
            Permit the location & You'r not in region
          </Text>
          <Button title="Location" onPress={() => Linking.openSettings()} />

          <Text>{location?.coords.latitude}</Text>
          <Text>{location?.coords.longitude}</Text>
        </View>
      )}
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"}/>
    </SafeAreaView>
  );
};

export default index;

//  Mosque
// latitude :28.635349
// longitute : 77.273376

/**
 * Home (Aquib)
 * latitude : 28.6365945
 * logitute : 77.2729001
 * accuracy : 100
 */
