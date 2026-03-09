import { FlatList, Pressable, View, ViewProps } from "react-native"
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
    idExtractor,
    selected,
    onSelect,
    size = "normal",
    selectedColor,
    ...props
}: ViewProps & {
    list: T[]
    labelExtractor: (item: T) => string
    idExtractor: (item: T) => string | number
    selected?: string | number
    onSelect: (selected: T, index: number) => void
    size?: "small" | "normal" | "large"
    selectedColor?: string
}) {
    if (!list || !list.length) return null

    const selectedStyle = selectedColor ? "bg-" + selectedColor : "bg-secondary"

    return (
        <View {...props}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={list}
                keyExtractor={item => item.id.toString()}
                contentContainerClassName="gap-1 p-1"
                renderItem={({ item, index }) => {
                    const id = idExtractor(item)
                    const isActive = id === selected

                    return (
                        <Pressable
                            key={item.id}
                            className={`
                            rounded-full active:${selectedStyle} elevation ${getPadding(size)}
                            ${isActive ? selectedStyle : "bg-white"}
                        `}
                            onPress={() => onSelect(item, index)}
                        >
                            <StyledText className={getTextSize(size)}>
                                {labelExtractor(item)}
                            </StyledText>
                        </Pressable>
                    )
                }}
            />
        </View>
    )
}
