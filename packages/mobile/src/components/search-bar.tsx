import Feather from "@expo/vector-icons/Feather"
import { View } from "react-native"
import StyledTextInput from "./styled/styled-text-input"

export default function SearchBar() {
    return (
        <View className="px-2">
            <View className="p-2 rounded-2xl bg-white elevation border-0 flex-row items-center justify-center">
                <Feather name="search" size={24} color="black" className="px-4" />
                <StyledTextInput placeholder="Busque pelo que você precisa" />
            </View>
        </View>
    )
}
