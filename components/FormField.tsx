import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

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
    <View>
      <Text>{title}</Text>
      <View>
        <TextInput value={value} onChangeText={handleChangeText} />
      </View>
    </View>
  );
};

export default FormField;
