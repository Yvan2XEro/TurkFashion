import {getCurrentUser} from '@/lib/api/auth';
import {useAuthStore} from '@/store/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {PropsWithChildren, useEffect} from 'react';

type TokensPayload = {
  accessToken: string;
  refreshToken?: string | undefined;
};

const AppAuthContextValue = {
  logout: async () => {},
  authenticate: async (cred: TokensPayload) => {},
};
const AppAuthContext = React.createContext(AppAuthContextValue);
export function AppAuthProvider({children}: PropsWithChildren) {
  const {onUserChange} = useAuthStore();

  async function authenticate({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken?: string;
  }) {
    await AsyncStorage.setItem('accessToken', accessToken);
    if (!!refreshToken)
      await AsyncStorage.setItem('refreshToken', refreshToken);

    await fetchCurrentUser();
  }

  async function fetchCurrentUser() {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) return;
    try {
      onUserChange(undefined);

      const user = await getCurrentUser();
      if (!!user) return onUserChange(user);

      onUserChange(null);
    } catch (error) {
      onUserChange(null);
    }
  }

  useEffect(() => {
    (async () => await fetchCurrentUser())();
  }, []);
  async function logout() {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    onUserChange(null);
  }

  return (
    <AppAuthContext.Provider value={{logout, authenticate}}>
      {children}
    </AppAuthContext.Provider>
  );
}

export function useAppAuth() {
  return React.useContext(AppAuthContext);
}
