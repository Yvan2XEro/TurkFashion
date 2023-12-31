import {useAppAuth} from '@/context/app-auth';
import {LoginPayload, credentialsSignIn} from '@/lib/api/auth';
import {useMutation} from 'react-query';
import {useState} from 'react';
import {notify} from '@/lib/utils/notify';
import {useAppBottomSheet} from '@/context/app-bottom-sheet';

export default function useLoginForm() {
  const {authenticate: autthenticate} = useAppAuth();
  const [passwordVisible, setpasswordVisible] = useState(false);
  const {dismissAppBottomSheet} = useAppBottomSheet();
  const mutation = useMutation({
    mutationFn: credentialsSignIn,
    async onSuccess(data) {
      await autthenticate(data);
      dismissAppBottomSheet();
    },
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

  async function onSubmit(data: LoginPayload) {
    if (mutation.isLoading) {
      return;
    }
    await mutation.mutateAsync(data);
  }
  return {
    passwordVisible,
    togglePasswordVisible: () => setpasswordVisible(v => !v),
    onSubmit,
    mutation,
  };
}
