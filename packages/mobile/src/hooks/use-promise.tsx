import { useMemo } from "react"

export default function usePromise<T>(
    fetchFunction: () => Promise<T>,
    dependencies: any[] = []
): Promise<T> {
    // const [promise, setPromise] = useState<Promise<T>>(fetchFunction())

    const promise = useMemo(() => fetchFunction(), dependencies)

    return promise
}
