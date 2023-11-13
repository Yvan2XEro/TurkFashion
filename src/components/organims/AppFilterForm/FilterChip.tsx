import useCollectionData from '@/hooks/useCollectionData';
import {useTheme} from '@react-navigation/native';
import {ReactNode} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

type TProps = {
  isSelected: boolean;
  label: string;
  left?: ReactNode;
  filterKey: string;
  filterValue: string;
  onPress: () => void;
};
const FilterChip = (props: TProps) => {
  const {isSelected, label, left, filterKey, filterValue, onPress} = props;
  const theme = useTheme();

  const {data} = useCollectionData({
    collection: 'products',
    customQuery: collectionRef =>
      collectionRef.where(filterKey, '==', filterValue) as any,
  });
  return (
    <TouchableOpacity
      onPress={onPress}
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
        {label} {!!data && <>[{data.length}]</>}
      </Text>
    </TouchableOpacity>
  );
};
export default FilterChip;
