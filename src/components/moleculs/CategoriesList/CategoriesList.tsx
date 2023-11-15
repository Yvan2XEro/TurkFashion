import {Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {SubCategoriesList} from '../SubCategoriesList';
import {useFiltersStore} from '@/store/useFiltersStore';

type TProps = {
  selectedCategory: string | null;
  setSelectedCategory: (c: string | null) => void;
  selectedSubCategory: string | null;
  setSelectedSubCategory: React.Dispatch<React.SetStateAction<string | null>>;
};
export default function CategoriesList(props: TProps) {
  const {selectedCategory, setSelectedCategory, ...rest} = props;
  const {colors} = useTheme();

  const {categories, setActiveCategory} = useFiltersStore();

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
              onPress={() => {
                setActiveCategory(item.uuid);
                setSelectedCategory(item.uuid);
              }}
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
      {!!selectedCategory && (
        <SubCategoriesList category={selectedCategory} {...rest} />
      )}
    </>
  );
}
