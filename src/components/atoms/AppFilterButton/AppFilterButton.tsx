import React, {useMemo} from 'react';
import {useTheme} from '@react-navigation/native';
import {useAppBottomSheet} from '@/context/app-bottom-sheet';
import {TouchableOpacity} from 'react-native';
import {AppFilterForm} from '@/components/organims/AppFilterForm';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFiltersStore} from '@/store/useFiltersStore';
import {View} from 'react-native';
import {Text} from 'react-native';

export default function AppFilterButton() {
  const {colors} = useTheme();
  const {presentAppBottomSheet} = useAppBottomSheet();
  const {activeFilters, activeCategory, activeSubCategory, minPrice, maxPrice} =
    useFiltersStore();

  const setedFiltersCount = useMemo(() => {
    return (
      Object.keys(activeFilters).length +
      (activeCategory ? 1 : 0) +
      (activeSubCategory ? 1 : 0) +
      (minPrice && minPrice.length > 0 ? 1 : 0) +
      (maxPrice && maxPrice.length > 0 ? 1 : 0)
    );
  }, [activeCategory, activeFilters, activeSubCategory, maxPrice, minPrice]);
  return (
    <TouchableOpacity
      onPress={() => {
        presentAppBottomSheet(<AppFilterForm />);
      }}
      style={{
        width: 52,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: 52,
        backgroundColor: colors.primary,
      }}>
      <MaterialCommunityIcons
        name="tune-variant"
        size={24}
        color={colors.background}
      />
      {setedFiltersCount > 0 && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 16,
            borderWidth: 1,
            borderColor: colors.border,
            height: 16,
            borderRadius: 16,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 10,
              color: colors.text,
            }}>
            {setedFiltersCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
