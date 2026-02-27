import { Business, Prisma } from "@boni/database/dist/generated/prisma/client"
import api from "../api/boni-api"

export type Filters = Record<string, string>

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

export async function getBusinesses(filters: Filters): Promise<Business[]> {
    try {
        const params = new URLSearchParams(filters)

        const response = await api.get("business?" + params.toString())

        return response.data
    } catch (error) {
        console.log("BUSINESS ERROR:", error)
        return []
    }
}
