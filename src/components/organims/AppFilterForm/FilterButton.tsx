import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {universalFetch} from '@/lib/api/universalfetch';
import useFilterSearchParams from '@/hooks/useFilterSearchParams';

export default function FilterButton() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const searchPath = useFilterSearchParams();

  const {data: products, isLoading} = useQuery({
    queryKey: ['products', 'sub-category', searchPath],
    queryFn: () =>
      universalFetch({
        limit: 1,
        page: 1,
        path: `/products/search`,
        q: searchPath,
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
          {isLoading ? (
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
