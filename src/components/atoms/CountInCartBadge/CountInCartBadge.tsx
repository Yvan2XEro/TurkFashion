import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import useCartCount from '@/hooks/useCartCount';

export default function CountInCartBadge() {
  const {count: countInCart} = useCartCount();

  const {colors} = useTheme();
  if (!countInCart) {
    return null;
  }
  return (
    <View
      style={{
        position: 'absolute',
        top: 5,
        borderRadius: 100,
        paddingHorizontal: 4,
        right: 5,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.primary,
      }}>
      <Text style={{color: colors.background, fontSize: 8}}>{countInCart}</Text>
    </View>
  );
}
