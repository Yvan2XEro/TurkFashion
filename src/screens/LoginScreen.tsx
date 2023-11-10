import {View, Text, useColorScheme, Dimensions} from 'react-native';
import React from 'react';
import {AuthScreenWrapper} from '@/components/moleculs/AuthScreenWrapper';
import {useTheme} from '@react-navigation/native';
import {SignInButtons} from '@/components/moleculs/SignInButtons';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const {colors} = useTheme();

  return (
    <AuthScreenWrapper>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            borderRadius: 12,
            position: 'relative',
            overflow: 'hidden',
            padding: 12,
            backgroundColor:
              colorScheme === 'dark'
                ? 'rgba(0, 0, 0, 0.5)'
                : 'rgba(255, 255, 255, 0.5)',
          }}>
          <View
            style={{
              position: 'relative',
              // borderWidth: 1,
              padding: 10,
              // borderColor: colors.text,
              borderRadius: 10,
              minWidth: Dimensions.get('screen').width * 0.8,
            }}>
            <View>
              <Text
                style={{fontSize: 32, fontWeight: '600', color: colors.text}}>
                Turk Fashion
              </Text>
            </View>
            <View style={{gap: 10}}>
              <SignInButtons />
            </View>
          </View>
        </View>
      </View>
    </AuthScreenWrapper>
  );
}
