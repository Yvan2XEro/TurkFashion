import useAppAuth from '@/hooks/useAppAuth';
import {LoginPayload, credentialsSignIn} from '@/lib/api/auth';
import {useMutation} from '@tanstack/react-query';
import {useState} from 'react';

export default function useLoginForm() {
  const {autthenticate} = useAppAuth();
  const [passwordVisible, setpasswordVisible] = useState(false);
  const loginMutation = useMutation({
    mutationFn: credentialsSignIn,
    onSuccess: autthenticate,
  });

  async function onSubmit(data: LoginPayload) {
    if (loginMutation.isPending) {
      return;
    }
    await loginMutation.mutateAsync(data);
  }
  return {
    passwordVisible,
    togglePasswordVisible: () => setpasswordVisible(v => !v),
    onSubmit,
    isPending: loginMutation.isPending,
  };
}
