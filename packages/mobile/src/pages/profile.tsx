import useAuthStore from "@/src/stores/auth-store"
import { View } from "react-native"
import PageContainer from "../components/page-container"
import StyledButton from "../components/styled/styled-button"
import StyledText from "../components/styled/styled-text"

export default function ProfilePage() {
    const logout = useAuthStore(s => s.logout)

    return (
        <PageContainer>
            <View className="p-4 gap-2 items-center justify-center flex-1">
                <StyledButton onPress={logout} className="mt-2 bg-primary">
                    <StyledText className="">Logout</StyledText>
                </StyledButton>
            </View>
        </PageContainer>
    )
}
