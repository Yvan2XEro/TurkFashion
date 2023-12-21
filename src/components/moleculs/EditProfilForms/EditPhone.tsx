import {View, Text} from 'react-native';
import React from 'react';
import {AppTextInput} from '@/components/atoms/AppTextInput';
import {useTheme} from '@react-navigation/native';
import * as z from 'zod';
import {Controller, useForm} from 'react-hook-form';
import {User} from '@/lib/api/auth';
import {zodResolver} from '@hookform/resolvers/zod';
import {AppButton} from '@/components/atoms/AppButton';
import useEditProfile from './useEditProfile';
import {ActivityIndicator} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import {getCountry} from 'react-native-localize';

const schema = z.object({
  phone: z.string(),
});
type TProps = {
  value?: string;
  onSuccess: () => void;
};
export default function EditPhone({value, onSuccess}: TProps) {
  const {colors} = useTheme();
  const {mutation, submit} = useEditProfile({onSuccess});

  const form = useForm<User>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      name: value,
    },
  });
  return (
    <View>
      <Controller
        control={form.control}
        name="phone"
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <Text style={{color: colors.text}}>Name :</Text>
            <PhoneInput
              style={{
                height: 50,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 16,
              }}
              onChangePhoneNumber={onChange}
              countriesList={[
                {
                  name: 'Niger (Nijar)',
                  iso2: 'ne',
                  dialCode: '227',
                  priority: 0,
                  areaCodes: null,
                },
                {
                  name: 'Cameroon (Cameroun)',
                  iso2: 'cm',
                  dialCode: '237',
                  priority: 0,
                  areaCodes: null,
                },
                {
                  name: 'Turkey (Türkiye)',
                  iso2: 'tr',
                  dialCode: '90',
                  priority: 0,
                  areaCodes: null,
                },
                {
                  name: 'Turkmenistan',
                  iso2: 'tm',
                  dialCode: '993',
                  priority: 0,
                  areaCodes: null,
                },
                {
                  name: 'Turks and Caicos Islands',
                  iso2: 'tc',
                  dialCode: '1649',
                  priority: 0,
                  areaCodes: null,
                },
              ]}
              initialValue={'+39'}
              initialCountry={getCountry()}
            />
          </>
        )}
      />
      {form.formState.errors.name && (
        <Text style={{color: colors.notification}}>
          {form.formState.errors.name.message}
        </Text>
      )}

      <AppButton style={{marginTop: 20}} onPress={form.handleSubmit(submit)}>
        {mutation.isLoading && <ActivityIndicator color={colors.background} />}

        {!mutation.isLoading && (
          <Text
            style={{
              color: colors.background,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            SAVE
          </Text>
        )}
      </AppButton>
    </View>
  );
}
