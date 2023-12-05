import {View, Text, useColorScheme, Dimensions} from 'react-native';
import React from 'react';
import {AuthScreenWrapper} from '@/components/moleculs/AuthScreenWrapper';
import {useTheme} from '@react-navigation/native';
import {SignInButtons} from '@/components/moleculs/SignInButtons';
import {BlurView} from '@react-native-community/blur';
import {LoginForm} from '@/components/organims/LoginForm';

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
          }}>
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              zIndex: 1,
            }}
            blurType={colorScheme === 'dark' ? 'dark' : 'light'}
            blurAmount={1}
          />
          <View
            style={{
              position: 'relative',
              zIndex: 1.2,
              // borderWidth: 1,
              padding: 10,
              // borderColor: colors.text,
              borderRadius: 10,
              minWidth: Dimensions.get('screen').width * 0.8,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: '600',
                  textShadowOffset: {
                    height: 1,
                    width: 0,
                  },
                  textShadowRadius: 4,
                  color: colors.text,
                }}>
                Turk Fashion
              </Text>
            </View>
            <LoginForm />
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
      </View>
    </AuthScreenWrapper>
  );
}
