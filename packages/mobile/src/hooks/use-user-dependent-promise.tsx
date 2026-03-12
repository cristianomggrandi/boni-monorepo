import { useMemo } from "react"
import useAuthStore from "../stores/auth-store"

export default function useUserDependentPromise<T>(fetchFunction: () => Promise<T>) {
    const token = useAuthStore(state => state.token)

    const promise = useMemo(() => fetchFunction(), [token])

    return promise
}
