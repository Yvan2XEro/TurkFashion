import {TextInput, TextInputProps} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

type TProps = TextInputProps & {};
export default function AppTextInput(props: TProps) {
  const {colors} = useTheme();
  return (
    <TextInput
      {...props}
      style={[
        {
          height: 50,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 10,
          color: colors.text,
          paddingHorizontal: 16,
        },
        props.style,
      ]}
    />
  );
}
