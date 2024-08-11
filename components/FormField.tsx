import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { image } from "@/constants";
import icon from "@/constants/icon";

type FormField = {
  title: string;
  placeholder: string;
  value: string;
  handleChangeText: ((text: string) => void) | undefined;
  otherStyle?: string;
};

const FormField = ({
  title,
  handleChangeText,
  placeholder,
  value,
  otherStyle,
  ...props
}: FormField) => {
  const [showPassword, setShowPassword] = useState<boolean>();
  return (
    <View className={`space-y-2 ${otherStyle} `}>
      <Text className="text-base font-medium text-black">{title}</Text>
      <View className="border-2 w-full h-16 bg-transparent px-4 border-neutral-400 rounded-2xl focus:border-blue-500 items-center flex-row">
        <TextInput
          className="flex-1 text-black font-medium text-base"
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={"#aaa"}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icon.eye : icon.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
