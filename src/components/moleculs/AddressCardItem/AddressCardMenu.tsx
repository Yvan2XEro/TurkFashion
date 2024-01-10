import {Address} from '@/lib/api/address';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useAppBottomSheet} from '@/context/app-bottom-sheet';
import {EditAddressForm} from '@/components/organims/EditAddressForm';
import {useMutation, useQueryClient} from 'react-query';
import {fetchWithAuth} from '@/lib/api/app-fetch';

type TProps = {
  data: Address;
};
export default function AddressCardMenu({data}: TProps) {
  const {colors} = useTheme();
  const client = useQueryClient();
  const {presentAppBottomSheet} = useAppBottomSheet();
  const deleteMutation = useMutation({
    mutationFn: async () => {
      return await fetchWithAuth(`/addresses/${data.id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      client.invalidateQueries(['addresses']);
    },
  });
  return (
    <Menu>
      <MenuTrigger style={{padding: 1}}>
        <IonIcons color={colors.text} size={18} name="ellipsis-vertical" />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {padding: 0, backgroundColor: colors.card},
        }}>
        <MenuOption
          onSelect={() =>
            presentAppBottomSheet(<EditAddressForm data={data} />)
          }>
          <Text>Edit</Text>
        </MenuOption>
        <MenuOption onSelect={() => deleteMutation.mutate()}>
          <Text>Delete</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}
