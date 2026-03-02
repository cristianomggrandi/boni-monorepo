import Feather from "@expo/vector-icons/Feather"
import React from "react"
import { StyleProp, TextInput, TextInputProps, ViewStyle } from "react-native"
import Animated, { AnimatedStyle } from "react-native-reanimated"
import StyledTextInput from "./styled/styled-text-input"

export default function SearchBar({
    containerStyle,
    ...props
}: TextInputProps & {
    containerStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
    ref?: React.RefObject<TextInput | null>
}) {
    return (
        <Animated.View
            className="flex-1 px-2 rounded-2xl bg-white elevation border-0 flex-row items-center justify-center"
            style={containerStyle}
        >
            <Feather name="search" size={24} color="black" className="px-4" />
            <StyledTextInput placeholder="Busque pelo que você precisa" {...props} />
        </Animated.View>
    )
}
