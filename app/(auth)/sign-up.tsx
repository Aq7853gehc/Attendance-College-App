import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const SignUp = () => {
  return (
    <SafeAreaView className="flex-1">
    <View className="flex-1 items-center justify-around">
      <Text className="text-2xl font-bold">Sign UP</Text>

      <Text>Already  have an account</Text>
      <Button title="Sign in" 
      onPress={()=>router.push("")}/>
    </View>

  </SafeAreaView>
  )
}

export default SignUp