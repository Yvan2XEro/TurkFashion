import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {SignInButtons} from '@/components/moleculs/SignInButtons';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {RegisterForm} from '@/components/organims/RegisterForm';
import {AppLogo} from '@/components/atoms/AppLogo';

export default function RegisterScreen() {
  const {colors} = useTheme();

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
          Register
        </Text>
      </View>
      <BottomSheetScrollView style={{flex: 1}}>
        <View
          style={{
            borderRadius: 12,
            position: 'relative',
            overflow: 'hidden',
            padding: 12,
          }}>
          <View
            style={{
              position: 'relative',
              zIndex: 1.2,
              padding: 10,
              borderRadius: 10,
            }}>
            <AppLogo />

            <RegisterForm />
            <View
              style={{
                gap: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SignInButtons />
            </View>
          </View>
        </View>
      </BottomSheetScrollView>
    </View>
  );
}
