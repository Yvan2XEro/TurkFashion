import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
const CATEGORIES = [
  'Clothing',
  'Shoes',
  'Accessories',
  'Accessories 2',
  'Accessories 3',
  'Accessories 4',
];
export default function CategoriesList() {
  const {colors} = useTheme();

  return (
    <FlatList
      data={CATEGORIES}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        gap: 12,
      }}
      renderItem={({item, index}) => {
        const isSelected = 0 === index;
        return (
          <TouchableOpacity
            // onPress={() => setCategoryIndex(index)}
            style={{
              backgroundColor: isSelected ? colors.primary : colors.card,
              paddingHorizontal: 20,
              paddingVertical: 12,
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
              {item}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}
