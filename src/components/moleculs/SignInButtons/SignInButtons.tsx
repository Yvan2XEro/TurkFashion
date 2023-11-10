import {View, Text, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import useFireAuth from '@/hooks/useFireAuth';

export default function SignInButtons() {
  const {onGoogleButtonPress} = useFireAuth();

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
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.text,
        paddingVertical: 3,
        borderRadius: 10,
        justifyContent: 'center',
        gap: 4,
      }}
      onPress={onPress}>
      <IonIcon name={ionIconName} size={32} color={colors.text} />
      <Text style={{color: colors.text}}>{label}</Text>
    </TouchableOpacity>
  );
}
