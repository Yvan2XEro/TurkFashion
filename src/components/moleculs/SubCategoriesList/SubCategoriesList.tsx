import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useFiltersStore} from '@/store/useFiltersStore';
import {useQuery} from 'react-query';
import {universalFetch} from '@/lib/api/universalfetch';
import {FlashList} from '@shopify/flash-list';
import {SubCategory} from '@/lib/api/sub-categories';
import {substr} from '@/lib/utils/string';
import SubCategoriesListSkeleton from './SubCategoriesListSkeleton';

type TProps = {
  selectedSubCategory: number | null;
  setSelectedSubCategory: React.Dispatch<React.SetStateAction<number | null>>;
};
export default function SubCategoriesList(props: TProps) {
  const {selectedSubCategory, setSelectedSubCategory} = props;
  const {colors} = useTheme();
  const [page, setPage] = React.useState(1);
  const {isLoading, data: subCategories} = useQuery({
    queryKey: ['sub-categories'],
    queryFn: () =>
      universalFetch<SubCategory>({
        limit: 100,
        page,
        path: '/sub-categories',
      }),
  });

  return (
    <View>
      {isLoading ? (
        <SubCategoriesListSkeleton />
      ) : (
        <FlashList
          data={[
            {
              id: null,
              name: 'All',
            },
            ...(subCategories?.data.map(item => ({
              id: item.id,
              name: item.name,
            })) || []),
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            // paddingBottom: 20,
            paddingHorizontal: 16,
          }}
          renderItem={({item, index}) => {
            const isSelected = selectedSubCategory === item.id;
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedSubCategory(item.id);
                }}
                style={{
                  backgroundColor: isSelected ? colors.primary : colors.card,
                  paddingHorizontal: 20,
                  marginHorizontal: 3,
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
                  {substr(item.name, 15)}
                </Text>
              </TouchableOpacity>
            );
          }}
          estimatedItemSize={100}
        />
      )}
    </View>
  );
}
