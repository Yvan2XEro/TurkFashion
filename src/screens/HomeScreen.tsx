import {SafeAreaView, ScrollView, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {HiUser} from '@/components/atoms/HiUser';
import {SCREEN_PADDING_HORIZONTAL, SECTIONS_GAP} from '@/constants';
import {AppSearchBar} from '@/components/moleculs/AppSearchBar';
import {GridCollection} from '@/components/organims/GridCollection';
import {CategoriesList} from '@/components/moleculs/CategoriesList';
import {useTheme} from '@react-navigation/native';
import {ProductsList} from '@/components/organims/ProductsList';
import {TabsStackScreenProps} from '@/navigations/tab-navigation';

export default function HomeScreen({
  navigation,
}: TabsStackScreenProps<'HomeScreen'>) {
  const {colors} = useTheme();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{paddingHorizontal: SCREEN_PADDING_HORIZONTAL}}>
      <SafeAreaView style={{paddingVertical: 24, gap: SECTIONS_GAP}}>
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
          items={[
            {
              id: 1,
              image:
                'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
              price: 130,
              title: 'PUMA Everyday Hussle',
            },
          ]}
        />
        <ProductsList
          data={[
            {
              id: 1,
              image:
                'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
              price: 130,
              title: 'PUMA Everyday Hussle',
            },
            {
              id: 2,
              image:
                'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
              price: 130,
              title: 'PUMA Everyday Hussle',
            },
            {
              id: 3,
              image:
                'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
              price: 130,
              title: 'PUMA Everyday Hussle',
            },
            {
              id: 4,
              image:
                'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
              price: 130,
              title: 'PUMA Everyday Hussle',
            },
            {
              id: 5,
              image:
                'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
              price: 130,
              title: 'PUMA Everyday Hussle',
            },
            {
              id: 6,
              image:
                'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
              price: 130,
              title: 'PUMA Everyday Hussle',
            },
          ]}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
