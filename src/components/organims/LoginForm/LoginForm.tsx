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
import useLoginForm from './useLoginForm';
import {useForm, Controller} from 'react-hook-form';
import {LoginPayload, loginSchema} from '@/lib/api/auth';
import {zodResolver} from '@hookform/resolvers/zod';

const {width} = Dimensions.get('window');

export default function LoginForm() {
  const {colors} = useTheme();
  const {passwordVisible, togglePasswordVisible, onSubmit, isPending} =
    useLoginForm();
  const form = useForm<LoginPayload>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });
  return (
    <View style={{marginVertical: 20, gap: 20}}>
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
                style={{paddingRight: 40, width: width - 100}}
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
                style={{paddingRight: 40, width: width - 100}}
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
      <Pressable>
        <Text style={{color: colors.text}}>Forgot password?</Text>
      </Pressable>
      <AppButton onPress={form.handleSubmit(onSubmit)}>
        {isPending && <ActivityIndicator color={colors.background} />}

        {!isPending && (
          <Text
            style={{
              color: colors.background,
              fontSize: 18,
              textAlign: 'center',
              fontWeight: '600',
            }}>
            Login
          </Text>
        )}
      </AppButton>
    </View>
  );
}
