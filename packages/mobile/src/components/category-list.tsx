import { Category } from "@boni/database/dist/generated/prisma/client"
import { FlatList, Pressable, View } from "react-native"
import StyledText from "./styled-text"

export default function CategoryList({
    categories,
    selectedCategory,
    setSelectedCategory,
}: {
    categories: Category[]
    selectedCategory?: Category
    setSelectedCategory: React.Dispatch<React.SetStateAction<Category | undefined>>
}) {
    if (!categories.length) return null

    return (
        <View className="mt-2 px-6">
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                extraData={selectedCategory?.id} // Tells FlatList to re-render when this ID changes
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <Pressable
                        key={item.id}
                        className={`
                            p-2 rounded-full active:bg-secondary
                            ${selectedCategory?.id === item.id ? "bg-secondary" : "bg-white"}
                        `}
                        onPress={() => setSelectedCategory(item)}
                    >
                        <StyledText>{item.name}</StyledText>
                    </Pressable>
                )}
            />
        </View>
    )
}
