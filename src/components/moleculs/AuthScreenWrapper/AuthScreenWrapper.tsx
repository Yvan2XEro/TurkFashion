import {ImageBackground} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {paddingTop} from '@/constants/layout';
import {View} from 'react-native';

export default function AuthScreenWrapper({children}: PropsWithChildren) {
  return (
    <View
      // source={{uri: 'https://picsum.photos/2000'}}
      // blurRadius={2}
      style={{paddingTop, flex: 1}}>
      {children}
    </View>
  );
}
