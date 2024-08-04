import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 items-center justify-center'>
        <Text className='text-3xl font-black'>
          Welcome to College
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default index