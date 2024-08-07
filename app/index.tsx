// @ts-nocheck
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
import * as TaskManager from "expo-task-manager";
// import PermissionLocation from "@/components/PermissionLocation";

const permentLocation: Location.LocationRegion = {
  latitude: 28.6365382,
  longitude: 77.2728965,
  radius: 50,
};

const haversineDistance = (
  coords1: Location.LocationRegion,
  coords2: Location.LocationRegion
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const R = 6371e3; // Earth radius in meters
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);
  const deltaLat = toRad(coords2.latitude - coords1.latitude);
  const deltaLon = toRad(coords2.longitude - coords1.longitude);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // in meters
  return distance;
};

const index = () => {
  const [location, setLocation] = useState(null);
  const [ustatus, setUstatus] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const permentLocation = {
    latitude: 28.6365382,
    longitude: 77.2728965,
    radius: 50, // Example radius in meters
  };

  const haversineDistance = (coords1, coords2) => {
    // Haversine formula implementation
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(coords2.latitude - coords1.latitude);
    const dLon = toRad(coords2.longitude - coords1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coords1.latitude)) *
        Math.cos(toRad(coords2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d * 1000; // Distance in meters
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      setRefreshing(false);
      return;
    }

    const newLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    setLocation(newLocation);
    const distance = haversineDistance(
      {
        latitude: newLocation.coords.latitude,
        longitude: newLocation.coords.longitude,
        radius: 0,
      },
      permentLocation
    );

    if (distance <= permentLocation.radius) {
      setUstatus(true);
    } else {
      setUstatus(false);
    }

    setRefreshing(false);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Update every 1 seconds
          distanceInterval: 2, // Update every 10 meters
        },
        (newLocation) => {
          setLocation(newLocation);
          const distance = haversineDistance(
            {
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
              radius: 0,
            },
            permentLocation
          );

          if (distance <= permentLocation.radius) {
            setUstatus(true);
          } else {
            setUstatus(false);
          }
        }
      );

      return () => {
        locationSubscription.remove();
      };
    })();
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       Alert.alert("Permission to access location was denied");
  //       return;
  //     }

  //     const locationSubscription = await Location.watchPositionAsync(
  //       {
  //         accuracy: Location.Accuracy.High,
  //         timeInterval: 1000, // Update every 1 seconds
  //         distanceInterval: 2, // Update every 10 meters
  //       },
  //       (newLocation) => {
  //         setLocation(newLocation);
  //         const distance = haversineDistance(
  //           {
  //             latitude: newLocation.coords.latitude,
  //             longitude: newLocation.coords.longitude,
  //             radius: 0,
  //           },
  //           permentLocation
  //         );

  //         if (distance <= permentLocation.radius) {
  //           setUstatus(true);
  //         } else {
  //           setUstatus(false);
  //         }
  //       }
  //     );

  //     return () => {
  //       locationSubscription.remove();
  //     };
  //   })();
  // }, []);

  return (
    <SafeAreaView className="flex-1 h-screen w-screen">
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <ScrollView
        className="flex"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {ustatus ? (
          <View className="flex-1 items-center gap-20 py-20">
            <View className="items-center ">
              <Text className="text-3xl font-black">Welcome to College</Text>
              <Text>Mark your precious attendance</Text>
            </View>
            <View className="w-[300px] h-[300px] items-center">
              <Image source={image.homeImage} className="w-full h-full" />
              <View className="border-[0.3px] w-full relative bottom-5"></View>
              <Text>{location?.coords.latitude}</Text>
              <Text>{location?.coords.longitude}</Text>
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
            <Text>{location?.coords.latitude}</Text>
            <Text>{location?.coords.longitude}</Text>
            <Button title="Location" onPress={() => Linking.openSettings()} />
          </View>
        )}
      </ScrollView>
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

/**
 * import { GeofencingEventType } from 'expo-location';
import * as TaskManager from 'expo-task-manager';

 TaskManager.defineTask(YOUR_TASK_NAME, ({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  if (eventType === GeofencingEventType.Enter) {
    console.log("You've entered region:", region);
  } else if (eventType === GeofencingEventType.Exit) {
    console.log("You've left region:", region);
  }
});
 */
