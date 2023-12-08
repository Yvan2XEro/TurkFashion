import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {AppTextInput} from '@/components/atoms/AppTextInput';
import {AppButton} from '@/components/atoms/AppButton';
import {useTheme} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import useRegisterForm from './useRegisterForm';
import {useForm, Controller} from 'react-hook-form';
import {RegisterPayload, registerSchema} from '@/lib/api/auth';
import {zodResolver} from '@hookform/resolvers/zod';

const {width} = Dimensions.get('window');

export default function RegisterForm() {
  const {colors} = useTheme();
  const {passwordVisible, togglePasswordVisible, onSubmit, mutation} =
    useRegisterForm();
  const form = useForm<RegisterPayload>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
  });

  return (
    <View style={{marginVertical: 20, gap: 20}}>
      {mutation.error && mutation.error.statusCode === 401 && (
        <View
          style={{
            borderRadius: 8,
            padding: 4,
            borderWidth: 1,
            borderColor: colors.notification,
          }}>
          <Text style={{color: colors.notification, textAlign: 'center'}}>
            Wrong email or password!
          </Text>
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
              <Text style={{color: colors.text}}>Name :</Text>
              <AppTextInput
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                style={{paddingRight: 40}}
                placeholder="Name..."
              />
            </>
          )}
          name="name"
        />
        {form.formState.errors.email && (
          <Text style={{color: 'red'}}>
            {form.formState.errors.email.message}
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
              <Text style={{color: colors.text}}>Email :</Text>
              <AppTextInput
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                style={{paddingRight: 40}}
                placeholder="email..."
              />
            </>
          )}
          name="email"
        />
        {form.formState.errors.email && (
          <Text style={{color: 'red'}}>
            {form.formState.errors.email.message}
          </Text>
        )}
      </View>
      <View style={{position: 'relative'}}>
        <Controller
          control={form.control}
          name="password"
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <Text style={{color: colors.text}}>Password :</Text>
              <AppTextInput
                placeholder="********"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                style={{paddingRight: 40}}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 25,
                  padding: 10,
                }}
                onPress={togglePasswordVisible}>
                <IonIcons
                  name={!passwordVisible ? 'eye' : 'eye-off'}
                  size={20}
                  color={colors.text}
                />
              </TouchableOpacity>
            </>
          )}
        />
        {form.formState.errors.password && (
          <Text style={{color: 'red'}}>
            {form.formState.errors.password.message}
          </Text>
        )}
      </View>
      <View style={{position: 'relative'}}>
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <Text style={{color: colors.text}}>Confirm Password :</Text>
              <AppTextInput
                placeholder="********"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                style={{paddingRight: 40}}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 25,
                  padding: 10,
                }}
                onPress={togglePasswordVisible}>
                <IonIcons
                  name={!passwordVisible ? 'eye' : 'eye-off'}
                  size={20}
                  color={colors.text}
                />
              </TouchableOpacity>
            </>
          )}
        />
        {form.formState.errors.confirmPassword && (
          <Text style={{color: 'red'}}>
            {form.formState.errors.confirmPassword.message}
          </Text>
        )}
      </View>
      <AppButton onPress={form.handleSubmit(onSubmit)}>
        {mutation.isLoading && <ActivityIndicator color={colors.background} />}

        {!mutation.isLoading && (
          <Text
            style={{
              color: colors.background,
              fontSize: 18,
              textAlign: 'center',
              fontWeight: '600',
            }}>
            Register
          </Text>
        )}
      </AppButton>
    </View>
  );
}
