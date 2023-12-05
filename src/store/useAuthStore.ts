import { User } from '@/lib/api/auth'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
    user: User | null | undefined
}

type Actions = {
    onUserChange: (user: User | null | undefined) => void
}

export const useAuthStore = create<State & Actions>()(
    ((set) => ({
        user: undefined,
        onUserChange(u) {
            set((state) => {
                return {
                    ...state,
                    user: u
                }
            })
        }
    }))
)
