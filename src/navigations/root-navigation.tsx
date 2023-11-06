import React, {useMemo} from 'react';
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
import DetailsScreen from '@/screens/DetailsScreen';

export type RootStackParamList = {
  TabsStack: NavigatorScreenParams<TabsStackParamList>;
  DetailsScreen: {
    id: string;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const BottomTab = createNativeStackNavigator<RootStackParamList>();
function RootNavigationWithoutContainer() {
  return (
    <BottomTab.Navigator initialRouteName="TabsStack">
      <BottomTab.Screen
        name="TabsStack"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <BottomTab.Screen name="DetailsScreen" component={DetailsScreen} />
    </BottomTab.Navigator>
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
      <RootNavigationWithoutContainer />
      <StatusBar
        backgroundColor={colorScheme === 'dark' ? '#000000' : '#f5f5f5'}
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
    </NavigationContainer>
  );
}
