import { fetchWithAuth } from "./app-fetch";
import * as z from "zod"

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const registerSchema = z.object({
    email: z.string().email(),
    name: z.string().min(4, { message: "Full Name must be at least 4 characters" }),
    password: z.string().min(6),
    confirmPassword: z.string(),
}).refine(
    data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
}
)

export type RegisterPayload = z.infer<typeof registerSchema>

export type LoginPayload = z.infer<typeof loginSchema>

const pubAPI = process.env.API_URL;

export type User = {
    id: number
    createdAt: string
    updatedAt: string
    email: string
    name: string
    photo: null
    isAdmin: boolean
    isDisabled: boolean
    isStaff: boolean
    provider: string
    externalId: null
}


export async function googleAuth(userInfos: any) {
    try {
        console.log(userInfos)
        delete userInfos.scopes
        const response = await fetch(`${pubAPI}/auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfos)
        })

        console.log(response)

        const data = await response.json();
        console.log(data)
        if (response.ok) {
            return data as { accessToken: string, refreshToken: string }
        }
        return Promise.reject(data)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export async function credentialsSignIn(payload: LoginPayload) {
    try {
        const response = await fetch(`${pubAPI}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json();
        if (response.ok) {
            return data as { accessToken: string, refreshToken: string }
        }
        return Promise.reject(data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function getCurrentUser() {
    try {
        const response = await fetchWithAuth(`/auth/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if (response.ok) {
            return data as User
        }
        return Promise.reject(data)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export async function updateUser(id: number, payload: Partial<User>) {
    try {
        const response = await fetchWithAuth(`/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json();
        if (response.ok) {
            return data as User
        }
        return Promise.reject(data)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export async function register(payload: Omit<RegisterPayload, "confirmPassword">) {
    try {
        const response = await fetch(`${pubAPI}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json() as User
        if (response.ok) {
            return data
        }
        return Promise.reject(data)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}