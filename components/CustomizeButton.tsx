import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: {
  title: string;
  handlePress: ((event: GestureResponderEvent) => void) | undefined;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean | undefined;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-blue-400 rounded-xl min-h-[62px] min-w-[100%] justify-center items-center shadowx  ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-lg font-psemibold text-white ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
