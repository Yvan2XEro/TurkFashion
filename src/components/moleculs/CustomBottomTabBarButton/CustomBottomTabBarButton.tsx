import {View, Text, Pressable} from 'react-native';
import React, {ReactNode} from 'react';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProp, useNavigation} from '@react-navigation/core';
import {RootStackScreenProps} from '@/navigations/root-navigation';
import {
  TabsNavigationProps,
  TabsStackParamList,
} from '@/navigations/tab-navigation';
import {useTheme} from '@react-navigation/native';

type TProps = {
  active: boolean;
  ionIconName: string;
  ionIconOutlineName: string;
  label: string;
  routeName: keyof TabsStackParamList;
};
export default function CustomBottomTabBarButton(props: TProps) {
  const {active, ionIconName, label, routeName, ionIconOutlineName} = props;
  const {colors} = useTheme();
  const navigation = useNavigation<TabsNavigationProps>();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(routeName);
      }}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 8,
      }}>
      <View
        style={[
          {
            width: 36,
            height: 36,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 32,
            backgroundColor: active ? colors.primary : 'transparent',
          },
        ]}>
        <Ionicons
          name={!active ? ionIconName : ionIconOutlineName}
          size={24}
          color={active ? colors.card : colors.text}
          style={{
            opacity: active ? 1 : 0.5,
          }}
        />
      </View>
      {active && (
        <Text
          style={{
            marginLeft: 4,
            fontSize: 12,
            fontWeight: '600',
            color: colors.text,
          }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
