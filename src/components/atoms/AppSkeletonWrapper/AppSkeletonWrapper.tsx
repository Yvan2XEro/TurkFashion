import {View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useTheme} from '@react-navigation/native';

export default function AppSkeletonWrapper({children}: PropsWithChildren) {
  const {colors} = useTheme();

  return (
    <SkeletonPlaceholder
      borderRadius={4}
      speed={800}
      backgroundColor={colors.border}>
      <View style={{padding: 12}}>{children}</View>
    </SkeletonPlaceholder>
  );
}
