import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';
import {Product} from '@/types/models';
import {useColorScheme} from 'react-native';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import Animated from 'react-native-reanimated';

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
        <Animated.View
          // sharedTransitionTag={data.title + index}
          style={StyleSheet.absoluteFill}>
          <Image
            source={{
              uri: data.image,
            }}
            resizeMode="cover"
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        <View
          style={[
            StyleSheet.absoluteFill,
            {
              padding: 12,
            },
          ]}>
          <View style={{flexDirection: 'row', gap: 8, padding: 4}}>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                fontWeight: '600',
                color: '#fff',
                textShadowColor: 'rgba(0,0,0,0.2)',
                textShadowOffset: {
                  height: 1,
                  width: 0,
                },
                textShadowRadius: 4,
              }}>
              {data.title}
            </Text>
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 100,
                height: 32,
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons name="heart-outline" size={20} color={colors.text} />
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
              blurAmount={1}>
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
                    color: '#fff',
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
  );
}
