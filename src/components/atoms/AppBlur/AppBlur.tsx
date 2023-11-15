import {StyleSheet, useColorScheme} from 'react-native';
import React from 'react';
import {BlurView} from '@react-native-community/blur';
import {View} from 'react-native';

export default function AppBlur() {
  const colorScheme = useColorScheme();

  //   return (
  //     <BlurView
  //       style={blurStyle}
  //       blurType={colorScheme === 'dark' ? 'dark' : 'light'}
  //       blurAmount={6}
  //     />
  //   );

  return (
    <View
      style={[
        blurStyle,
        {
          backgroundColor:
            colorScheme === 'dark'
              ? 'rgba(0,0,0,0.5)'
              : 'rgba(255,255,255,0.5)',
        },
      ]}
    />
  );
}
const {blurStyle} = StyleSheet.create({
  blurStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
});
