import {View, Text} from 'react-native';
import React from 'react';
import {Address, AddressPayload, addressSchema} from '@/lib/api/address';
import {useTheme} from '@react-navigation/native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Controller, useForm} from 'react-hook-form';
import {AppTextInput} from '@/components/atoms/AppTextInput';
import {zodResolver} from '@hookform/resolvers/zod';
import {AppPicker} from '@/components/atoms/AppPicker';

type TProps = {
  data?: Address;
};
export default function EditAddressForm({data}: TProps) {
  const theme = useTheme();
  const form = useForm<AddressPayload>({
    resolver: zodResolver(addressSchema),
  });
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: theme.colors.border,
          paddingHorizontal: 24,
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: 20,
            fontWeight: '700',
            color: theme.colors.text,
          }}>
          {!!data ? 'Edit' : 'New'} Address
        </Text>
      </View>
      <BottomSheetScrollView
        style={{flex: 1, paddingHorizontal: 24, paddingTop: 24}}>
        <View style={{gap: 20}}>
          <View>
            <Controller
              control={form.control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <Text style={{color: theme.colors.text}}>Label :</Text>
                  <AppTextInput
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    style={{paddingRight: 40}}
                    placeholder="Ex: My House"
                  />
                </>
              )}
              name="label"
            />
            {form.formState.errors.label && (
              <Text style={{color: 'red'}}>
                {form.formState.errors.label.message}
              </Text>
            )}
          </View>

          <View>
            <Controller
              control={form.control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <Text style={{color: theme.colors.text}}>
                    Name (Of the Recipient) :
                  </Text>
                  <AppTextInput
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    style={{paddingRight: 40}}
                    placeholder="Ex: My House"
                  />
                </>
              )}
              name="name"
            />
            {form.formState.errors.name && (
              <Text style={{color: 'red'}}>
                {form.formState.errors.name.message}
              </Text>
            )}
          </View>

          <View>
            <Controller
              control={form.control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <Text style={{color: theme.colors.text}}>
                    Phone number (Of the Recipient) :
                  </Text>
                  <AppTextInput
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    style={{paddingRight: 40}}
                    placeholder="+237 6xx xx xx xx"
                  />
                </>
              )}
              name="phone"
            />
            {form.formState.errors.phone && (
              <Text style={{color: 'red'}}>
                {form.formState.errors.phone.message}
              </Text>
            )}
          </View>

          <View>
            <Controller
              control={form.control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <Text style={{color: theme.colors.text}}>
                    City (Of the Recipient) :
                  </Text>
                  <AppPicker onChange={onChange} value={value} items={[]} />
                </>
              )}
              name="address"
            />
            {form.formState.errors.address && (
              <Text style={{color: 'red'}}>
                {form.formState.errors.address.message}
              </Text>
            )}
          </View>

          <View>
            <Controller
              control={form.control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <Text style={{color: theme.colors.text}}>
                    Address number (Of the Recipient) :
                  </Text>
                  <AppTextInput
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    style={{paddingRight: 40}}
                  />
                </>
              )}
              name="address"
            />
            {form.formState.errors.address && (
              <Text style={{color: 'red'}}>
                {form.formState.errors.address.message}
              </Text>
            )}
          </View>
        </View>
      </BottomSheetScrollView>
    </View>
  );
}
