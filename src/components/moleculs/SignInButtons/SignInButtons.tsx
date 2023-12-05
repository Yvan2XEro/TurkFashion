import {View, Text, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {useAppAuth} from '@/context/app-auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {googleAuth} from '@/lib/api/auth';

const webClientId = process.env.WEB_CLIENT_ID;

GoogleSignin.configure({
  webClientId,
  offlineAccess: true,
});

export default function SignInButtons() {
  const {authenticate} = useAppAuth();
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfos = await GoogleSignin.signIn();

      if (!!userInfos.idToken) {
        console.log('ISISIS', userInfos);

        const cred = await googleAuth(userInfos);

        await authenticate(cred);
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign In In Progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log(error.message);
      }
    }
  }
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
