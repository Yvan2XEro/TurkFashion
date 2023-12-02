import AsyncStorage from "@react-native-async-storage/async-storage";

const pubAPI = process.env.API_URL;
export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
        };
    }
    const response = await fetch(pubAPI + url, options);

    return response;
}