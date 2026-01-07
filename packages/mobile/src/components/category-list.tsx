import { Category } from "@boni/database/dist/generated/prisma/client"
import { useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import api from "../api/boni-api"
import StyledText from "./styled-text"

export default function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState<Category>()

    useEffect(() => {
        api.get("categories")
            .then(response => setCategories(response.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            className="mt-2 grow-0 py-2 px-6"
        >
            <View className="h-full w-full flex-row gap-2">
                {categories.map(category => (
                    <View
                        key={category.id}
                        className="p-2 bg-white rounded-full elevation-sm border-0 "
                    >
                        <StyledText className="">{category.name}</StyledText>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}
