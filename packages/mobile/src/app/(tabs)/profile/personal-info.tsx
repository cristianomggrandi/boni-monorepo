import { useState } from "react"
import { Alert, ScrollView, View } from "react-native"
import PageContainer from "../../../components/page-container"
import StyledButton from "../../../components/styled/styled-button"
import StyledText from "../../../components/styled/styled-text"
import StyledTextInput from "../../../components/styled/styled-text-input"

export default function PersonalInfoPage() {
    const [name, setName] = useState("João Silva")
    const [email, setEmail] = useState("joao@example.com")
    const [phone, setPhone] = useState("(31) 99999-9999")

    const handleSave = () => {
        Alert.alert("Sucesso", "Informações pessoais atualizadas com sucesso!")
    }

    return (
        <PageContainer className="">
            <ScrollView className="p-4">
                <View className="gap-4">
                    <View>
                        <StyledText className="font-medium font-semibold mb-2">Nome</StyledText>
                        <View className="p-2 rounded-2xl bg-white elevation border-0">
                            <StyledTextInput
                                value={name}
                                onChangeText={setName}
                                placeholder="Digite seu nome"
                            />
                        </View>
                    </View>
                    <View>
                        <StyledText className="font-medium font-semibold mb-2">Email</StyledText>
                        <View className="p-2 rounded-2xl bg-white elevation border-0">
                            <StyledTextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Digite seu email"
                                keyboardType="email-address"
                            />
                        </View>
                    </View>
                    <View>
                        <StyledText className="font-medium font-semibold mb-2">Telefone</StyledText>
                        <View className="p-2 rounded-2xl bg-white elevation border-0">
                            <StyledTextInput
                                value={phone}
                                onChangeText={setPhone}
                                placeholder="Digite seu telefone"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>
                    <StyledButton onPress={handleSave} className="mt-6 bg-primary">
                        <StyledText className="text-white">Salvar</StyledText>
                    </StyledButton>
                </View>
            </ScrollView>
        </PageContainer>
    )
}
