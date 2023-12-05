import {View, Text} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {useCartStore} from '@/store/useCartStore';
import {AppSkeletonWrapper} from '@/components/atoms/AppSkeletonWrapper';

export default function CartListSkeleton() {
  const {items} = useCartStore();

  return (
    <FlashList
      data={Array.from({length: Object.keys(items).length || 1}).map(
        (_, i) => i,
      )}
      keyExtractor={item => item + ''}
      renderItem={() => (
        <AppSkeletonWrapper>
          <View
            style={{
              height: 80,
              borderRadius: 12,
            }}
          />
        </AppSkeletonWrapper>
      )}
      estimatedItemSize={Object.keys(items).length || 0}
    />
  );
}
