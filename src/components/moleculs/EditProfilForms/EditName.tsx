import {View, Text} from 'react-native';
import React from 'react';
import {AppTextInput} from '@/components/atoms/AppTextInput';
import {useTheme} from '@react-navigation/native';
import * as z from 'zod';
import {Controller, useForm} from 'react-hook-form';
import {User} from '@/lib/api/auth';
import {zodResolver} from '@hookform/resolvers/zod';
import {AppButton} from '@/components/atoms/AppButton';
import useEditName from './useEditName';
import {ActivityIndicator} from 'react-native';

const schema = z.object({
  name: z
    .string()
    .min(3, {message: 'Name must be at least 3 characters'})
    .max(30, {message: 'Name must be at most 30 characters'}),
});
type TProps = {
  value?: string;
  onSuccess: () => void;
};
export default function EditName({value, onSuccess}: TProps) {
  const {colors} = useTheme();
  const {mutation, submit} = useEditName({onSuccess});

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
        name="name"
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <Text style={{color: colors.text}}>Name :</Text>
            <AppTextInput
              placeholder="Enter your name"
              onChangeText={onChange}
              autoFocus
              value={value}
              onBlur={onBlur}
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
