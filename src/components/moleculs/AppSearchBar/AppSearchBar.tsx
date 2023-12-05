import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '@/navigations/root-navigation';
import Animated from 'react-native-reanimated';
import {AppFilterButton} from '@/components/atoms/AppFilterButton';

export default function AppSearchBar() {
  const {colors} = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View
      // sharedTransitionTag="app_search_bar"
      style={{flexDirection: 'row', gap: 12}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SearchScreen')}
        style={{
          flex: 1,
          height: 52,
          borderRadius: 52,
          borderWidth: 1,
          borderColor: colors.border,
          alignItems: 'center',
          paddingHorizontal: 24,
          flexDirection: 'row',
          gap: 12,
        }}>
        <IonIcons
          name="search"
          size={24}
          color={colors.text}
          style={{opacity: 0.5}}
        />
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            color: colors.text,
            opacity: 0.5,
          }}>
          Search
        </Text>
      </TouchableOpacity>

      <AppFilterButton />
    </View>
  );
}
