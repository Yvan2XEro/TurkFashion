import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {Product} from '@/types/models';
import {AppBlur} from '@/components/atoms/AppBlur';
import {useTheme} from '@react-navigation/native';

type TProps = {
  onPress: () => void;
  data: Product;
};
export default function ProductCard({data, onPress}: TProps) {
  const {colors} = useTheme();
  const colorScheme = useColorScheme();
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
          uri: data.photoUrl,
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
          overflow: 'hidden',
          borderRadius: 100,
        }}>
        <AppBlur mode={colorScheme === 'dark' ? 'dark' : 'light'} />
        <Text style={{fontSize: 14, fontWeight: '600', color: colors.text}}>
          ${data.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
