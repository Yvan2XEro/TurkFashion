import { Category, Filter, SubCategory } from '@/types/models'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
    filters: Filter[]
    activeFilters: Filter[]
    categories: Category[]
    subCategories: SubCategory[]
    activeCategory: string | null
    activeSubCategory: string | null
}

type Actions = {
    setFilters: (f: Filter[]) => void
    setActiveFilters: (f: Filter[]) => void
    setCategories: (c: Category[]) => void
    setSubCategories: (c: SubCategory[]) => void
    setActiveCategory: (c: string | null) => void
    setActiveSubCategory: (c: string | null) => void
}

export const useFiltersStore = create<State & Actions>()(
    immer((set) => ({
        filters: [],
        setFilters(f) {
            set((state) => {
                state.filters = f
            })
        },

        activeFilters: [],
        setActiveFilters(f) {
            set((state) => {
                state.activeFilters = f
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
                if (!!c && c !== state.activeCategory || !c) state.activeSubCategory = null
                state.activeCategory = c
            })
        },

        activeSubCategory: null,
        setActiveSubCategory(c) {
            set((state) => {
                state.activeSubCategory = c
            })
        },
    }))
)
