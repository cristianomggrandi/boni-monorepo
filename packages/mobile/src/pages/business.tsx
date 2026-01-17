import { Prisma } from "@boni/database/dist/generated/prisma/client"
import Feather from "@expo/vector-icons/Feather"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import api from "../api/boni-api"
import PageContainer from "../components/page-container"
import StyledIcon from "../components/styled/styled-icon"
import StyledText from "../components/styled/styled-text"

export default function BusinessPage() {
    const { id } = useLocalSearchParams()

    const [business, setBusiness] = useState<
        Prisma.BusinessGetPayload<{
            include: { address: true; categories: true; services: true }
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
        <PageContainer enableSafeSpace className="gap-2">
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
                <StyledText>{JSON.stringify(business)}</StyledText>
                <View>
                    <StyledText>Serviços</StyledText>
                </View>
            </ScrollView>
        </PageContainer>
    )
}
