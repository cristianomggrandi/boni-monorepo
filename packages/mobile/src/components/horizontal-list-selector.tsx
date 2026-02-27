import { FlatList, Pressable, View } from "react-native"
import StyledText from "./styled/styled-text"

type Size = "small" | "normal" | "large"

const getPadding = (size: Size) => {
    switch (size) {
        case "small":
            return "px-2 py-1"
        case "large":
            return "px-4 py-2"
        case "normal":
        default:
            return "px-2 py-2"
    }
}
const getTextSize = (size: Size) => {
    switch (size) {
        case "large":
            return "text-lg"
        case "small":
        case "normal":
        default:
            return ""
    }
}

export default function HorizontalListSelector<T extends { id: number }>({
    list,
    labelExtractor,
    selected,
    onSelect,
    size = "normal",
}: {
    list: T[]
    labelExtractor: (item: T) => string
    selected?: T
    onSelect: (selected: T) => void
    size?: "small" | "normal" | "large"
}) {
    if (!list || !list.length) return null

    return (
        <View className="">
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={list}
                extraData={selected?.id} // Tells FlatList to re-render when this ID changes
                keyExtractor={item => item.id.toString()}
                contentContainerClassName="gap-1 p-1"
                renderItem={({ item }) => (
                    <Pressable
                        key={item.id}
                        className={`
                            rounded-full active:bg-secondary elevation
                            ${getPadding(size)} ${selected?.id === item.id ? "bg-secondary" : "bg-white"}
                        `}
                        onPress={() => onSelect(item)}
                    >
                        <StyledText className={getTextSize(size)}>
                            {labelExtractor(item)}
                        </StyledText>
                    </Pressable>
                )}
            />
        </View>
    )
}
