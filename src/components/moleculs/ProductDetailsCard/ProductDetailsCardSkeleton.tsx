import {View, StyleSheet} from 'react-native';
import React from 'react';
import {AppSkeletonWrapper} from '@/components/atoms/AppSkeletonWrapper';

export default function ProductDetailsCardSkeleton({index}: {index: number}) {
  return (
    <AppSkeletonWrapper>
      <View>
        <View
          style={{
            aspectRatio: index === 0 ? 1 : 2 / 3,
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 24,
          }}>
          <View style={StyleSheet.absoluteFill} />
        </View>
      </View>
    </AppSkeletonWrapper>
  );
}
