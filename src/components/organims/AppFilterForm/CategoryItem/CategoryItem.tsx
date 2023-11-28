import {useTheme} from '@react-navigation/native';
import {Text} from 'react-native';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

type CategoryItemProps = {
  onPress: () => void;
  name: string;
  photoUrl?: string;
  isACtive: boolean;
};
export function CategoryItem(props: CategoryItemProps) {
  const {onPress, name, photoUrl, isACtive} = props;
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: isACtive ? theme.colors.border : 'transparent',
      }}>
      {!!photoUrl && (
        <Image
          source={{uri: photoUrl}}
          style={{width: 40, height: 40, borderRadius: 40}}
        />
      )}
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 16,
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}
