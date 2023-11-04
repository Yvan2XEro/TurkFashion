import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Product} from '@/types/models';

type TProps = {
  onPress: () => void;
  data: Product;
};
export default function ProductCard({data, onPress}: TProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 24,
      }}>
      <Image
        source={{
          uri: data.image,
        }}
        resizeMode="cover"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: 12,
          top: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: 'rgba(0,0,0,0.25)',
          borderRadius: 100,
        }}>
        <Text style={{fontSize: 14, fontWeight: '600', color: '#fff'}}>
          ${data.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
