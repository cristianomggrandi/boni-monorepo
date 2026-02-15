import axios from "axios"
import * as SecureStore from "expo-secure-store"
import { JWT_KEY, REFRESH_TOKEN_KEY } from "../stores/auth-store"

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

let isRefreshing = false
let failedQueue: Array<{
    resolve: (value: unknown) => void
    reject: (reason?: any) => void
}> = []

const processQueue = (error: any, token: string | null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })
    failedQueue = []
}

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            error.response?.data?.message === "Access token expired"
        ) {
            if (isRefreshing) {
                // Aqui, ao invés de rejeitar, adicionamos a requisição atual na fila para ser processada depois que o token for renovado
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                })
                    .then(() => {
                        const newToken = SecureStore.getItemAsync(JWT_KEY)

                        originalRequest.headers["Authorization"] = `Bearer ${newToken}`

                        return api(originalRequest)
                    })
                    .catch(err => Promise.reject(err))
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY)
                console.log("Refresh Token:", refreshToken)

                const response = await api.post("/auth/refresh", { refreshToken })

                console.log("New Access Token", response.data.token)

                const accessToken = response.data.token

                await SecureStore.setItemAsync(JWT_KEY, accessToken)

                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`

                processQueue(null, accessToken)
                return api(originalRequest)
            } catch (refreshError) {
                processQueue(refreshError, null)

                await SecureStore.deleteItemAsync(JWT_KEY)
                await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)

                // try {
                //     router.navigate("/login")
                // } catch {}

                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        // try {
        //     router.navigate("/login")
        // } catch {}

        return Promise.reject(error)
    }
)

export default api
