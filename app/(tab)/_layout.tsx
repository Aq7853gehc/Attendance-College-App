import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants";

type TabIconProps = {
  icon?: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
};
const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="flex justify-center items-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? "font-semibold" : "font-normal"} text-xs `}>
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <Tabs
    screenOptions={{
      tabBarShowLabel:false
    }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              focused={focused}
              name="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          headerShown: false,
          title: "attendance",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.attendance}
              color={color}
              focused={focused}
              name="Attendance"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.user}
              color={color}
              focused={focused}
              name="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
