import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { createStackNavigator } from '@react-navigation/stack'
import About from './About'
const Maintanence = () => {
    const Stack = createStackNavigator()
  return (
   <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name='home' components={Home}/>
        <Stack.Screen name='about' components={About}/>
        <Stack.Screen name='about' components={About}/>

    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default Maintanence

const styles = StyleSheet.create({})