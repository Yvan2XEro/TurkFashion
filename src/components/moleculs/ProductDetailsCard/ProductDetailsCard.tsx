import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Product} from '@/types/models';
import {useColorScheme} from 'react-native';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';

import {RootStackParamList} from '@/navigations/root-navigation';
import {AppBlur} from '@/components/atoms/AppBlur';
import {useCartStore} from '@/store/useCartStore';

type TProps = {
  data: Product;
  index: number;
};
export default function ProductDetailsCard({data, index}: TProps) {
  const {colors} = useTheme();
  const colorScheme = useColorScheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {items, increase} = useCartStore();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DetailsScreen', {
            id: data.id,
          });
        }}
        style={{padding: 6}}>
        <View
          style={{
            aspectRatio: index === 0 ? 1 : 2 / 3,
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 24,
          }}>
          <View
            // sharedTransitionTag={data.title + index}
            style={StyleSheet.absoluteFill}>
            <Image
              source={{
                uri: data.photoUrl,
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
          </View>

          <View
            style={[
              StyleSheet.absoluteFill,
              {
                padding: 12,
              },
            ]}>
            <View style={{flexDirection: 'row', gap: 8, padding: 4}}>
              <View
                style={{
                  borderRadius: 100,
                  height: 32,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                <AppBlur mode={colorScheme === 'dark' ? 'dark' : 'light'} />
                <Ionicons name="heart-outline" size={20} color={colors.text} />
              </View>
            </View>
            <View style={{flex: 1}} />
            <View
              style={{
                borderRadius: 100,
                overflow: 'hidden',
              }}>
              <AppBlur mode={colorScheme === 'dark' ? 'dark' : 'light'} />

              <View
                style={{
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  padding: 6,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontWeight: '600',
                    color: colors.text,
                    marginLeft: 8,
                  }}
                  numberOfLines={1}>
                  ${data.price}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    increase(data.id);
                  }}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 100,
                    backgroundColor: colors.primary,
                    position: 'relative',
                  }}>
                  {items[data.id] && items[data.id] > 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                      }}>
                      <Text
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          fontSize: 8,
                          backgroundColor: colors.background,
                          borderRadius: 100,
                          paddingHorizontal: 4,
                          color: colors.primary,
                        }}>
                        {items[data.id]}
                      </Text>
                    </View>
                  )}

                  <Ionicons
                    name="cart-outline"
                    size={18}
                    color={colors.background}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Text
        style={{
          flex: 1,
          fontSize: 16,
          fontWeight: '600',
          color: colors.text,
          textAlign: 'center',
          textShadowColor:
            colorScheme !== 'dark'
              ? 'rgba(0,0,0,0.2)'
              : 'rgba(255,255,255,0.2)',
          textShadowOffset: {
            height: 1,
            width: 0,
          },
          textShadowRadius: 4,
        }}>
        {data.name}
      </Text>
    </View>
  );
}
