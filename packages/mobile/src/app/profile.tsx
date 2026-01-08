import { View } from "react-native"
import PageContainer from "../components/page-container"
import StyledButton from "../components/styled/styled-button"
import StyledText from "../components/styled/styled-text"
import StyledTextInput from "../components/styled/styled-text-input"

export default function Login() {
    return (
        <PageContainer>
            <View className="p-4 gap-2 items-center justify-center flex-1">
                <View className="p-2 rounded-2xl bg-white elevation-sm border-0 flex-row items-center justify-center">
                    <StyledTextInput placeholder="E-mail" />
                </View>
                <View className="p-2 rounded-2xl bg-white elevation-sm border-0 flex-row items-center justify-center">
                    <StyledTextInput placeholder="Senha" />
                </View>
                <StyledButton className="mt-2 bg-primary">
                    <StyledText className="">Login</StyledText>
                </StyledButton>
            </View>
        </PageContainer>
    )
}
