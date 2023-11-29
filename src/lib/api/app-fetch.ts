const pubAPI = process.env.API_URL;
export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    // const token = localStorage.getItem('auth_token');
    // if (token) {
    //     options.headers = {
    //         ...options.headers,
    //         Authorization: `Bearer ${token}`,
    //     };
    // }
    // console.log(url)
    const response = await fetch(pubAPI + url, options);

    return response;
}