import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import {useCartStore} from '@/store/useCartStore';
import {useTheme} from '@react-navigation/native';
import {substr} from '@/lib/utils/string';
import {Product} from '@/lib/api/products';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default function CartItem({item}: {item: Product}) {
  const {
    items,
    remove: removeItemFromCart,
    increase,
    decrease,
  } = useCartStore();

  const count = items[`${item.id}`];

  const {colors} = useTheme();

  const onDecrease = useCallback(() => {
    if (count <= 1) {
      return removeItemFromCart(`${item.id}`);
    }
    decrease(`${item.id}`);
  }, [items, decrease, item.id, count]);

  const onIncrease = useCallback(() => {
    increase(`${item.id}`);
  }, [items, increase, item.id]);

  return (
    <TouchableOpacity
      style={{
        gap: 8,
        backgroundColor: colors.card,
        borderRadius: 12,
        marginVertical: 8,
        position: 'relative',
      }}>
      <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
        <Image
          style={{borderRadius: 8}}
          source={{uri: item.photoUrl}}
          width={70}
          height={70}
        />
        <View style={{paddingVertical: 8}}>
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: '600',
              color: colors.text,
              textAlign: 'center',
              textShadowColor: 'rgba(0,0,0,0.2)',
              textShadowOffset: {
                height: 1,
                width: 0,
              },
              textShadowRadius: 4,
            }}>
            {substr(item.name, 20)}
          </Text>
          <Text style={{color: colors.text}}>
            {count} x ${item.price} = ${count * item.price}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          position: 'absolute',
          bottom: 5,
          right: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            backgroundColor: colors.primary,
            padding: 6,
            borderRadius: 100,
          }}>
          <TouchableOpacity
            onPress={onDecrease}
            style={{
              backgroundColor: colors.card,
              width: 34,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 34,
            }}>
            <IonIcons name="remove" size={20} color={colors.text} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: colors.background,
            }}>
            {count}
          </Text>
          <TouchableOpacity
            onPress={onIncrease}
            style={{
              backgroundColor: colors.card,
              width: 34,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 34,
            }}>
            <IonIcons name="add" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
