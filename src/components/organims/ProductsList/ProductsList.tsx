import {FlatList, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {Product} from '@/types/models';
import MasonryList from 'reanimated-masonry-list';
import {ProductDetailsCard} from '@/components/moleculs/ProductDetailsCard';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import useCollectionData from '@/hooks/useCollectionData';
import {NavigationProp, useNavigation} from '@react-navigation/core';
import {RootStackParamList} from '@/navigations/root-navigation';

type TProps = {
  filters: Record<string, string | null>;
};

const ft = firestore();

export default function ProductsList({filters}: TProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [products, setProducts] = React.useState<Product[]>([]);

  useEffect(() => {
    let q = ft.collection('products');
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        q = q.where(key, '==', filters[key]);
      }
    });
    const subscription = q.onSnapshot(querySnapshot => {
      setProducts(querySnapshot.docs.map(doc => doc.data() as Product));
    });

    return () => {
      subscription();
    };
  }, [filters]);

  console.log(products.length, filters);

  return (
    <FlatList
      data={products || []}
      numColumns={2}
      // loading={isLoading}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index: i}) => (
        <ProductDetailsCard
          index={i}
          data={item}
          onPress={() => navigation.navigate('DetailsScreen', {id: item.uuid})}
        />
      )}
      onEndReachedThreshold={0.1}
    />
  );
}
