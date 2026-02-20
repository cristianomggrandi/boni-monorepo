import { Prisma } from "@boni/database/dist/generated/prisma/client"
import Feather from "@expo/vector-icons/Feather"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Image } from "expo-image"
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Pressable, ScrollView, View } from "react-native"
import api from "../api/boni-api"
import FavoriteIcon from "../components/favorite-icon"
import PageContainer from "../components/page-container"
import StyledIcon from "../components/styled/styled-icon"
import StyledText from "../components/styled/styled-text"
import useFavoritesStore from "../stores/favorites-store"
import { formatDuration, formatMoney } from "../util/formatting"

type ServiceType = Prisma.ServiceGetPayload<{
    include: { serviceGroup: { include: { business: true } } }
}>

export default function ServicePage() {
    const { id } = useLocalSearchParams()

    const [service, setService] = useState<ServiceType>()

    const favoriteServices = useFavoritesStore(state => state.getFavoriteServices())
    const addFavoriteService = useFavoritesStore(state => state.addFavoriteService)
    const removeFavoriteService = useFavoritesStore(state => state.removeFavoriteService)

    const [isFavorite, setIsFavorite] = useState(favoriteServices.includes(Number(id)))

    const handleFavoriteToggle = async () => {
        const newIsFavorite = !isFavorite
        setIsFavorite(newIsFavorite)

        try {
            if (newIsFavorite) {
                await api.post("/favorite-services/" + id)
                addFavoriteService(+id)
            } else {
                await api.delete("/favorite-services/" + id)
                removeFavoriteService(+id)
            }
        } catch (error) {
            console.error("Failed to toggle favorite:", error)
            setIsFavorite(!newIsFavorite)
        }
    }

    useEffect(() => {
        setIsFavorite(favoriteServices.includes(Number(id)))
    }, [favoriteServices])

    useEffect(() => {
        api.get("service/" + id)
            .then(res => {
                console.log("BUSINESS:", res.data)
                setService(res.data)
            })
            .catch(error => console.error(error))
    }, [])

    if (!service) return null

    const business = service.serviceGroup.business

    return (
        <PageContainer edges={["right", "left", "bottom", "top"]} className="p-0 h-full">
            <View className="w-full flex-row items-center justify-between px-4">
                <StyledIcon>
                    <StyledIcon>
                        <Feather name="arrow-left" size={24} color="black" />
                    </StyledIcon>
                </StyledIcon>
                <StyledText className="font-jakarta-bold text-2xl">{service.name}</StyledText>
                <FavoriteIcon isFavorite={isFavorite} handleFavoriteToggle={handleFavoriteToggle} />
            </View>
            <View className="relative flex-1">
                <View className="absolute">
                    <Image
                        className="w-full aspect-square bg-red-200"
                        source={
                            // business.image ??
                            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/e4/3b/b5/view-from-the-top.jpg?w=500&h=500&s=1"
                        }
                    />
                </View>
                <ScrollView className="">
                    <View className="w-full aspect-square bg-transparent -mb-6" />
                    <View className="px-4 gap-4 bg-background pt-8 rounded-t-4xl">
                        <View className="flex-1 gap-4">
                            <View className="flex-row items-center">
                                <View className="flex-1">
                                    <StyledText className="text-3xl font-jakarta-bold">
                                        {service.name}
                                    </StyledText>
                                    <StyledText className="font-semibold text-gray-500">
                                        {business.name}
                                    </StyledText>
                                </View>
                                <View>
                                    <View className="p-2 elevation-sm bg-white rounded flex-row  gap-2">
                                        <StyledText className="font-semibold text-lg">
                                            <FontAwesome
                                                name="star"
                                                size={16}
                                                className="color-secondary"
                                            />
                                            {"   "}
                                            {/* TODO: Página de avaliações */}
                                            4.9
                                        </StyledText>
                                        <StyledText className="text-sm text-gray-500 mt-1.5">
                                            (120)
                                        </StyledText>
                                    </View>
                                </View>
                            </View>
                            <View className="flex-row justify-between">
                                {service.price ? (
                                    <View className="py-2 px-4 elevation-sm bg-secondary rounded-full flex-row items-center">
                                        <StyledText className="font-semibold">
                                            <FontAwesome6
                                                name="money-bills"
                                                size={14}
                                                color="black"
                                            />
                                            {"   "}
                                            {formatMoney(service.price)}
                                        </StyledText>
                                    </View>
                                ) : null}
                                {service.duration ? (
                                    <View className="py-2 px-4 elevation-sm bg-primary rounded-full flex-row items-center">
                                        <StyledText className="font-semibold">
                                            <MaterialCommunityIcons
                                                name="clock"
                                                size={14}
                                                className="color-gray-800"
                                            />
                                            {"  "}
                                            {formatDuration(service.duration)}
                                        </StyledText>
                                    </View>
                                ) : null}
                            </View>
                            {/* TODO: Padronizar espaçamento com tela de business */}
                            <View className="border-b-hairline border-gray-300 mt-4 bg-background" />
                            <View>
                                <StyledText className="font-semibold text-lg">Descrição</StyledText>
                                <StyledText className="text-lg">{service.description}</StyledText>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View className="px-4 py-4 flex-row gap-2 border-t-hairline border-gray-300">
                    <Pressable className="flex-1 py-4 bg-secondary w-1/2 rounded-full text-lg items-center">
                        <StyledText className="font-jakarta-bold">Adicionar ao Carrinho</StyledText>
                    </Pressable>
                    <Pressable className="flex-1 py-4 bg-primary w-1/2 rounded-full text-lg items-center">
                        <StyledText className="font-jakarta-bold">Agendar Agora</StyledText>
                    </Pressable>
                </View>
            </View>
        </PageContainer>
    )
}
