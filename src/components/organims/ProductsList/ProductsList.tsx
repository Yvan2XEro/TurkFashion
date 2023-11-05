import {View} from 'react-native';
import React from 'react';
import {Product} from '@/types/models';
import MasonryList from 'reanimated-masonry-list';
import {ProductDetailsCard} from '@/components/moleculs/ProductDetailsCard';

type TProps = {
  data: Product[];
};
export default function ProductsList({data}: TProps) {
  return (
    <View>
      <MasonryList
        data={data}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item, i}: {item: any; i: number}) => (
          <ProductDetailsCard index={i} data={item} />
        )}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}
