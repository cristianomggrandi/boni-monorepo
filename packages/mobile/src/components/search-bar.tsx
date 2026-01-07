import Feather from "@expo/vector-icons/Feather"
import { TextInput, View } from "react-native"

export default function SearchBar() {
    return (
        <View className="p-2 rounded-2xl bg-primary flex-row items-center justify-center">
            <Feather name="search" size={24} color="black" className="px-4" />
            <TextInput className="flex-1" placeholder="Busque pelo que você precisa" />
        </View>
    )
}
