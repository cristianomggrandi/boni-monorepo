import { useEffect, useState } from "react"
import useAuthStore from "../stores/auth-store"

export default function useUserDependentPromise<T>(fetchFunction: () => Promise<T>) {
    const token = useAuthStore(state => state.token)

    const [promise, setPromise] = useState<Promise<T | null>>(Promise.resolve(null))

    useEffect(() => {
        if (token) setPromise(fetchFunction())
    }, [token])

    return promise
}
