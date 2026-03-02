import { Business, Prisma } from "@boni/database/dist/generated/prisma/client"
import api from "../api/boni-api"
import { SearchFilters } from "../stores/search-filters-params-store"

export type CategoryWithSubcategories = Prisma.BusinessCategoryGetPayload<{
    include: { subcategories: true }
}>

export async function getCategories(): Promise<CategoryWithSubcategories[]> {
    try {
        const response = await api.get("categories")

        return response.data
    } catch (error) {
        console.log("CATEGORIES ERROR:", error)
        return []
    }
}

export async function getSubCategories(categoryId: number) {
    try {
        const response = await api.get("categories/" + categoryId + "/subcategories")

        return response.data
    } catch (error) {
        console.log("SUBCATEGORIES ERROR:", error)
        return []
    }
}

export async function getBusinesses(filters: SearchFilters): Promise<Business[]> {
    try {
        const params = new URLSearchParams()

        Object.entries(filters).forEach(([key, value]) => {
            params.append(key, value)
        })

        const response = await api.get("business?" + params.toString())

        return response.data
    } catch (error) {
        console.log("BUSINESS ERROR:", error)
        return []
    }
}
