import { useRouter } from "expo-router"
import { Suspense } from "react"
import { Pressable, Text, View } from "react-native"
import NextAppointment from "../components/cards/next-appointment"
import PageContainer from "../components/page-container"
import SearchBar from "../components/search-bar"
import StyledText from "../components/styled/styled-text"
import useAuthStore from "../stores/auth-store"

export default function HomePage() {
    const router = useRouter()
    const user = useAuthStore(s => s.user)

    return (
        <PageContainer enableSafeSpace className="gap-2">
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
            <Pressable
                onPress={() => {
                    router.push({ pathname: `/search`, params: { autoFocus: "true" } })
                }}
                className="h-16 px-2"
            >
                <SearchBar editable={false} />
            </Pressable>
            <Suspense fallback={<Text>// TODO:</Text>}>
                <NextAppointment />
            </Suspense>
        </PageContainer>
    )
}
