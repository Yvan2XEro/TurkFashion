import {View, Text} from 'react-native';
import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {StackNavigationState} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
export default function HomeStack() {
  return (
    <View>
      <Text>HomeStack</Text>
    </View>
  );
}
