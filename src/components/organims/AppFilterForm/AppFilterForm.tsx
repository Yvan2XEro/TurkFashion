import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {useTheme} from '@react-navigation/native';
// import PriceRangeSelector from './PriceRangeSelector';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useFiltersStore} from '@/store/useFiltersStore';
import ActiveCategoy from './ActiveCategoy';
import FilterChip from './FilterChip';
import FilterButton from './FilterButton';
import CategoryPicker from './CategoryPicker';
import {AppSheetBackdrop} from '@/components/atoms/AppSheetBackdrop';
import useSubcategoryData from '@/hooks/useSubcategoryData';
import {AppTextInput} from '@/components/atoms/AppTextInput';

const AppFilterForm = () => {
  const {
    activeSubCategory,
    setActiveFilters,
    activeFilters,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
  } = useFiltersStore();
  const {colors} = useTheme();
  const theme = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {filters} = useSubcategoryData({
    subCategoryuuid: activeSubCategory,
  });

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: 20,
            fontWeight: '700',
            color: theme.colors.text,
          }}>
          Filters
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: theme.colors.text,
              opacity: 0.5,
            }}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>
      <BottomSheetScrollView style={{flex: 1}}>
        <View style={{paddingVertical: 24, gap: 24}}>
          <View style={{paddingHorizontal: 24}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 12,
                color: colors.text,
              }}>
              Category
            </Text>
            <ActiveCategoy
              onPress={() => bottomSheetModalRef.current?.present()}
            />
          </View>

          <View style={{paddingHorizontal: 24}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 12,
                color: colors.text,
              }}>
              Price (XOF)
            </Text>
            <View style={{flexDirection: 'row', gap: 12}}>
              <View style={{flex: 1}}>
                <Text>Min Price</Text>
                <AppTextInput
                  keyboardType="numeric"
                  value={minPrice}
                  onChangeText={setMinPrice}
                />
              </View>
              <View style={{flex: 1}}>
                <Text>Max Price</Text>
                <AppTextInput
                  keyboardType="numeric"
                  value={maxPrice}
                  onChangeText={setMaxPrice}
                />
              </View>
            </View>
          </View>
          {filters.map((f, i) => (
            <View key={i} style={{paddingHorizontal: 24}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  marginBottom: 12,
                  color: colors.text,
                }}>
                {f.label}
              </Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 12}}>
                {f.values.map((v, i) => {
                  return (
                    <FilterChip
                      key={i}
                      label={v}
                      isSelected={activeFilters[`filters.${f.uuid}`] === v}
                      filterKey={`filters.${f.uuid}`}
                      filterValue={v}
                      onPress={() => {
                        setActiveFilters({
                          key: `filters.${f.uuid}`,
                          value: v,
                        });
                      }}
                    />
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </BottomSheetScrollView>
      {/* Button */}
      <FilterButton />

      <BottomSheetModal
        snapPoints={['70%']}
        index={0}
        ref={bottomSheetModalRef}
        backgroundStyle={{
          borderRadius: 24,
          backgroundColor: colors.card,
        }}
        backdropComponent={props => <AppSheetBackdrop {...props} />}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}>
        <CategoryPicker onClose={() => bottomSheetModalRef.current?.close()} />
      </BottomSheetModal>
    </View>
  );
};

export default AppFilterForm;
