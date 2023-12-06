import {TextInput, TextInputProps} from 'react-native';
import React, {forwardRef} from 'react';
import {useTheme} from '@react-navigation/native';

type TProps = TextInputProps & {};
function Input(props: TProps, ref: any) {
  const {colors} = useTheme();
  return (
    <TextInput
      {...props}
      ref={ref}
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
      placeholderTextColor={colors.text}
    />
  );
}

const AppTextInput = forwardRef(Input);
export default AppTextInput;
