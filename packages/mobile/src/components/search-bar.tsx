import Feather from "@expo/vector-icons/Feather"
import { TextInput, View } from "react-native"

export default function SearchBar() {
    return (
        <View className="p-2 rounded-2xl bg-white elevation-sm border-0 flex-row items-center justify-center">
            <Feather name="search" size={24} color="black" className="px-4" />
            <TextInput className="flex-1 font-jakarta" placeholder="Busque pelo que você precisa" />
        </View>
    )
}
