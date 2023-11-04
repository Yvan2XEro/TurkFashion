import React from 'react';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CustomBottomTabBarButton} from '@/components/moleculs/CustomBottomTabBarButton';
import {CompositeScreenProps, NavigationProp} from '@react-navigation/core';
import {RootStackScreenProps} from './root-navigation';
import HomeScreen from '@/screens/HomeScreen';

const BottomTab = createBottomTabNavigator<TabsStackParamList>();
export type TabsStackParamList = {
  HomeScreen: undefined;
  CartScreen: undefined;
  PaymentScreen: undefined;
  ProfileScreen: undefined;
};

export type TabsStackScreenProps<T extends keyof TabsStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamList, T>,
    RootStackScreenProps<'TabsStack'>
  >;
export type TabsNavigationProps = NavigationProp<TabsStackParamList>;

export default function HomeStack() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <CustomBottomTabBarButton
              active={focused}
              label="Home"
              routeName="HomeScreen"
              ionIconName="home"
              ionIconOutlineName="home-outline"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="CartScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <CustomBottomTabBarButton
              active={focused}
              label="Cart"
              routeName="CartScreen"
              ionIconName="cart"
              ionIconOutlineName="cart-outline"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="PaymentScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <CustomBottomTabBarButton
              active={focused}
              label="Payments"
              routeName="PaymentScreen"
              ionIconName="wallet"
              ionIconOutlineName="wallet-outline"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <CustomBottomTabBarButton
              active={focused}
              label="Profile"
              routeName="ProfileScreen"
              ionIconName="person"
              ionIconOutlineName="person-outline"
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
