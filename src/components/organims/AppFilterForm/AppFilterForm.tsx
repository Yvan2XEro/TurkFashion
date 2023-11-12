import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {useTheme} from '@react-navigation/native';
// import PriceRangeSelector from './PriceRangeSelector';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useFiltersStore} from '@/store/useFiltersStore';
import {ScrollView} from 'react-native';
import ActiveCategoy from './ActiveCategoy';
import Chip from './Chip';
import FilterButton from './FilterButton';
import {useColorScheme} from 'react-native';
import CategoryPicker from './CategoryPicker';
import {AppSheetBackdrop} from '@/components/atoms/AppSheetBackdrop';

const AppFilterForm = () => {
  const {filters} = useFiltersStore();
  const {colors} = useTheme();
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

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
            <ScrollView horizontal>
              <ActiveCategoy
                onPress={() => bottomSheetModalRef.current?.present()}
              />
            </ScrollView>
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
                    <Chip
                      key={i}
                      itemCount={i}
                      label={v}
                      isSelected={i === 0}
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
