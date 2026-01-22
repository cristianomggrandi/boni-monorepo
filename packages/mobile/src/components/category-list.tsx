import { FlatList, Pressable, View } from "react-native"
import StyledText from "./styled/styled-text"
import { BusinessCategory } from "@boni/database/dist/generated/prisma/client"

export default function CategoryList({
    categories,
    selectedCategory,
    setSelectedCategory,
    size = "normal",
}: {
    categories: BusinessCategory[]
    selectedCategory?: BusinessCategory
    setSelectedCategory: React.Dispatch<React.SetStateAction<BusinessCategory | undefined>>
    size?: "small" | "normal"
}) {
    if (!categories.length) return null

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
                        onPress={() =>
                            selectedCategory?.id === item.id
                                ? setSelectedCategory(undefined)
                                : setSelectedCategory(item)
                        }
                    >
                        <StyledText>{item.name}</StyledText>
                    </Pressable>
                )}
            />
        </View>
    )
}
