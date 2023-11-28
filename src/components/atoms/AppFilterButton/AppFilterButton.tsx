import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useAppBottomSheet} from '@/context/app-bottom-sheet';
import {TouchableOpacity} from 'react-native';
import {AppFilterForm} from '@/components/organims/AppFilterForm';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AppFilterButton() {
  const {colors} = useTheme();
  const {presentAppBottomSheet} = useAppBottomSheet();

  return (
    <TouchableOpacity
      onPress={() => {
        presentAppBottomSheet(<AppFilterForm />);
      }}
      style={{
        width: 52,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 52,
        backgroundColor: colors.primary,
      }}>
      <MaterialCommunityIcons
        name="tune-variant"
        size={24}
        color={colors.background}
      />
    </TouchableOpacity>
  );
}
