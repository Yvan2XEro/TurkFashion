import {View, TextInput} from 'react-native';
import React, {useCallback} from 'react';
import {RootStackScreenProps} from '@/navigations/root-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {AppFilterButton} from '@/components/atoms/AppFilterButton';
import {SCREEN_PADDING_HORIZONTAL} from '@/constants';
import {ProductsList} from '@/components/organims/ProductsList';

type TProps = RootStackScreenProps<'SearchScreen'>;

export default function SearchScreen({navigation}: TProps) {
  const {colors} = useTheme();
  const [q, setQ] = React.useState('');
  const delayedSearch = useCallback(
    debounce(async (text: string) => {
      if (text !== '') {
        setQ(text);
      }
    }, 500),
    [],
  );
  const handleSearchChange = (text: string) => {
    delayedSearch(text);
  };
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
            onChangeText={handleSearchChange}
            placeholderTextColor={colors.text}
            placeholder="Search"
            autoFocus
          />
        </View>

        <AppFilterButton />
      </View>

      <ProductsList selectedSubCategory={null} q={q} search />
    </View>
  );
}

const debounce = <F extends (...args: any[]) => any>(fn: F, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  } as F;
};
