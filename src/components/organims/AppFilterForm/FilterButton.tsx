import {View, Text, ActivityIndicator} from 'react-native';
import React, {useCallback} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import useCollectionData from '@/hooks/useCollectionData';
import {useFiltersStore} from '@/store/useFiltersStore';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export default function FilterButton() {
  const insets = useSafeAreaInsets();
  const {activeFilters, activeCategory, activeSubCategory, minPrice, maxPrice} =
    useFiltersStore();
  const theme = useTheme();
  const customQuery = (
    collectionRef: FirebaseFirestoreTypes.CollectionReference,
  ) => {
    let query = collectionRef;
    if (activeCategory) {
      query = query.where('categoryUuid', '==', activeCategory) as any;
    }
    if (activeSubCategory) {
      query = query.where('subCategoryUuid', '==', activeSubCategory) as any;
    }
    if (minPrice && minPrice.length > 0) {
      query = query.where('price', '>=', +minPrice) as any;
    }
    if (maxPrice && maxPrice.length > 0) {
      query = query.where('price', '<=', +maxPrice) as any;
    }
    Object.entries(activeFilters).forEach(([key, value]) => {
      query = query.where(key, '==', value) as any;
    });
    return query as any;
  };
  // [activeFilters, activeCategory, activeSubCategory, minPrice, maxPrice],
  // );
  const {data, isLoading} = useCollectionData({
    collection: 'products',
    customQuery,
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
          Apply filters {!!data && <>[{data?.length || 0}]</>}
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
