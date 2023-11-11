import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useAppBottomSheet} from '@/context/app-bottom-sheet';
import {AppFilterForm} from '@/components/organims/AppFilterForm';

export default function AppSearchBar() {
  const {colors} = useTheme();
  const {presentAppBottomSheet} = useAppBottomSheet();

  return (
    <View style={{flexDirection: 'row', gap: 12}}>
      <TouchableOpacity
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

      <TouchableOpacity
        onPress={() => {
          presentAppBottomSheet(<AppFilterForm />);
        }}
        style={{
          width: 52,
          aspectRatio: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 52,
          backgroundColor: colors.primary,
        }}>
        <MaterialCommunityIcons
          name="tune-variant"
          size={24}
          color={colors.background}
        />
      </TouchableOpacity>
    </View>
  );
}
