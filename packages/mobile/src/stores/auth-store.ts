import { router } from "expo-router"
import * as SecureStore from "expo-secure-store"
import { create } from "zustand"
import api from "../api/boni-api"

interface ILoginData {
    email: string
    password: string
}

interface IAuthStore {
    token: string | null
    isLoggedIn: boolean
    register: (data: ILoginData) => void
    login: (data: ILoginData) => void
    logout: () => void
    initialize: () => void
}

export const JWT_KEY = "boni_jwt_token"

const useAuthStore = create<IAuthStore>((set, get) => ({
    isLoggedIn: false,
    token: null,
    register: async (data: ILoginData) => {
        api.post("/auth/signup", data)
            .then(async response => {
                set({ token: response.data, isLoggedIn: true })

                await SecureStore.setItemAsync(JWT_KEY, response.data)

                router.replace("/(tabs)")
            })
            .catch(error => {
                console.error("Registration failed:", error)
            })
    },
    login: async data => {
        api.post("/auth/login", data)
            .then(async response => {
                set({ token: response.data, isLoggedIn: true })

                await SecureStore.setItemAsync(JWT_KEY, response.data)

                router.replace("/(tabs)")
            })
            .catch(error => {
                console.error("Login failed:", error)
            })
    },
    logout: async () => {
        set({ token: null, isLoggedIn: false })

        // TODO: router.replace("/(auth)") ????

        await SecureStore.deleteItemAsync(JWT_KEY)
    },
    initialize: async () => {
        const token = await SecureStore.getItemAsync(JWT_KEY)

        if (token) set({ token, isLoggedIn: true })
    },
}))

export default useAuthStore
