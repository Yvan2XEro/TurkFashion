import {View, Text} from 'react-native';
import React from 'react';
import {AppSkeletonWrapper} from '@/components/atoms/AppSkeletonWrapper';
export function CategoryItemSkeleton() {
  return (
    <AppSkeletonWrapper>
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
          borderRadius: 8,
        }}>
        <View style={{width: 40, height: 40, borderRadius: 40}} />
        <View style={{height: 16, width: 160}} />
      </View>
    </AppSkeletonWrapper>
  );
}
