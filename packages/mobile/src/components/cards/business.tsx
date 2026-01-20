import { Prisma } from "@boni/database/dist/generated/prisma/client"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { Pressable, View } from "react-native"
import StyledText from "../styled/styled-text"

export default function BusinessCard({ business }: { business: Prisma.BusinessGetPayload<{}> }) {
    const router = useRouter()

    return (
        <Pressable
            onPress={() => router.push({ pathname: "/business/[id]", params: { id: business.id } })}
        >
            <View className="rounded-2xl bg-white border-0 p-4 justify-center gap-2 flex-row elevation">
                <View>
                    {business.image ? (
                        <Image
                            source={{ uri: business.image }}
                            className="aspect-square h-20 rounded-xl"
                        />
                    ) : (
                        <View className="h-24 items-center justify-center bg-red-300 aspect-square">
                            <StyledText>Foto</StyledText>
                        </View>
                    )}
                </View>
                <View className="flex-1 justify-between">
                    <View className="flex-row gap-2">
                        <View className="flex-1">
                            <StyledText className="font-semibold">{business.name}</StyledText>
                            <StyledText className="text-sm text-nowrap">
                                Categoria 1, categoria 2 · 2km
                            </StyledText>
                        </View>
                        <View className="self-start flex-row items-center">
                            <FontAwesome name="star" size={10} className="color-secondary" />
                            <StyledText className="font-semibold text-sm uppercase px-1">
                                4.9
                            </StyledText>
                        </View>
                    </View>
                    <View className="flex-row items-center gap-2 justify-self-end">
                        <StyledText className="text-sm font-semibold">$$</StyledText>
                        <StyledText className="text-sm font-semibold">·</StyledText>
                        <StyledText className="text-sm">ABERTO</StyledText>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}
