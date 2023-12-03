import React, {useEffect, useMemo, useState} from 'react';
import {
  NavigationContainer,
  Theme,
  DarkTheme,
  DefaultTheme,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import HomeStack, {TabsStackParamList} from './tab-navigation';
import {StatusBar, useColorScheme} from 'react-native';
import {DetailsScreen} from '@/screens/DetailsScreen';
import AuthNavigator from './auth-navigator';
import {useAuthStore} from '@/store/useAuthStore';
import AppProviders from '@/context/AppProviders';
import SearchScreen from '@/screens/SearchScreen';
import useTokenRefresher from '@/hooks/useTokenRefresher';

export type RootStackParamList = {
  TabsStack: NavigatorScreenParams<TabsStackParamList>;
  DetailsScreen: {
    id: number;
  };
  SearchScreen: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigationWithoutContainer() {
  useTokenRefresher();
  const colorScheme = useColorScheme();
  const {user} = useAuthStore();
  console.log('USER', user);

  if (!user) {
    return (
      <>
        <StatusBar translucent backgroundColor="transparent" />
        <AuthNavigator />
      </>
    );
  }
  return (
    <>
      <Stack.Navigator initialRouteName="TabsStack">
        <Stack.Screen
          name="TabsStack"
          component={HomeStack}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      <StatusBar
        backgroundColor={colorScheme === 'dark' ? '#000000' : '#f5f5f5'}
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
    </>
  );
}

export default function RootNavigation() {
  const colorScheme = useColorScheme();
  const theme: Theme = useMemo(
    () =>
      colorScheme === 'dark'
        ? {
            ...DarkTheme,
            colors: {
              ...DarkTheme.colors,
              primary: '#fff',
              text: '#fff',
            },
          }
        : {
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: '#f5f5f5',
              text: '#191919',
              border: '#D9D9D9',
              primary: '#191919',
            },
          },
    [colorScheme],
  );

  return (
    <NavigationContainer theme={theme}>
      <AppProviders>
        <RootNavigationWithoutContainer />
      </AppProviders>
    </NavigationContainer>
  );
}
