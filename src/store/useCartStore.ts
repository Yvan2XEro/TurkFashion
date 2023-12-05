import { create } from 'zustand'
import { immer, } from 'zustand/middleware/immer'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type State = {
    items: Record<number, number>,
}

type Actions = {
    increase: (id: number) => void
    decrease: (id: number) => void
    remove: (id: number) => void
    clear: () => void
}

export const useCartStore = create<State & Actions>()(
    persist(immer((set) => ({
        items: {},
        increase(id) {
            set((state) => {
                state.items[id] = (state.items[id] || 0) + 1
            })
        },
        decrease(id) {
            set((state) => {
                state.items[id] = Math.max(1, (state.items[id] || 1) - 1)
            })
        },
        remove(id) {
            set((state) => {
                delete state.items[id]
            })
        },
        clear() {
            set((state) => {
                state.items = {}
            })
        }
    })), {
        name: 'cart-storage',
        storage: createJSONStorage(() => AsyncStorage),
    })
)
