import {View} from 'react-native';
import React from 'react';
import {AppSkeletonWrapper} from '@/components/atoms/AppSkeletonWrapper';

export default function SubCategoriesListSkeleton() {
  return (
    <AppSkeletonWrapper>
      <View style={{flexDirection: 'row', gap: 8}}>
        {Array.from({length: 25}).map((_, index) => (
          <View
            key={index}
            style={{
              paddingHorizontal: 20,
              marginHorizontal: 1,
              paddingVertical: 8,
              borderRadius: 100,

              height: 35,
              width: 70,
            }}
          />
        ))}
      </View>
    </AppSkeletonWrapper>
  );
}
