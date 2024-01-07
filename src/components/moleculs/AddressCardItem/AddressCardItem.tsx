import React from 'react';
import {View, Text, Pressable} from 'react-native';

import {useTheme} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Address} from '@/lib/api/address';

type TProps = {
  data: Address;
  selected: boolean;
  onPress: () => void;
};
export default function AddressCardItem({data, onPress, selected}: TProps) {
  const {colors} = useTheme();
  return (
    <Pressable
      style={{
        padding: 16,
        borderRadius: 8,
        backgroundColor: colors.card,
        marginVertical: 10,
        borderWidth: selected ? 1 : 0,
        borderColor: colors.border,
      }}
      onPress={onPress}>
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
          <View
            style={{
              backgroundColor: colors.primary,
              height: 20,
              width: 20,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 10,
                width: 10,
                borderRadius: 10,
                backgroundColor: selected ? colors.background : colors.primary,
              }}
            />
          </View>
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
    </Pressable>
  );
}
