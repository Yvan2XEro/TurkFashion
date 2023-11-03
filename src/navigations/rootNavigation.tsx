import {View, Text} from 'react-native';
import React from 'react';
import Button from '@/components/Button';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import HomeStack from './HomeStack';

export type RootBoomParamsList = {
  HomeScreen: undefined;
  CartScreen: undefined;
  PaymentScreen: undefined;
  ProfileScreen: undefined;
};

const BottomTab = createBottomTabNavigator<RootBoomParamsList>();
function RootNavigationWithoutContainer() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="HomeScreen" component={HomeStack} />
    </BottomTab.Navigator>
  );
}

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <RootNavigationWithoutContainer />
    </NavigationContainer>
  );
}
