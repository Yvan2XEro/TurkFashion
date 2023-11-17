import { create } from 'zustand'
import { immer, } from 'zustand/middleware/immer'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type State = {
    items: Record<string, number>,
}

type Actions = {
    increase: (uuid: string) => void
    decrease: (uuid: string) => void
    remove: (uuid: string) => void
}

export const useCartStore = create<State & Actions>()(
    persist(immer((set) => ({
        items: {},
        increase(uuid) {
            set((state) => {
                state.items[uuid] = (state.items[uuid] || 0) + 1
            })
        },
        decrease(uuid) {
            set((state) => {
                state.items[uuid] = Math.max(1, (state.items[uuid] || 1) - 1)
            })
        },
        remove(uuid) {
            set((state) => {
                delete state.items[uuid]
            })
        }
    })), {
        name: 'cart-storage',
        storage: createJSONStorage(() => AsyncStorage),
    })
)
