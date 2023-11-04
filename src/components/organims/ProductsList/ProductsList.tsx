import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Product} from '@/types/models';
import MasonryList from 'reanimated-masonry-list';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';
import {useColorScheme} from 'react-native';

type TProps = {
  data: Product[];
};
export default function ProductsList({data}: TProps) {
  const {colors} = useTheme();
  const colorScheme = useColorScheme();

  return (
    <View>
      <MasonryList
        data={data}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item, i}: {item: Product; i: number}) => (
          <View style={{padding: 6}}>
            <View
              style={{
                aspectRatio: i === 0 ? 1 : 2 / 3,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 24,
              }}>
              <Image
                source={{
                  uri: item.image,
                }}
                resizeMode="cover"
                style={StyleSheet.absoluteFill}
              />
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
                    {item.title}
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
                    <Ionicons
                      name="heart-outline"
                      size={20}
                      color={colors.text}
                    />
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
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      padding: 6,
                      borderRadius: 100,
                      overflow: 'hidden',
                    }}
                    blurType={colorScheme === 'dark' ? 'dark' : 'light'}
                    blurAmount={1}>
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
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
                        ${item.price}
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
          </View>
        )}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}
