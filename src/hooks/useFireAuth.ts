import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

const webClientId = process.env.WEB_CLIENT_ID

GoogleSignin.configure({
    webClientId
});

const usersCollection = firestore().collection('users')
export default function useFireAuth() {
    async function persistUser(authResult: FirebaseAuthTypes.UserCredential) {
        try {
            return await usersCollection.doc(authResult.user.uid).set({
                id: authResult.user.uid,
                displayName: authResult.user.displayName,
                email: authResult.user.email,
                photoURL: authResult.user.photoURL
            });
        } catch (error) {
            console.log(error)
        }

    }

    async function onGoogleButtonPress() {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            const authResult = await auth().signInWithCredential(googleCredential);
            await persistUser(authResult);
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow')
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log('Sign In In Progress')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {

                console.log('Play Services Not Available or Outdated')
            } else {
                // some other error happened
                console.log(error.message)
            }
        }
    }


    return ({
        onGoogleButtonPress,
    })
}