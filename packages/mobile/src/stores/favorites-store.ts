import { Business, Service } from "@boni/database/dist/generated/prisma/client"
import { create } from "zustand"
import api from "../api/boni-api"

interface IFavoritesStore {
    favoriteBusinesses: Business[]
    favoriteBusinessIds: number[]
    getFavoriteBusinesses: () => Promise<Business[]>
    getFavoriteBusinessIds: () => Promise<number[]>
    favoriteServices: Service[]
    favoriteServiceIds: number[]
    getFavoriteServices: () => Promise<Service[]>
    getFavoriteServiceIds: () => Promise<number[]>
    fetchedFavorites: boolean
    isLoadingFavorites: boolean
    fetchFavorites: () => Promise<{
        business: Business[]
        businessIds: number[]
        services: Service[]
        serviceIds: number[]
    }>
    addFavoriteBusiness: (business: Business) => void
    removeFavoriteBusiness: (business: Business) => void
    addFavoriteService: (service: Service) => void
    removeFavoriteService: (service: Service) => void
}

export const JWT_KEY = "boni_jwt_token"
export const REFRESH_TOKEN_KEY = "boni_refresh_token"

const useFavoritesStore = create<IFavoritesStore>((set, get) => {
    const updateGetters = () => ({
        getFavoriteBusinesses: async () => {
            return (await get().fetchFavorites()).business
        },
        getFavoriteBusinessIds: async () => {
            return (await get().fetchFavorites()).businessIds
        },
        getFavoriteServices: async () => {
            return (await get().fetchFavorites()).services
        },
        getFavoriteServiceIds: async () => {
            return (await get().fetchFavorites()).serviceIds
        },
    })

    return {
        favoriteBusinesses: [],
        favoriteBusinessIds: [],
        ...updateGetters(),
        favoriteServices: [],
        favoriteServiceIds: [],
        fetchedFavorites: false,
        isLoadingFavorites: false,
        // TODO: Add parameter to force refresh?
        fetchFavorites: async () => {
            if (get().fetchedFavorites || get().isLoadingFavorites)
                return {
                    business: get().favoriteBusinesses,
                    services: get().favoriteServices,
                    businessIds: get().favoriteBusinessIds,
                    serviceIds: get().favoriteServiceIds,
                }

            set({ isLoadingFavorites: true, ...updateGetters() })

            try {
                const [businessResponse, serviceResponse] = await Promise.all([
                    api.get("/favorite-businesses"),
                    api.get("/favorite-services"),
                ])

                const favoriteBusinessIds = businessResponse.data.map((b: any) => b.id)
                const favoriteServiceIds = serviceResponse.data.map((s: any) => s.id)

                set({
                    favoriteBusinesses: businessResponse.data,
                    favoriteBusinessIds,
                    favoriteServices: serviceResponse.data,
                    favoriteServiceIds,
                    fetchedFavorites: true,
                    isLoadingFavorites: false,
                    ...updateGetters(),
                })

                return {
                    business: businessResponse.data,
                    services: serviceResponse.data,
                    businessIds: favoriteBusinessIds,
                    serviceIds: favoriteServiceIds,
                }
            } catch (error) {
                console.error("Failed to fetch favorites:", error)

                set({ fetchedFavorites: false, isLoadingFavorites: false, ...updateGetters() })

                return {
                    business: get().favoriteBusinesses,
                    services: get().favoriteServices,
                    businessIds: get().favoriteBusinessIds,
                    serviceIds: get().favoriteServiceIds,
                }
            }
        },
        addFavoriteBusiness: (business: Business) => {
            api.post("/favorite-businesses/" + business.id).then(() => {
                set(state => ({
                    favoriteBusinesses: [...state.favoriteBusinesses, business],
                    favoriteBusinessIds: [...state.favoriteBusinessIds, business.id],
                    ...updateGetters(),
                }))
            })
        },
        removeFavoriteBusiness: (business: Business) => {
            api.delete("/favorite-businesses/" + business.id).then(() => {
                set(state => ({
                    favoriteBusinesses: state.favoriteBusinesses.filter(b => b.id !== business.id),
                    favoriteBusinessIds: state.favoriteBusinessIds.filter(id => id !== business.id),
                    ...updateGetters(),
                }))
            })
        },
        addFavoriteService: (service: Service) => {
            api.post("/favorite-services/" + service.id).then(() => {
                set(state => ({
                    favoriteServices: [...state.favoriteServices, service],
                    favoriteServiceIds: [...state.favoriteServiceIds, service.id],
                    ...updateGetters(),
                }))
            })
        },
        removeFavoriteService: (service: Service) => {
            api.delete("/favorite-services/" + service.id).then(() => {
                set(state => ({
                    favoriteServices: state.favoriteServices.filter(s => s.id !== service.id),
                    favoriteServiceIds: state.favoriteServiceIds.filter(id => id !== service.id),
                    ...updateGetters(),
                }))
            })
        },
    }
})

export default useFavoritesStore
