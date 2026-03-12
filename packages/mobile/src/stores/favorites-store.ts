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
    isLoadingFavorites: boolean
    fetchFavorites: () => void
    addFavoriteBusiness: (business: Business) => void
    removeFavoriteBusiness: (business: Business) => void
    addFavoriteService: (service: Service) => void
    removeFavoriteService: (service: Service) => void
}

export const JWT_KEY = "boni_jwt_token"
export const REFRESH_TOKEN_KEY = "boni_refresh_token"

// ALTERAR GETTERS PARA ASYNC QUE RETONA A LISTA SALVA OU BUSCA SE NÃO ESTIVER SALVA

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
    isLoadingFavorites: false,
    fetchFavorites: async () => {
        if (get().fetchedFavorites || get().isLoadingFavorites) return

        set({ isLoadingFavorites: true })

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
                fetchedFavorites: true,
                isLoadingFavorites: false,
            })
        } catch (error) {
            console.error("Failed to fetch favorites:", error)
            set({ fetchedFavorites: false, isLoadingFavorites: false })
        }
    },
    addFavoriteBusiness: (business: Business) => {
        set(state => ({
            favoriteBusinesses: [...state.favoriteBusinesses, business],
            favoriteBusinessIds: [...state.favoriteBusinessIds, business.id],
        }))
    },
    removeFavoriteBusiness: (business: Business) => {
        set(state => ({
            favoriteBusinesses: state.favoriteBusinesses.filter(b => b.id !== business.id),
            favoriteBusinessIds: state.favoriteBusinessIds.filter(id => id !== business.id),
        }))
    },
    addFavoriteService: (service: Service) => {
        set(state => ({
            favoriteServices: [...state.favoriteServices, service],
            favoriteServiceIds: [...state.favoriteServiceIds, service.id],
        }))
    },
    removeFavoriteService: (service: Service) => {
        set(state => ({
            favoriteServices: state.favoriteServices.filter(s => s.id !== service.id),
            favoriteServiceIds: state.favoriteServiceIds.filter(id => id !== service.id),
        }))
    },
}))

export default useFavoritesStore
