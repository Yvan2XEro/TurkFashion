import {useTheme} from '@react-navigation/native';
import {ReactNode} from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';

type TProps = {
  isSelected: boolean;
  label: string;
  itemCount: number;
  left?: ReactNode;
};
const Chip = ({isSelected, label, itemCount, left}: TProps) => {
  const theme = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 100,
        backgroundColor: isSelected
          ? theme.colors.text
          : theme.colors.background,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {!!left && <View style={{marginRight: 8}}>{left}</View>}
      <Text
        style={{
          fontSize: 14,
          color: isSelected ? theme.colors.background : theme.colors.text,
        }}>
        {label} [{itemCount}]
      </Text>
    </View>
  );
};
export default Chip;
