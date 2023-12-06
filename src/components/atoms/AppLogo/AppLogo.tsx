import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

export default function AppLogo() {
  const {colors} = useTheme();

  return (
    <View>
      <Text
        style={{
          fontSize: 32,
          fontWeight: '600',
          textShadowOffset: {
            height: 1,
            width: 0,
          },
          textShadowRadius: 4,
          color: colors.text,
        }}>
        Turk Fashion
      </Text>
    </View>
  );
}
