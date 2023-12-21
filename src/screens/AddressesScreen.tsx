import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {SCREEN_PADDING_HORIZONTAL} from '@/constants';
import {FlashList} from '@shopify/flash-list';
import {useTheme} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default function AddressesScreen() {
  return (
    <View style={{paddingHorizontal: SCREEN_PADDING_HORIZONTAL, flex: 1}}>
      <FlashList
        data={Array.from({length: 2})}
        estimatedItemSize={20}
        renderItem={() => <AddressItem />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function AddressItem() {
  const {colors} = useTheme();
  return (
    <Pressable
      style={{
        padding: 16,
        borderRadius: 8,
        backgroundColor: colors.card,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: colors.border,
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
                backgroundColor: colors.background,
              }}
            />
          </View>
          <Text style={{color: colors.text, fontWeight: '600'}}>Adresse 1</Text>
        </View>
        <Pressable>
          <IonIcons color={colors.text} size={18} name="pencil" />
        </Pressable>
      </View>
      <View>
        <Text style={{color: colors.text}}>
          Dschang, Rue 3 | +33 6 00 00 00 | Ville 1Dschang, Rue 3 | +33 6 00 00
          00 | Ville 1Dschang, Rue 3 | +33 6 00 00 00 | Ville 1
        </Text>
      </View>
    </Pressable>
  );
}
