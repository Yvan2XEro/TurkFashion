import {useAppAuth} from '@/context/app-auth';
import {User, updateUser} from '@/lib/api/auth';
import {useAuthStore} from '@/store/useAuthStore';
import {useMutation} from 'react-query';

export default function useEditProfile({onSuccess}: {onSuccess: () => void}) {
  const {user} = useAuthStore();
  const {fetchCurrentUser} = useAppAuth();
  const mutation = useMutation({
    mutationFn: (data: Partial<User>) => updateUser(user?.id as any, data),
    onSuccess: async () => {
      await fetchCurrentUser();
      onSuccess();
    },
  });

  async function submit(data: Partial<User>) {
    await mutation.mutateAsync(data);
  }
  return {
    submit,
    mutation,
  };
}
