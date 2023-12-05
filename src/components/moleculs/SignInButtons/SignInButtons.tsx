import {View, Text, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import useAppAuth from '@/hooks/useAppAuth';

export default function SignInButtons() {
  const {onGoogleButtonPress} = useAppAuth();

  return (
    <>
      <SinInButton
        ionIconName="logo-google"
        label="Google"
        onPress={async () => {
          await onGoogleButtonPress();
        }}
      />
      <SinInButton
        ionIconName="logo-facebook"
        label="Facebook"
        onPress={async () => {}}
      />
      <SinInButton
        ionIconName="logo-apple"
        label="Apple"
        onPress={async () => {}}
      />
      <SinInButton ionIconName="mail" label="Email" onPress={async () => {}} />
    </>
  );
}

type TProps = {
  label: string;
  ionIconName: string;
  onPress: () => Promise<void>;
};

function SinInButton({label, ionIconName, onPress}: TProps) {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.text,
        padding: 8,
        borderRadius: 10,
        justifyContent: 'center',
        gap: 4,
      }}
      onPress={onPress}>
      <IonIcon name={ionIconName} size={25} color={colors.text} />
    </TouchableOpacity>
  );
}
