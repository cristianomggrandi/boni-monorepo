import axios from "axios"
import * as SecureStore from "expo-secure-store"
import { JWT_KEY } from "../stores/auth-store"

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
})

api.interceptors.request.use(
    async config => {
        const token = await SecureStore.getItemAsync(JWT_KEY)

        if (token) config.headers.Authorization = `Bearer ${token}`

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default api
