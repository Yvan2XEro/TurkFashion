import React from 'react';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CustomBottomTabBarButton} from '@/components/moleculs/CustomBottomTabBarButton';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigationProp,
} from '@react-navigation/core';
import {RootStackParamList, RootStackScreenProps} from './root-navigation';
import HomeScreen from '@/screens/HomeScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CartScreen from '@/screens/CartScreen';
import PaymentScreen from '@/screens/PaymentScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import {View} from 'react-native';
import {CountInCartBadge} from '@/components/atoms/CountInCartBadge';

export type TabsStackParamList = {
  CartScreen: undefined;
  PaymentScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
};

type TabsStackParamListKey = keyof TabsStackParamList;
export type UseNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabsStackParamList, TabsStackParamListKey, undefined>,
  NativeStackNavigationProp<RootStackParamList, 'TabsStack', undefined>
>;

export type TabsStackScreenProps<T extends keyof TabsStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamList, T>,
    RootStackScreenProps<'TabsStack'>
  >;
export type TabsNavigationProps = NavigationProp<TabsStackParamList>;

const BottomTab = createBottomTabNavigator<TabsStackParamList>();

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
        component={CartScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <View>
              <CountInCartBadge />
              <CustomBottomTabBarButton
                active={focused}
                label="Cart"
                routeName="CartScreen"
                ionIconName="cart"
                ionIconOutlineName="cart-outline"
              />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="PaymentScreen"
        component={PaymentScreen}
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
        component={ProfileScreen}
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
