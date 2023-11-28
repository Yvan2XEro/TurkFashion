import {View, Text, ActivityIndicator} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import {useFiltersStore} from '@/store/useFiltersStore';
import {useQuery} from '@tanstack/react-query';
import {universalFetch} from '@/lib/api/universalfetch';

export default function FilterButton() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const {
    activeCategory,
    activeSubCategory: subCategory,
    activeFilters,
  } = useFiltersStore();

  const filterString = useMemo(() => {
    return Object.entries(activeFilters)
      .map(([key, value]) => {
        return key + '=' + value;
      })
      .join(',');
  }, [activeFilters]);
  const {data: products, isPending} = useQuery({
    queryKey: [
      'products',
      'sub-category',
      subCategory?.id,
      'filters',
      filterString,
    ],
    queryFn: () =>
      universalFetch({
        limit: 1,
        page: 1,
        path: `/products/search?`,
        q: `${!!subCategory?.id ? '&sub_category_id=' + subCategory?.id : ''}${
          '&filters=' + filterString
        }`,
      }),
  });

  return (
    <View
      style={{
        padding: 24,
        paddingBottom: 24 + insets.bottom,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: theme.colors.primary,
          height: 64,
          borderRadius: 64,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: theme.colors.background,
          }}>
          Apply filters {!!products?.meta && <>({products.meta.count})</>}
        </Text>

        <View
          style={{
            backgroundColor: theme.colors.card,
            width: 40,
            aspectRatio: 1,
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 12,
            right: 12,
            bottom: 12,
          }}>
          {isPending ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <IonIcons
              name="arrow-forward"
              size={24}
              color={theme.colors.text}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
