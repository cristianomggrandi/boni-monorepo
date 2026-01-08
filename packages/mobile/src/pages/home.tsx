import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import NextAppointment from "../components/cards/next-appointment"
import SearchBar from "../components/search-bar"

export default function HomePage() {
    return (
        <SafeAreaView edges={["top"]} className="flex-1 bg-pink-50 px-6">
            <SearchBar />
            <NextAppointment />

            {/* <ScrollView horizontal bounces={true} showsHorizontalScrollIndicator={false}>
                    <View className="flex-row gap-2 px-2">
                        <View className="w-16 h-16 items-center justify-center rounded-full border-white border-2">
                            <Text className="text-xs text-white">Hair</Text>
                        </View>
                        <View className="w-16 h-16 items-center justify-center rounded-full border-white border-2">
                            <Text className="text-xs text-white">Nails</Text>
                        </View>
                        <View className="w-16 h-16 items-center justify-center rounded-full border-white border-2">
                            <Text className="text-xs text-white">Makeup</Text>
                        </View>
                        <View className="w-16 h-16 items-center justify-center rounded-full border-white border-2">
                            <Text className="text-xs text-white">Massage</Text>
                        </View>
                        <View className="w-16 h-16 items-center justify-center rounded-full border-white border-2">
                            <Text className="text-xs text-white">Eyebrows</Text>
                        </View>
                        <View className="w-16 h-16 items-center justify-center rounded-full border-white border-2">
                            <Text className="text-xs text-white">Colorist</Text>
                        </View>
                        <View className="w-16 h-16 items-center justify-center rounded-full border-white border-2">
                            <Text className="text-xs text-white">Colorist</Text>
                        </View>
                    </View>
                </ScrollView> */}

            <View>
                <View>
                    <Text>Estabelecimento 1</Text>
                </View>
                <View>
                    <Text>Estabelecimento 2</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
