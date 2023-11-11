import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {SubCategory} from '@/types/models';
import useCollectionData from '@/hooks/useCollectionData';

type TProps = {
  category: string;
};
export default function SubCategoriesList({category}: TProps) {
  const {colors} = useTheme();
  const {data: subCategories} = useCollectionData<SubCategory>({
    collection: 'subcategories',
  });
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<
    string | null
  >(null);

  return (
    <FlatList
      data={subCategories?.filter(s => s.categoryUuid === category)}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        gap: 12,
      }}
      renderItem={({item, index}) => {
        const isSelected = selectedSubCategory === item.uuid;
        return (
          <View style={{alignItems: 'center', gap: 3}}>
            <TouchableOpacity
              onPress={() => setSelectedSubCategory(item.uuid)}
              style={{
                backgroundColor: isSelected ? colors.primary : colors.card,
                borderRadius: 100,
              }}>
              <Image
                source={{uri: item.photoUrl}}
                style={{
                  width: 50,
                  aspectRatio: 1,
                  borderRadius: 50,
                  margin: isSelected ? 2 : 0,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: isSelected ? colors.primary : colors.card,
                borderRadius: 4,
                paddingHorizontal: 5,
                paddingVertical: 1,
              }}>
              <Text
                style={{
                  alignItems: 'center',
                  color: isSelected ? colors.background : colors.text,
                }}>
                {item.name}
              </Text>
            </View>
          </View>
        );
      }}
    />
  );
}
