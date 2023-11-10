import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
    user: FirebaseAuthTypes.User | null
}

type Actions = {
    onUserChange: (user: FirebaseAuthTypes.User | null) => void
}

export const useAuthStore = create<State & Actions>()(
    immer((set) => ({
        user: null,
        initializing: true,
        onUserChange(u) {
            set((state) => {
                state.user = u
            })
        }
    }))
)
