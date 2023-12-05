import {View, Text, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useColorScheme} from 'react-native';

type TProps = TouchableOpacityProps & {
  children: React.ReactNode;
};
export default function AppButton(props: TProps) {
  const {colors} = useTheme();
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          backgroundColor: colors.primary,
          borderRadius: 64,
          paddingVertical: 12,
          paddingHorizontal: 24,
        },
        props.style,
      ]}>
      {props.children}
    </TouchableOpacity>
  );
}
