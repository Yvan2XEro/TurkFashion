import React from 'react';
import {View, Pressable} from 'react-native';

import {useTheme} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {AppSkeletonWrapper} from '@/components/atoms/AppSkeletonWrapper';

export default function AddressCardItemSkeleton() {
  const {colors} = useTheme();
  return (
    <AppSkeletonWrapper>
      <View
        style={{
          height: 80,
        }}
      />
    </AppSkeletonWrapper>
  );
}
