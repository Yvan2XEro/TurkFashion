import {View, Text, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {SCREEN_PADDING_HORIZONTAL} from '@/constants';
import {FlashList} from '@shopify/flash-list';
import {useTheme} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useQuery} from 'react-query';
import {useAuthStore} from '@/store/useAuthStore';
import {universalRetrieve} from '@/lib/api/universalfetch';
import {Address} from '@/lib/api/address';
import {
  AddressCardItem,
  AddressCardItemSkeleton,
} from '@/components/moleculs/AddressCardItem';
import {useDefaultAddressStore} from '@/store/useDefaultAddressStore';
import {FlatList} from 'react-native';

export default function AddressesScreen() {
  const {user} = useAuthStore();
  const addressesQuery = useQuery({
    queryKey: ['addresses', user?.id],
    enabled: !!user,
    queryFn: async () => {
      return await universalRetrieve<Address[]>({
        path: `/addresses/${user?.id}/addresses`,
      });
    },
  });
  const {id: defaultAddressId, setDefaultAddress} = useDefaultAddressStore();
  useEffect(() => {
    if (
      !defaultAddressId &&
      !!addressesQuery.data &&
      addressesQuery.data.length > 0
    )
      setDefaultAddress(addressesQuery.data?.[0]?.id);
  }, [addressesQuery.data, defaultAddressId]);

  return (
    <View style={{paddingHorizontal: SCREEN_PADDING_HORIZONTAL, flex: 1}}>
      {addressesQuery.isLoading && (
        <FlashList
          data={Array.from({length: 4})}
          estimatedItemSize={1}
          renderItem={() => <AddressCardItemSkeleton />}
          showsVerticalScrollIndicator={false}
        />
      )}
      {/* TODO: Empty state */}
      {!!addressesQuery.data && addressesQuery.data.length > 0 && (
        <FlatList
          data={addressesQuery.data}
          renderItem={({item}) => (
            <AddressCardItem
              data={item}
              selected={item.id === defaultAddressId}
              onPress={() => {
                setDefaultAddress(item.id);
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
