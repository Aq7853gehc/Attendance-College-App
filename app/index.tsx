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
import { Redirect, router } from "expo-router";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import CustomButton from "@/components/CustomizeButton";
import { useUserContext } from "@/context/GlobalProvider";

const permentLocation: Location.LocationRegion = {
  latitude: 28.6366129, //28.5594146
  longitude: 77.2727538, //77.2765477
  notifyOnEnter: true,

  radius: 100,
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
  // console.log(c);

  const distance = R * c; // in meters
  return distance;
};

const index = () => {
  const [location, setLocation] = useState(null);
  const [ustatus, setUstatus] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading, isLoggedIn } = useUserContext();
  useEffect(() => {
    if (!isLoading && isLoggedIn && ustatus) return router.replace("/home");
  }, [isLoading, isLoggedIn, ustatus]);

  const onRefresh = async () => {
    setRefreshing(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      setRefreshing(false);
      return;
    }

    const newLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
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
          distanceInterval: 3, //
        },
        (newLocation) => {
          setLocation(newLocation);
          const distance = haversineDistance(
            {
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
              radius: 5,
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
              {/* <Text>{location?.coords.latitude}</Text>
              <Text>{location?.coords.longitude}</Text> */}
            </View>
            <View className="flex-row w-full justify-evenly">
              <Button title="Login" onPress={() => router.push("/sign-in")} />
              <Button
                title="Register"
                onPress={() => router.push("/sign-up")}
              />
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

