import {View, TextInput} from 'react-native';
import React from 'react';
import {RootStackScreenProps} from '@/navigations/root-navigation';
import Animated from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {AppFilterButton} from '@/components/atoms/AppFilterButton';
import {SCREEN_PADDING_HORIZONTAL} from '@/constants';
import {ProductsList} from '@/components/organims/ProductsList';

type TProps = RootStackScreenProps<'SearchScreen'>;

export default function SearchScreen({navigation}: TProps) {
  const {colors} = useTheme();
  return (
    <View
      style={{
        paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
        flex: 1,
        paddingTop: 24,
      }}>
      <View
        // sharedTransitionTag="app_search_bar"
        style={{flexDirection: 'row', gap: 12}}>
        <View
          style={{
            flex: 1,
            height: 52,
            borderRadius: 52,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: 'center',
            marginBottom: 4,
            flexDirection: 'row',
            gap: 12,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IonIcons
              name="arrow-back"
              size={24}
              color={colors.text}
              style={{opacity: 0.5, paddingLeft: 24}}
            />
          </TouchableOpacity>
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              color: colors.primary,
              opacity: 0.5,
            }}
            placeholderTextColor={colors.text}
            placeholder="Search"
            autoFocus
          />
        </View>

        <AppFilterButton />
      </View>

      <ProductsList selectedSubCategory={null} />
    </View>
  );
}
