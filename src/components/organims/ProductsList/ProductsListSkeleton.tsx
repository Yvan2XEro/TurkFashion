import React from 'react';
import RMasonList from 'reanimated-masonry-list';
import ProductDetailsCardSkeleton from '@/components/moleculs/ProductDetailsCard/ProductDetailsCardSkeleton';

export default function ProductsListSkeleton() {
  return (
    <RMasonList
      data={Array.from({length: 15}).map((_, i) => i)}
      numColumns={2}
      onEndReachedThreshold={0.1}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.toString()}
      renderItem={({i}: {item: any; i: number}) => (
        <ProductDetailsCardSkeleton index={i} />
      )}
    />
  );
}
