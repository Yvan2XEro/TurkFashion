import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InfoScreen from '@/screens/InfoScreen';
import LoginScreen from '@/screens/LoginScreen';
import RegisterScreen from '@/screens/RegisterScreen';

type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  InfoScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();
export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="InfoScreen" component={InfoScreen} />
    </Stack.Navigator>
  );
}
