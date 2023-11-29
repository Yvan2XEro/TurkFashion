import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {Product} from '@/lib/api/products';
import CartItem from './CartItem';

type TProps = {
  items: Record<string, number>;
  products: Product[];
};
export default function CartList({products, items}: TProps) {
  return (
    <FlashList
      data={products || []}
      style={{flex: 1}}
      keyExtractor={item => item.id + ''}
      renderItem={({item}: {item: Product}) => <CartItem item={item} />}
      estimatedItemSize={Object.keys(items).length || products?.length || 0}
    />
  );
}
