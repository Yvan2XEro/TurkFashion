import {AnimatedHeaderWrapper} from '@/components/organims/AnimatedHeaderWrapper';
import useCollectionData from '@/hooks/useCollectionData';
import React, {useCallback} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import useCartCount from '@/hooks/useCartCount';
import {useCartStore} from '@/store/useCartStore';
import {FlashList} from '@shopify/flash-list';
import {TouchableOpacity} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Product} from '@/types/models';
import {useTheme} from '@react-navigation/native';
import {CartFooter} from '@/components/moleculs/CartFooter';

export default function CartScreen() {
  const {count} = useCartCount();
  const {items} = useCartStore();
  const {data} = useCollectionData<Product>({
    collection: 'products',
    enabled: !!count && count > 0,
    customQuery: ref => {
      return ref.where(
        firestore.FieldPath.documentId(),
        'in',
        Object.keys(items),
      ) as any;
    },
  });

  return (
    <>
      <AnimatedHeaderWrapper title="Cart">
        <View style={{marginTop: 20, flex: 1}}>
          <FlatList
            data={data || []}
            keyExtractor={item => item.uuid}
            renderItem={({item, index}: {item: Product; index: number}) => (
              <CartItem item={item} />
            )}
            // estimatedItemSize={(data || []).length}
          />
        </View>
      </AnimatedHeaderWrapper>
      <CartFooter />
    </>
  );
}

function CartItem({item}: {item: Product}) {
  const {
    items,
    remove: removeItemFromCart,
    increase,
    decrease,
  } = useCartStore();

  const count = items[item.uuid + ''];

  const {colors} = useTheme();

  const onDecrease = useCallback(() => {
    if (count <= 1) {
      return removeItemFromCart(item.uuid || '');
    }
    decrease(item.uuid || '');
  }, [items, decrease, item.uuid, count]);

  const onIncrease = useCallback(() => {
    increase(item.uuid || '');
  }, [items, increase, item.uuid]);

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.card,
        borderRadius: 12,
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
            {item.name}
          </Text>
          <Text style={{color: colors.text}}>
            {count} x ${item.price} = ${count * item.price}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
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
