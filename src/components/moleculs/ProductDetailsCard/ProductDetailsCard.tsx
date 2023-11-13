import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';
import {Product} from '@/types/models';
import {useColorScheme} from 'react-native';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';

import {RootStackParamList} from '@/navigations/root-navigation';

type TProps = {
  data: Product;
  index: number;
};
export default function ProductDetailsCard({data, index}: TProps) {
  const {colors} = useTheme();
  const colorScheme = useColorScheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DetailsScreen', {
            id: '456',
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
                <BlurView
                  blurType={colorScheme === 'dark' ? 'dark' : 'light'}
                  blurAmount={10}>
                  <Ionicons
                    name="heart-outline"
                    size={20}
                    color={colors.text}
                  />
                </BlurView>
              </View>
            </View>
            <View style={{flex: 1}} />
            <View
              style={{
                borderRadius: 100,
                overflow: 'hidden',
              }}>
              <BlurView
                style={{
                  borderRadius: 100,
                  overflow: 'hidden',
                }}
                blurType={colorScheme === 'dark' ? 'dark' : 'light'}
                blurAmount={6}>
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
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 100,
                      backgroundColor: '#fff',
                    }}>
                    <Ionicons name="cart-outline" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </BlurView>
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
          textShadowColor: 'rgba(0,0,0,0.2)',
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
