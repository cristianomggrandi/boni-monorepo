import Foundation from "@expo/vector-icons/Foundation"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Suspense } from "react"
import { Text, View } from "react-native"
import NextAppointment from "../components/cards/next-appointment"
import PageContainer from "../components/page-container"
import SearchBar from "../components/search-bar"
import StyledIcon from "../components/styled/styled-icon"
import StyledText from "../components/styled/styled-text"

export default function HomePage() {
    return (
        <PageContainer className="gap-2">
            <View className="p-2 flex-row justify-between">
                <View className="flex-row">
                    <StyledIcon>
                        <MaterialCommunityIcons name="face-woman-profile" size={24} color="black" />
                    </StyledIcon>
                </View>
                <View className="flex-row gap-2">
                    <StyledIcon>
                        <Foundation name="heart" size={30} color="black" />
                    </StyledIcon>
                    <StyledIcon>
                        <MaterialCommunityIcons name="bell" size={24} color="black" />
                    </StyledIcon>
                </View>
            </View>
            <View className="p-4 mb-4">
                <View>
                    <StyledText className="uppercase text-sm font-semibold">Bom dia,</StyledText>
                    <StyledText className="font-bold text-4xl">Nina</StyledText>
                </View>
            </View>
            <SearchBar />
            <Suspense fallback={<Text>Teste</Text>}>
                <NextAppointment />
            </Suspense>
        </PageContainer>
    )
}
