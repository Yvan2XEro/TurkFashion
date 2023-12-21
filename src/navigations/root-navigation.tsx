import React, {useEffect, useMemo} from 'react';
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
import AppProviders from '@/context/AppProviders';
import SearchScreen from '@/screens/SearchScreen';
import useTokenRefresher from '@/hooks/useTokenRefresher';
import Toast from 'react-native-toast-message';
import EditProfileScreen from '@/screens/EditProfileScreen';
import {setRootViewBackgroundColor} from '@pnthach95/react-native-root-view-background';
import AddressesScreen from '@/screens/AddressesScreen';
import {NewAddressButton} from '@/components/moleculs/NewAddressButton';

export type RootStackParamList = {
  TabsStack: NavigatorScreenParams<TabsStackParamList>;
  DetailsScreen: {
    id: number;
  };
  SearchScreen: undefined;
  EditProfileScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  InfoScreen: undefined;
  AddressesScreen: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigationWithoutContainer() {
  useTokenRefresher();
  const colorScheme = useColorScheme();

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
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{
            headerShadowVisible: false,
            title: 'Edit Profile',
          }}
        />
        <Stack.Screen
          name="AddressesScreen"
          component={AddressesScreen}
          options={{
            headerShadowVisible: false,
            title: 'Addresses',
            headerRight: () => <NewAddressButton />,
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
  useEffect(() => {
    setRootViewBackgroundColor(theme.colors.background);
  }, [theme]);

  return (
    <NavigationContainer theme={theme}>
      <AppProviders>
        <RootNavigationWithoutContainer />
        <Toast />
      </AppProviders>
    </NavigationContainer>
  );
}
