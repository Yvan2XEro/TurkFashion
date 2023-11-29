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
import {AppTextInput} from '@/components/atoms/AppTextInput';

const AppFilterForm = () => {
  const {
    activeSubCategory,
    setActiveFilters,
    resetAllFilters,
    activeFilters,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
  } = useFiltersStore();
  const {colors} = useTheme();
  const theme = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const filters = useMemo(() => {
    return activeSubCategory?.filters || [];
  }, [activeSubCategory?.filters]);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: colors.border,
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
            onPress={resetAllFilters}
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
                <Text
                  style={{
                    color: colors.text,
                  }}>
                  Min Price
                </Text>
                <AppTextInput
                  keyboardType="numeric"
                  value={minPrice}
                  onChangeText={setMinPrice}
                />
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: colors.text,
                  }}>
                  Max Price
                </Text>
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
                {f.name}
              </Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 12}}>
                {f.values.map((v, i) => {
                  return (
                    <FilterChip
                      key={i}
                      label={v}
                      isSelected={activeFilters[`${f.name}`] === v}
                      filterKey={f.name}
                      filterValue={v}
                      onPress={() => {
                        setActiveFilters({
                          key: `${f.name}`,
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
