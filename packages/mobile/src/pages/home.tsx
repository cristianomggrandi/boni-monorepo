import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Link, useRouter } from "expo-router"
import { Suspense } from "react"
import { Pressable, Text, View } from "react-native"
import NextAppointment from "../components/cards/next-appointment"
import PageContainer from "../components/page-container"
import SearchBar from "../components/search-bar"
import StyledIcon from "../components/styled/styled-icon"
import StyledText from "../components/styled/styled-text"
import useAuthStore from "../stores/auth-store"

export default function HomePage() {
    const router = useRouter()
    const user = useAuthStore(s => s.user)

    return (
        <PageContainer enableSafeSpace className="gap-2">
            <View className="p-2 flex-row justify-between">
                <View className="flex-row">
                    <Link href="/profile">
                        <StyledIcon>
                            <MaterialCommunityIcons
                                name="face-woman-profile"
                                size={24}
                                color="black"
                            />
                        </StyledIcon>
                    </Link>
                </View>
                <View className="flex-row gap-2">
                    <StyledIcon>
                        {/* <Foundation name="heart" size={30} color="black" /> */}
                        {/* TODO: Cor primária ao invés de preto? */}
                        <MaterialCommunityIcons name="cards-heart" size={24} color="primary" />
                    </StyledIcon>
                    <StyledIcon>
                        <MaterialCommunityIcons name="bell" size={24} color="black" />
                    </StyledIcon>
                </View>
            </View>
            <View className="p-4 mb-4">
                <View>
                    <StyledText className="uppercase text-sm font-semibold">
                        Bom dia{user ? "," : ""}
                    </StyledText>
                    {user ? (
                        <StyledText className="font-jakarta-bold text-4xl">
                            {user.name.split(" ")[0]}
                        </StyledText>
                    ) : null}
                </View>
            </View>
            <Pressable onPress={() => router.push(`/search`)} className="h-16 px-2">
                <SearchBar onChangeText={query => router.push(`/search?search=${query}`)} />
            </Pressable>
            <Suspense fallback={<Text>// TODO:</Text>}>
                <NextAppointment />
            </Suspense>
        </PageContainer>
    )
}
