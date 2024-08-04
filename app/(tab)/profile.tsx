import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
    <SafeAreaView className="flex-1">
    <View className="flex-1 items-center justify-center">
      <Text>Profile</Text>
    </View>
  </SafeAreaView>
  )
}

export default Profile