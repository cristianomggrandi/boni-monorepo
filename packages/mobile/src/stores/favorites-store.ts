import { create } from "zustand"
import api from "../api/boni-api"

interface IFavoritesStore {
    favoriteBusinesses: number[]
    getFavoriteBusinesses: () => number[]
    favoriteServices: number[]
    getFavoriteServices: () => number[]
    fetchedFavorites: boolean
    fetchFavorites: () => void
    addFavoriteBusiness: (businessId: number) => void
    removeFavoriteBusiness: (businessId: number) => void
    addFavoriteService: (serviceId: number) => void
    removeFavoriteService: (serviceId: number) => void
}

export const JWT_KEY = "boni_jwt_token"
export const REFRESH_TOKEN_KEY = "boni_refresh_token"

const useFavoritesStore = create<IFavoritesStore>((set, get) => ({
    favoriteBusinesses: [],
    getFavoriteBusinesses: () => {
        if (!get().fetchedFavorites) {
            get().fetchFavorites()
            set({ fetchedFavorites: true })
        }

        return get().favoriteBusinesses
    },
    favoriteServices: [],
    getFavoriteServices: () => {
        if (!get().fetchedFavorites) {
            get().fetchFavorites()
            set({ fetchedFavorites: true })
        }

        return get().favoriteServices
    },
    fetchedFavorites: false,
    fetchFavorites: async () => {
        if (get().fetchedFavorites) return

        set({ fetchedFavorites: true })

        try {
            const [businessResponse, serviceResponse] = await Promise.all([
                api.get("/favorite-businesses"),
                api.get("/favorite-services"),
            ])

            set({
                favoriteBusinesses: businessResponse.data,
                favoriteServices: serviceResponse.data,
            })
        } catch (error) {
            console.error("Failed to fetch favorites:", error)
            set({ fetchedFavorites: false })
        }
    },
    addFavoriteBusiness: (businessId: number) => {
        set(state => ({
            favoriteBusinesses: [...state.favoriteBusinesses, businessId],
        }))
    },
    removeFavoriteBusiness: (businessId: number) => {
        set(state => ({
            favoriteBusinesses: state.favoriteBusinesses.filter(id => id !== businessId),
        }))
    },
    addFavoriteService: (serviceId: number) => {
        set(state => ({
            favoriteServices: [...state.favoriteServices, serviceId],
        }))
    },
    removeFavoriteService: (serviceId: number) => {
        set(state => ({
            favoriteServices: state.favoriteServices.filter(id => id !== serviceId),
        }))
    },
}))

export default useFavoritesStore
