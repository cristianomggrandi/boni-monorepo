import { Prisma } from "@boni/database/dist/generated/prisma/client"
import Feather from "@expo/vector-icons/Feather"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Image } from "expo-image"
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Pressable, ScrollView, View } from "react-native"
import api from "../api/boni-api"
import PageContainer from "../components/page-container"
import StyledIcon from "../components/styled/styled-icon"
import StyledText from "../components/styled/styled-text"
import { formatDuration, formatMoney } from "../util/formatting"

type Business = Prisma.BusinessGetPayload<{
    include: {
        address: true
        categories: true
        serviceGroups: { include: { services: true } }
    }
}>

type ServiceType = Business["serviceGroups"][0]["services"][0]

function ServiceCard({ service }: { service: ServiceType }) {
    return (
        <Pressable className="flex-row elevation bg-white rounded-xl p-2 gap-2">
            <View className="h-32 w-32 m-1 rounded">
                <Image
                    style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 8,
                    }}
                    className="rounded"
                    source={
                        // TODO: Remover fallback
                        service.imageUrl ??
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/e4/3b/b5/view-from-the-top.jpg?w=500&h=500&s=1"
                    }
                />
            </View>
            <View className="flex-1 justify-between">
                <View className="">
                    <StyledText className="font-semibold text-lg">{service.name}</StyledText>
                    <StyledText className="text-sm line-clamp-3">{service.description}</StyledText>
                </View>
                <View className="flex-row justify-between">
                    <View>
                        {service.duration ? (
                            <View className="flex-row items-center px-2 gap-1 opacity-65 bg-gray-200 rounded border-gray-300 border-hairlin">
                                {/* // TODO: Com ou sem ícone */}
                                <MaterialCommunityIcons
                                    name="clock"
                                    size={14}
                                    className="color-gray-800"
                                />
                                <StyledText className="leading-4 py-1">
                                    {formatDuration(service.duration)}
                                </StyledText>
                            </View>
                        ) : null}
                    </View>
                    <View>
                        {service.price ? (
                            <View className="bg-secondary rounded-full px-2 py-1">
                                <StyledText className="font-semibold items-center justify-center leading-4">
                                    {formatMoney(service.price)}
                                </StyledText>
                            </View>
                        ) : null}
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default function BusinessPage() {
    const { id } = useLocalSearchParams()

    const [business, setBusiness] = useState<
        Prisma.BusinessGetPayload<{
            include: {
                address: true
                categories: true
                serviceGroups: { include: { services: true } }
            }
        }>
    >()

    useEffect(() => {
        api.get("business/" + id)
            .then(res => {
                console.log("BUSINESS:", res.data)
                setBusiness(res.data)
            })
            .catch(error => console.error(error))
    }, [])

    // TODO:
    if (!business) return null

    return (
        <PageContainer enableSafeSpace className="gap-2 px-4">
            <View className="w-full flex-row items-center justify-between px-2">
                <StyledIcon>
                    <StyledIcon>
                        <Feather name="arrow-left" size={24} color="black" />
                    </StyledIcon>
                </StyledIcon>
                <StyledText className="font-bold text-2xl">{business.name}</StyledText>
                <StyledIcon>
                    <MaterialCommunityIcons name="cards-heart" size={24} color="black" />
                    {/* TODO: Checar se favoritou ou não */}
                    {/* <MaterialCommunityIcons name="cards-heart-outline" size={24} color="black" /> */}
                </StyledIcon>
            </View>
            <ScrollView>
                <View className="gap-8">
                    {business.serviceGroups.map(group => (
                        <View key={"group-" + group.id} className="gap-4">
                            <StyledText className="font-bold text-xl" key={group.id}>
                                {group.name}
                            </StyledText>
                            {group.services.map(service => (
                                <ServiceCard service={service} key={"service-" + service.id} />
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </PageContainer>
    )
}
