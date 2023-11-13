import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {HiUser} from '@/components/atoms/HiUser';
import {SCREEN_PADDING_HORIZONTAL, SECTIONS_GAP} from '@/constants';
import {AppSearchBar} from '@/components/moleculs/AppSearchBar';
import {GridCollection} from '@/components/organims/GridCollection';
import {CategoriesList} from '@/components/moleculs/CategoriesList';
import {useTheme} from '@react-navigation/native';
import {ProductsList} from '@/components/organims/ProductsList';
import useCollectionData from '@/hooks/useCollectionData';
import {Product} from '@/types/models';

export default function HomeScreen() {
  const {colors} = useTheme();
  const {data} = useCollectionData<Product>({
    collection: 'products',
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{paddingHorizontal: SCREEN_PADDING_HORIZONTAL, flex: 1}}>
      <View style={{paddingVertical: 24, gap: SECTIONS_GAP}}>
        <HiUser />
        <AppSearchBar />
        <CategoriesList />
        <GridCollection
          title="New Arrivals"
          rightButton={
            <TouchableOpacity>
              <Text style={{color: colors.text}}>See all</Text>
            </TouchableOpacity>
          }
          items={data?.reverse() || []}
        />
        <ProductsList data={data || []} />
      </View>
    </ScrollView>
  );
}
