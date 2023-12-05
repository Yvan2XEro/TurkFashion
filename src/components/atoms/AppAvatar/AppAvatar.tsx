import {Image, ImageStyle, StyleProp} from 'react-native';
import React from 'react';

type TProps = {
  uri?: string | null;
  style?: StyleProp<ImageStyle>;
};
export default function AppAvatar({uri, style}: TProps) {
  return (
    <Image
      source={
        !!uri
          ? {
              uri,
            }
          : require('../../../assets/User.png')
      }
      style={[{width: 52, aspectRatio: 1, borderRadius: 52}, style]}
      resizeMode="cover"
    />
  );
}
