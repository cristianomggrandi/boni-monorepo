import { create } from "zustand"

export interface SearchFilters {
    category?: number
    subCategory?: number
    orderBy?: number
    minimumRating?: number
}

interface ISearchFiltersParamsStore {
    filters: SearchFilters
    setFilters: (filters: Partial<SearchFilters>) => void
    addFilter: <T extends keyof SearchFilters>(key: T, value: SearchFilters[T]) => void
    removeFilter: (key: keyof SearchFilters) => void
    resetFilters: () => void
}

const initialFilters: SearchFilters = {}

const useSearchFiltersParams = create<ISearchFiltersParamsStore>(set => ({
    filters: { ...initialFilters },
    setFilters: filters => set(state => ({ filters: { ...state.filters, ...filters } })),
    addFilter: (key, value) => set(state => ({ filters: { ...state.filters, [key]: value } })),
    removeFilter: key =>
        set(state => {
            const newFilters = { ...state.filters, [key]: undefined }
            return { filters: newFilters }
        }),
    resetFilters: () => set({ filters: { ...initialFilters } }),
}))

export default useSearchFiltersParams
