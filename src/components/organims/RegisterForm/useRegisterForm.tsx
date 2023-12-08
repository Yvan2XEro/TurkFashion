import {useAppAuth} from '@/context/app-auth';
import {
  LoginPayload,
  RegisterPayload,
  credentialsSignIn,
  register,
} from '@/lib/api/auth';
import {useMutation} from 'react-query';
import {useState} from 'react';
import {notify} from '@/lib/utils/notify';
import {useAppBottomSheet} from '@/context/app-bottom-sheet';
import {useLoginForm} from '../LoginForm';

export default function useRegisterForm() {
  const {authenticate: autthenticate} = useAppAuth();
  const {mutation: loginMutation, onSubmit: handleLogin} = useLoginForm();
  const [passwordVisible, setpasswordVisible] = useState(false);
  const {dismissAppBottomSheet} = useAppBottomSheet();
  const mutation = useMutation({
    mutationFn: register,

    onError: (data: any) => {
      if (data.statusCode === 401)
        return notify({
          type: 'error',
          text1: 'Wrong credentials',
          text2: 'Please check your email and password',
          position: 'bottom',
        });

      notify({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please try again later',
        position: 'bottom',
      });
    },
  });

  async function onSubmit(data: RegisterPayload) {
    if (mutation.isLoading) {
      return;
    }
    const {confirmPassword, ...rest} = data;
    await mutation.mutateAsync(rest);
    if (mutation.isSuccess) {
      await handleLogin({email: data.email, password: data.password});
      dismissAppBottomSheet();
    }
  }
  return {
    passwordVisible,
    togglePasswordVisible: () => setpasswordVisible(v => !v),
    onSubmit,
    mutation,
  };
}
