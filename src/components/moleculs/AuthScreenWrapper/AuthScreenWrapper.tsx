import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';

export default function AuthScreenWrapper({children}: PropsWithChildren) {
  return (
    <View
      // source={{uri: 'https://picsum.photos/2000'}}
      // blurRadius={2}
      style={{flex: 1}}>
      {children}
    </View>
  );
}
