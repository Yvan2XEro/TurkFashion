import {useAppAuth} from '@/context/app-auth';
import {LoginPayload, credentialsSignIn} from '@/lib/api/auth';
import {useMutation} from 'react-query';
import {useState} from 'react';

export default function useLoginForm() {
  const {authenticate: autthenticate} = useAppAuth();
  const [passwordVisible, setpasswordVisible] = useState(false);
  const loginMutation = useMutation({
    mutationFn: credentialsSignIn,
    onSuccess: autthenticate,
  });

  async function onSubmit(data: LoginPayload) {
    if (loginMutation.isLoading) {
      return;
    }
    await loginMutation.mutateAsync(data);
  }
  return {
    passwordVisible,
    togglePasswordVisible: () => setpasswordVisible(v => !v),
    onSubmit,
    isPending: loginMutation.isLoading,
  };
}
