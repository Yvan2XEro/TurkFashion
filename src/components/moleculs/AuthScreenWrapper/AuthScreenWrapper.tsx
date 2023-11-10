import {ImageBackground, StatusBar, Platform} from 'react-native';
import React, {PropsWithChildren} from 'react';

export default function AuthScreenWrapper({children}: PropsWithChildren) {
  const paddingTop = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  return (
    <ImageBackground
      source={{uri: 'https://picsum.photos/2000'}}
      blurRadius={10}
      style={{paddingTop, flex: 1}}>
      {children}
    </ImageBackground>
  );
}
