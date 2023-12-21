import {Text, Pressable} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

export default function NewAddressButton() {
  const {colors} = useTheme();
  return (
    <Pressable>
      <Text style={{color: colors.text}}>New</Text>
    </Pressable>
  );
}
