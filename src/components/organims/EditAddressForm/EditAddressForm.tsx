import {View, Text, Pressable, ActivityIndicator} from 'react-native';
import React, {useMemo} from 'react';
import {Address, AddressPayload, addressSchema} from '@/lib/api/address';
import {useTheme} from '@react-navigation/native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Controller, useForm} from 'react-hook-form';
import {AppTextInput} from '@/components/atoms/AppTextInput';
import {zodResolver} from '@hookform/resolvers/zod';
import {AppPicker} from '@/components/atoms/AppPicker';
import {useQuery} from 'react-query';
import {universalRetrieve} from '@/lib/api/universalfetch';
import {City} from '@/lib/api/cities';
import useEditAddressForm from './useEditAddressForm';
import {useAppBottomSheet} from '@/context/app-bottom-sheet';
import {AppButton} from '@/components/atoms/AppButton';

type TProps = {
  data?: Address;
};
export default function EditAddressForm({data}: TProps) {
  const {colors} = useTheme();

  const form = useForm<AddressPayload>({
    resolver: zodResolver(addressSchema),
    values: !!data
      ? {
          address: data.address,
          city: data.city.id,
          label: data.label,
          name: data.name,
          phone: data.phone,
        }
      : undefined,
  });
  const deliverablesCitiesQuery = useQuery({
    queryKey: ['deliverablesCities'],
    queryFn: () => {
      return universalRetrieve<City[]>({
        path: '/deliverables-citties',
      });
    },
  });

  const [countries, setCountries] = React.useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = React.useState<string>(
    data?.city.country || '',
  );

  const citiesByCountries = useMemo(() => {
    const map = new Map<string, City[]>();
    deliverablesCitiesQuery.data?.forEach(city => {
      map.set(city.country, [...(map.get(city.country) ?? []), city]);
    });
    setCountries(Array.from(map.keys()));
    return map;
  }, [deliverablesCitiesQuery.data]);

  const {dismissAppBottomSheet} = useAppBottomSheet();

  const {
    onSubmit,
    mutation: {isLoading},
  } = useEditAddressForm({
    onSuccess: dismissAppBottomSheet,
    id: data?.id,
  });
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: colors.border,
          paddingHorizontal: 24,
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: 20,
            fontWeight: '700',
            color: colors.text,
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
                  <Text style={{color: colors.text}}>Label :</Text>
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
                  <Text style={{color: colors.text}}>
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
                  <Text style={{color: colors.text}}>
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
            <Text style={{color: colors.text}}>
              Country (Of the Recipient) :
            </Text>
            <AppPicker
              onChange={v => {
                setSelectedCountry(v);
              }}
              value={selectedCountry}
              items={countries.map(country => ({
                label: country,
                value: country,
              }))}
            />
          </View>

          {!!selectedCountry && selectedCountry.length > 0 && (
            <View>
              <Controller
                control={form.control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, value}}) => (
                  <>
                    <Text style={{color: colors.text}}>
                      City (Of the Recipient) :
                    </Text>
                    <AppPicker
                      onChange={onChange}
                      value={value}
                      items={(deliverablesCitiesQuery.data || [])
                        .filter(c => c.country === selectedCountry)
                        .map(c => ({
                          label: c.name,
                          value: c.id,
                        }))}
                    />
                  </>
                )}
                name="city"
              />
              {form.formState.errors.city && (
                <Text style={{color: 'red'}}>
                  {form.formState.errors.city.message}
                </Text>
              )}
            </View>
          )}

          <View>
            <Controller
              control={form.control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <Text style={{color: colors.text}}>
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
          <AppButton
            style={{marginBottom: 34}}
            onPress={form.handleSubmit(onSubmit)}>
            {isLoading && <ActivityIndicator color={colors.background} />}
            {!isLoading && (
              <Text
                style={{
                  color: colors.background,
                  fontSize: 18,
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                Save
              </Text>
            )}
          </AppButton>
        </View>
      </BottomSheetScrollView>
    </View>
  );
}
