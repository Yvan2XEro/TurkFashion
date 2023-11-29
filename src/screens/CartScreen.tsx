import {AnimatedHeaderWrapper} from '@/components/organims/AnimatedHeaderWrapper';
import React from 'react';
import {View} from 'react-native';
import {useCartStore} from '@/store/useCartStore';
import {CartFooter} from '@/components/moleculs/CartFooter';
import {useQuery} from '@tanstack/react-query';
import {fetchWithAuth} from '@/lib/api/app-fetch';
import {CartList} from '@/components/organims/CartList';
import {Product} from '@/lib/api/products';
import CartListSkeleton from '@/components/organims/CartList/CartListSkeleton';

export default function CartScreen() {
  const {items} = useCartStore();

  const {data: products, isLoading} = useQuery({
    queryKey: ['products', Object.keys(items)],
    enabled: Object.keys(items).length > 0,
    queryFn: async () => {
      try {
        const response = await fetchWithAuth(
          `/products/find/${Object.keys(items).join(',')}`,
        );
        const data = await response.json();
        if (response.ok) {
          return data as Product[];
        }
        return Promise.reject(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });

  return (
    <>
      <AnimatedHeaderWrapper title="Cart">
        <View style={{marginTop: 20, flex: 1}}>
          {isLoading && <CartListSkeleton />}
          {!isLoading && products && (
            <CartList items={items} products={products || []} />
          )}
        </View>
      </AnimatedHeaderWrapper>
      <CartFooter />
    </>
  );
}
