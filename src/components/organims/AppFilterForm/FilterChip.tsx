import {universalFetch} from '@/lib/api/universalfetch';
import {useFiltersStore} from '@/store/useFiltersStore';
import {useTheme} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {ReactNode} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

type TProps = {
  isSelected: boolean;
  label: string;
  left?: ReactNode;
  filterKey: string;
  filterValue: string;
  onPress: () => void;
};
const FilterChip = (props: TProps) => {
  const {isSelected, label, left, filterKey, filterValue, onPress} = props;
  const theme = useTheme();
  const {activeCategory, activeSubCategory: subCategory} = useFiltersStore();
  const {
    data: products,
    refetch,
    isPending,
  } = useQuery({
    queryKey: [
      'products',
      'sub-category',
      subCategory?.id,
      'filters',
      filterKey,
      filterValue,
    ],
    queryFn: () =>
      universalFetch({
        limit: 1,
        page: 1,
        path: `/products/search?`,
        q: `${!!subCategory?.id ? '&sub_category_id=' + subCategory?.id : ''}${
          !!filterKey &&
          !!filterValue &&
          '&filters=' + filterKey + '=' + filterValue
        }`,
      }),
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 100,
        backgroundColor: isSelected
          ? theme.colors.text
          : theme.colors.background,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {!!left && <View style={{marginRight: 8}}>{left}</View>}
      <Text
        style={{
          fontSize: 14,
          color: isSelected ? theme.colors.background : theme.colors.text,
        }}>
        {label} {!!products?.meta && `(${products?.meta.count})`}
      </Text>
    </TouchableOpacity>
  );
};
export default FilterChip;
