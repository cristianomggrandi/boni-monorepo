import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import PageContainer from "../components/page-container"
import StyledButton from "../components/styled/styled-button"
import StyledText from "../components/styled/styled-text"
import StyledTextInput from "../components/styled/styled-text-input"
import useAuthStore from "../stores/auth-store"

export default function LoginPage() {
    const login = useAuthStore(s => s.login)

    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // TODO: Criar aviso de erro em login incorreto

    return (
        <PageContainer>
            <View className="p-4 gap-2 items-center justify-center flex-1">
                <View className="h-16 items-center justify-center mb-6">
                    <StyledText className="text-2xl">Seja bem-vinda à Boni</StyledText>
                </View>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View className="p-2 rounded-2xl bg-white elevation border-0 flex-row items-center justify-center">
                            <StyledTextInput
                                placeholder="E-mail"
                                textContentType="emailAddress"
                                autoCapitalize="none"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        </View>
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View className="p-2 rounded-2xl bg-white elevation border-0 flex-row items-center justify-center">
                            <StyledTextInput
                                placeholder="Senha"
                                textContentType="password"
                                secureTextEntry
                                autoCapitalize="none"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        </View>
                    )}
                />
                <StyledButton className="mt-4 p-4 w-full bg-primary" onPress={handleSubmit(login)}>
                    <StyledText className="">Login</StyledText>
                </StyledButton>
            </View>
        </PageContainer>
    )
}
