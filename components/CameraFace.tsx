import { View, Text, Alert } from "react-native";
import React from "react";
import { Camera, useCameraDevice } from "react-native-vision-camera";

const CameraFace = () => {
  return (
    <View className="flex-1 justify-center items-center ">
      <View className="border h-12 w-12">
        <Camera device={device} isActive={true} className="flex-1 " />
      </View>
    </View>
  );
};

export default CameraFace;
