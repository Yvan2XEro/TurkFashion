import {View, Text} from 'react-native';
import React from 'react';
import Animated, {SlideInDown} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';
import {SCREEN_PADDING_HORIZONTAL} from '@/constants';
import {AppButton} from '@/components/atoms/AppButton';
import useCartCount from '@/hooks/useCartCount';

export default function CartFooter() {
  const {colors} = useTheme();
  const {totalPrice} = useCartCount();
  return (
    <Animated.View
      style={{
        backgroundColor: colors.card,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
        left: 0,
        right: 0,
        paddingVertical: 30,
      }}
      entering={SlideInDown.delay(200)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{color: colors.text, fontWeight: '700', fontSize: 20}}>
          ${totalPrice}
        </Text>
        <AppButton>
          <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
            <Text style={{color: colors.background}}>Go to checkout</Text>
          </View>
        </AppButton>
      </View>
    </Animated.View>
  );
}
