import { Prisma } from "@boni/database/dist/generated/prisma/client"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Image } from "expo-image"
import { Text, View } from "react-native"

export default function BusinessCard({ business }: { business: Prisma.BusinessGetPayload<{}> }) {
    return (
        <View className="border-gray-200 rounded-2xl bg-white border-hairline p-4 justify-center gap-2 flex-row">
            <View>
                {business.image ? (
                    <Image
                        source={{ uri: business.image }}
                        className="aspect-square h-20 rounded-xl"
                    />
                ) : (
                    <View className="h-24 items-center justify-center bg-red-300 aspect-square">
                        <Text>Foto</Text>
                    </View>
                )}
            </View>
            <View className="flex-1 justify-between">
                <View className="flex-row gap-2">
                    <View className="flex-1">
                        <Text className="font-semibold">{business.name}</Text>
                        <Text className="text-sm text-nowrap">Categoria 1, categoria 2 · 2km</Text>
                    </View>
                    <View className="self-start flex-row items-center">
                        <FontAwesome name="star" size={10} color="#D2DB76" />
                        <Text className="font-semibold text-sm uppercase px-1">4.9</Text>
                    </View>
                </View>
                <View className="flex-row items-center gap-2 justify-self-end">
                    <Text className="text-sm font-semibold">$$</Text>
                    <Text className="text-sm font-semibold">·</Text>
                    <Text className="text-sm">ABERTO</Text>
                </View>
            </View>
        </View>
    )
}
