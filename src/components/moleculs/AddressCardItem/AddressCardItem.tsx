import React from 'react';
import {View, Text, Pressable} from 'react-native';

import {useTheme} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Address} from '@/lib/api/address';
import {AppCheckbox} from '@/components/atoms/AppCheckbox';

type TProps = {
  data: Address;
  selected: boolean;
  onPress: () => void;
};
export default function AddressCardItem({data, onPress, selected}: TProps) {
  const {colors} = useTheme();
  return (
    <View
      style={{
        padding: 16,
        borderRadius: 8,
        backgroundColor: colors.card,
        marginVertical: 10,
        borderWidth: selected ? 1 : 0,
        borderColor: colors.primary,
      }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 16,
          marginBottom: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
            alignItems: 'center',
          }}>
          <AppCheckbox checked={selected} onChange={onPress} />
          <Text style={{color: colors.text, fontWeight: '600'}}>
            {data.label}
          </Text>
        </View>
        <Pressable>
          <IonIcons color={colors.text} size={18} name="pencil" />
        </Pressable>
      </View>
      <View>
        <Text style={{color: colors.text}}>
          {data.city.name}: {data.address} | {data.phone}
        </Text>
      </View>
    </View>
  );
}
