import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withDecay,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import useCartCount from '@/hooks/useCartCount';
import {CountInCartBadge} from '@/components/atoms/CountInCartBadge';
import {TabsStackParamList} from '@/navigations/tab-navigation';

export default function FloatingCart() {
  const navigation = useNavigation<NavigationProp<TabsStackParamList>>();
  const {count: countInCart} = useCartCount();
  const translateY = useSharedValue(-300);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = ctx.startY + event.translationY;
    },

    onEnd: event => {
      translateY.value = withDecay({
        velocity: event.velocityY,
        rubberBandEffect: false,
      });
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });
  const {colors} = useTheme();
  if (!countInCart) {
    return null;
  }

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              borderColor: colors.border,
              borderWidth: 0.5,
            },
            animatedStyle,
          ]}>
          <CountInCartBadge />
          <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
            <IonIcons name="cart-outline" size={24} color={colors.background} />
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 16,
  },
});
