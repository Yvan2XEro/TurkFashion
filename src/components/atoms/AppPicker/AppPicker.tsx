import {View, Text} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '@react-navigation/native';

type TProps = {
  value: any;
  onChange: (value: any) => void;
  items: {label: string; value: any}[];
};
export default function AppPicker({value, onChange, items}: TProps) {
  const {colors} = useTheme();

  return (
    <View
      style={[
        {
          height: 50,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 16,
          justifyContent: 'center',
        },
      ]}>
      <Picker
        selectedValue={value}
        mode="dropdown"
        style={{color: colors.text}}
        onValueChange={value => {
          if (!!value) {
            onChange(value);
          }
        }}>
        <Picker.Item label="Select" value={null} />
        {items.map(item => (
          <Picker.Item
            style={{color: colors.text}}
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  );
}
