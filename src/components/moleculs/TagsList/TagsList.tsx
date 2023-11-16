import {Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useFiltersStore} from '@/store/useFiltersStore';

export default function TagsList() {
  const {colors} = useTheme();

  const {tags, selectedTag, setSelectedTag} = useFiltersStore();

  return (
    <>
      <FlatList
        data={[null, ...(tags || [])]}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 12,
        }}
        renderItem={({item, index}) => {
          const isSelected = selectedTag === item;
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedTag(item);
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
                {item === null ? 'All' : item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}
