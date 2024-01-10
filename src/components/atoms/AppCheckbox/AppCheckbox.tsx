import {View, Pressable, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

type TProps = {
  checked: boolean;
  onChange: () => void;
  style?: StyleProp<ViewStyle>;
};
export default function AppCheckbox({checked, onChange, style}: TProps) {
  const {colors} = useTheme();
  return (
    <Pressable
      style={[
        {
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.primary,
          height: 20,
          width: 20,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={onChange}>
      {checked && (
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 10,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </Pressable>
  );
}
