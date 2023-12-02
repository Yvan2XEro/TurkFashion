
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "core-js/stable/atob";
import { jwtDecode } from 'jwt-decode';
import useAppAuth from './useAppAuth';
import { useAuthStore } from '@/store/useAuthStore';

const pubAPI = process.env.API_URL;

const useTokenRefresher = () => {
    const { logout } = useAppAuth()
    const { user } = useAuthStore()
    useEffect(() => {
        if (!user) return

        const checkTokenExpiration = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');

                if (accessToken) {
                    const decodedToken: { exp: number } = jwtDecode(accessToken);
                    const currentTime = Math.floor(Date.now() / 1000);

                    if (decodedToken.exp < currentTime) {
                        await refreshTokens();
                    }
                }
            } catch (error) {
                console.error('Erreur lors de la vérification de l\'expiration du token:', error);
            }
        };


        const refreshTokens = async () => {
            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');

                if (refreshToken) {
                    const response = await fetch(`${pubAPI}/auth/refresh`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${refreshToken}`,
                        },
                    });

                    if (response.ok) {
                        const { accessToken: newAccessToken } = await response.json();
                        await AsyncStorage.setItem('accessToken', newAccessToken);
                    } else if (response.status >= 400 && response.status < 500) {
                        await logout()
                    }
                }
            } catch (error) {
                console.error('Erreur lors du rafraîchissement des tokens:', error);
            }
        };

        checkTokenExpiration();

        const intervalId = setInterval(() => {
            checkTokenExpiration();
        }, 60000);

        return () => clearInterval(intervalId);
    }, [user]);
};

export default useTokenRefresher;
