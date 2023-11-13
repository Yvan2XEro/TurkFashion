import { Category, Filter, SubCategory } from '@/types/models'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
    filters: Filter[]
    activeFilters: Record<string, string>
    categories: Category[]
    subCategories: SubCategory[]
    activeCategory: string | null
    activeSubCategory: string | null
    minPrice: string | undefined
    maxPrice: string | undefined
}

type Actions = {
    setFilters: (f: Filter[]) => void
    setActiveFilters: (f: { key: string, value: string }) => void
    setCategories: (c: Category[]) => void
    setSubCategories: (c: SubCategory[]) => void
    setActiveCategory: (c: string | null) => void
    setActiveSubCategory: (c: string | null) => void
    setMinPrice: (p: string | undefined) => void
    setMaxPrice: (p: string | undefined) => void
}

export const useFiltersStore = create<State & Actions>()(
    immer((set) => ({
        filters: [],
        setFilters(f) {
            set((state) => {
                state.filters = f
            })
        },

        activeFilters: {},
        setActiveFilters(f) {
            set((state) => {
                if (state.activeFilters[f.key] === f.value) {
                    delete state.activeFilters[f.key]
                    return
                }
                state.activeFilters[f.key] = f.value
            })
        },

        categories: [],
        setCategories(c) {
            set((state) => {
                state.categories = c
            })
        },

        subCategories: [],
        setSubCategories(c) {
            set((state) => {
                state.subCategories = c
            })
        },

        activeCategory: null,
        setActiveCategory(c) {
            set((state) => {
                if (!!c && c !== state.activeCategory || !c) {
                    state.activeSubCategory = null
                    state.activeFilters = {}
                }
                state.activeCategory = c
            })
        },

        activeSubCategory: null,
        setActiveSubCategory(c) {
            set((state) => {
                state.activeSubCategory = c
            })
        },
        minPrice: undefined,
        setMinPrice(p) {
            set((state) => {
                state.minPrice = p
            })
        },
        maxPrice: undefined,
        setMaxPrice(p) {
            set((state) => {
                state.maxPrice = p
            })
        }
    }))
)
