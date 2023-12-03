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
    persist(((set) => ({
        items: {},
        increase(id) {
            set((state) => {
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [id]: (state.items[id] || 0) + 1
                    }
                }
            })
        },
        decrease(id) {
            set((state) => {
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [id]: Math.max(1, (state.items[id] || 1) - 1)
                    }
                }
            })
        },
        remove(id) {
            set((state) => {
                const newItems = state.items
                delete newItems[id]

                return {
                    ...state,
                    items: newItems
                }
            })
        },
        clear() {
            set((state) => {
                return { ...state, items: {} }
            })
        }
    })), {
        name: 'cart-storage',
        storage: createJSONStorage(() => AsyncStorage),
    })
)
