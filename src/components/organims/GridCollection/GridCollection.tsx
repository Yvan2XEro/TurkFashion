import {View, Text} from 'react-native';
import React from 'react';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {ProductCard} from '@/components/moleculs/ProductCard';
import {RootStackParamList} from '@/navigations/root-navigation';
import {Product} from '@/types/models';

type TProps = {
  title: string;
  rightButton: React.ReactNode;
  items: Product[];
};
export default function GridCollection({title, rightButton, items}: TProps) {
  const {colors} = useTheme();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  if (!items || !items.length) {
    return <></>;
  }
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}>
        <Text style={{fontSize: 20, fontWeight: '700', color: colors.text}}>
          {title}
        </Text>
        {rightButton}
      </View>
      <View style={{flexDirection: 'row', height: 200, gap: 12}}>
        <ProductCard
          onPress={() => {
            navigation.navigate('DetailsScreen', {
              id: items[0].id,
            });
          }}
          data={items[0]}
        />
        <View style={{flex: 0.8, gap: 12}}>
          <ProductCard
            onPress={() => {
              navigation.navigate('DetailsScreen', {
                id: items[0].id,
              });
            }}
            data={items[0]}
          />
          <ProductCard
            onPress={() => {
              navigation.navigate('DetailsScreen', {
                id: items[0].id,
              });
            }}
            data={items[0]}
          />
        </View>
      </View>
    </View>
  );
}
