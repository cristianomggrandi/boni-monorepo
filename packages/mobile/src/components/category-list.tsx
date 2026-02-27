import { BusinessCategory } from "@boni/database/dist/generated/prisma/client"
import { FlatList, Pressable, View } from "react-native"
import { CategoryWithSubcategories } from "../util/db"
import StyledText from "./styled/styled-text"

function CategoryList<T extends BusinessCategory | CategoryWithSubcategories>({
    categories,
    selectedCategory,
    onSelect,
    size = "normal",
}: {
    categories: T[]
    selectedCategory?: T
    onSelect: (selected: T) => void
    size?: "small" | "normal"
}) {
    if (!categories || !categories.length) return null

    return (
        <View className="">
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                extraData={selectedCategory?.id} // Tells FlatList to re-render when this ID changes
                keyExtractor={item => item.id.toString()}
                contentContainerClassName="gap-1 p-1"
                renderItem={({ item }) => (
                    <Pressable
                        key={item.id}
                        className={`
                            p-2 rounded-full active:bg-secondary elevation
                            ${size === "small" ? "py-1" : "py-2"}
                            ${selectedCategory?.id === item.id ? "bg-secondary" : "bg-white"}
                        `}
                        onPress={() => onSelect(item)}
                    >
                        <StyledText>{item.name}</StyledText>
                    </Pressable>
                )}
            />
        </View>
    )
}

export default CategoryList
