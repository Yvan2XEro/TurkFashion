import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type State = {
    id: number | undefined
}

type Actions = {
    setDefaultAddress: (user: number | undefined) => void
}

export const useDefaultAddressStore = create<State & Actions>()(
    persist(immer((set) => ({
        id: undefined,
        setDefaultAddress(id) {
            set((state) => {
                state.id = id
            })
        }
    })), {
        name: "default-address-storage",
        storage: createJSONStorage(() => AsyncStorage),
    })
)
