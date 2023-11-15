import {ImageBackground} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {paddingTop} from '@/constants/layout';

export default function AuthScreenWrapper({children}: PropsWithChildren) {
  return (
    <ImageBackground
      source={{uri: 'https://picsum.photos/2000'}}
      blurRadius={2}
      style={{paddingTop, flex: 1}}>
      {children}
    </ImageBackground>
  );
}
