import { Business, Service } from "@boni/database/dist/generated/prisma/client"
import { create } from "zustand"
import api from "../api/boni-api"

interface IFavoritesStore {
    favoriteBusinesses: Business[]
    favoriteBusinessIds: number[]
    getFavoriteBusinesses: () => Business[]
    getFavoriteBusinessIds: () => number[]
    favoriteServices: Service[]
    favoriteServiceIds: number[]
    getFavoriteServices: () => Service[]
    getFavoriteServiceIds: () => number[]
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
    favoriteBusinessIds: [],
    getFavoriteBusinesses: () => {
        if (!get().fetchedFavorites) {
            get().fetchFavorites()
            set({ fetchedFavorites: true })
        }

        return get().favoriteBusinesses
    },
    getFavoriteBusinessIds: () => {
        if (!get().fetchedFavorites) {
            get().fetchFavorites()
            set({ fetchedFavorites: true })
        }

        return get().favoriteBusinessIds
    },
    favoriteServices: [],
    favoriteServiceIds: [],
    getFavoriteServices: () => {
        if (!get().fetchedFavorites) {
            get().fetchFavorites()
            set({ fetchedFavorites: true })
        }

        return get().favoriteServices
    },
    getFavoriteServiceIds: () => {
        if (!get().fetchedFavorites) {
            get().fetchFavorites()
            set({ fetchedFavorites: true })
        }

        return get().favoriteServiceIds
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
                favoriteBusinessIds: businessResponse.data.map((b: any) => b.id),
                favoriteServices: serviceResponse.data,
                favoriteServiceIds: serviceResponse.data.map((s: any) => s.id),
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
