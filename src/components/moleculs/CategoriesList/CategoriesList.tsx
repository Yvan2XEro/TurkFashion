import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import useCollectionData from '@/hooks/useCollectionData';
import {Category} from '@/types/models';
import {SubCategoriesList} from '../SubCategoriesList';

export default function CategoriesList() {
  const {colors} = useTheme();

  const {data: categories} = useCollectionData<Category>({
    collection: 'categories',
  });

  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null,
  );

  return (
    <>
      <FlatList
        data={[
          {
            name: 'All',
            uuid: null,
          },
          ...(categories || []),
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 12,
        }}
        renderItem={({item, index}) => {
          const isSelected = selectedCategory === item.uuid;
          return (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item.uuid)}
              style={{
                backgroundColor: isSelected ? colors.primary : colors.card,
                paddingHorizontal: 20,
                paddingVertical: 8,
                borderRadius: 100,
                borderWidth: isSelected ? 0 : 1,
                borderColor: colors.border,
              }}>
              <Text
                style={{
                  color: isSelected ? colors.background : colors.text,
                  fontWeight: '600',
                  fontSize: 14,
                  opacity: isSelected ? 1 : 0.5,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      {!!selectedCategory && <SubCategoriesList category={selectedCategory} />}
    </>
  );
}
