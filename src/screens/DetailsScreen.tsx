import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

export default function DetailsScreen() {
  const {colors} = useTheme();
  return (
    <View>
      <Text>ghjklö</Text>
    </View>
  );
}
