import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { getCurrentUser, googleAuth } from '@/lib/api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

const webClientId = process.env.WEB_CLIENT_ID


GoogleSignin.configure({
    webClientId
});

export default function useAppAuth() {

    const { onUserChange } = useAuthStore()

    async function autthenticate({ accessToken, refreshToken }: { accessToken: string, refreshToken?: string }) {
        await AsyncStorage.setItem('accessToken', accessToken);
        if (!!refreshToken)
            await AsyncStorage.setItem('refreshToken', refreshToken);

        await fetchCurrentUser()
    }

    async function fetchCurrentUser() {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) return
        try {
            onUserChange(undefined)

            const user = await getCurrentUser()
            if (!!user)
                return onUserChange(user)

            onUserChange(null)
        } catch (error) {
            onUserChange(null)
        }
    }

    useEffect(() => {
        (async () => await fetchCurrentUser())()
    }, [])
    async function logout() {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        onUserChange(null)
    }


    async function onGoogleButtonPress() {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const userInfos = await GoogleSignin.signIn();

            if (!!userInfos.idToken) {

                const cred = await googleAuth(userInfos);

                await autthenticate(cred);
            }
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow')
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Sign In In Progress')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {

                console.log('Play Services Not Available or Outdated')
            } else {
                console.log(error.message)
            }
        }
    }


    return ({
        onGoogleButtonPress,
        autthenticate,
        logout
    })
}