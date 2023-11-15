import RMasonList from 'reanimated-masonry-list';
import React from 'react';
import {Product} from '@/types/models';
import {ProductDetailsCard} from '@/components/moleculs/ProductDetailsCard';
import useCollectionData from '@/hooks/useCollectionData';

type TProps = {
  filters: Record<string, string | null>;
};

export default function ProductsList({filters}: TProps) {
  const {data: products, isLoading} = useCollectionData<Product>({
    collection: 'products',
    customQuery: query => {
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          query = query.where(key, '==', filters[key]) as any;
        }
      });
      return query as any;
    },
  });

  return (
    <RMasonList
      data={products || []}
      numColumns={2}
      onEndReachedThreshold={0.1}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.uuid}
      renderItem={({item, i}: {item: any; i: number}) => (
        <ProductDetailsCard index={i} data={item} />
      )}
    />
  );
}
