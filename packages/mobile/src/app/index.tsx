import Feather from "@expo/vector-icons/Feather"
import { Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import NextAppointment from "../components/cards/next-appointment"

export default function Index() {
    return (
        <SafeAreaView className="flex-1 bg-pink-50">
            <View className="m-6 p-2 rounded-2xl bg-primary flex-row items-center justify-center">
                <Feather name="search" size={24} color="black" className="px-4" />
                <TextInput className="flex-1" placeholder="Busque pelo que você precisa" />
            </View>
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
