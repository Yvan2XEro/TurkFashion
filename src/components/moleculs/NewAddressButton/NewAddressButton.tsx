import {Text, Pressable} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useAppBottomSheet} from '@/context/app-bottom-sheet';
import {EditAddressForm} from '@/components/organims/EditAddressForm';

export default function NewAddressButton() {
  const {colors} = useTheme();
  const {presentAppBottomSheet} = useAppBottomSheet();
  return (
    <Pressable onPress={() => presentAppBottomSheet(<EditAddressForm />)}>
      <Text style={{color: colors.text}}>New</Text>
    </Pressable>
  );
}
