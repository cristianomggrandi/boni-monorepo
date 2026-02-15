import useAuthStore from "@/src/stores/auth-store"
import Entypo from "@expo/vector-icons/Entypo"
import Fontisto from "@expo/vector-icons/Fontisto"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { ScrollView, View } from "react-native"
import PageContainer from "../components/page-container"
import StyledButton from "../components/styled/styled-button"
import StyledText from "../components/styled/styled-text"

export default function ProfilePage() {
    const logout = useAuthStore(s => s.logout)
    const user = useAuthStore(s => s.user)

    if (!user) return null

    return (
        <PageContainer className="">
            <ScrollView>
                <View className="justify-center items-center mb-4">
                    <View className="h-32 w-32 rounded-full bg-primary items-center justify-center">
                        <MaterialCommunityIcons name="face-woman-profile" size={64} color="black" />
                    </View>
                    <StyledText className="font-semibold text-2xl">{user.name}</StyledText>
                    <StyledText className="text-gray-500">Belo Horizonte - MG</StyledText>
                </View>
                <View className="gap-6 p-2">
                    <View className="p-1">
                        <StyledText className="font-semibold text-gray-500 uppercase mb-2">
                            Configurações da Conta
                        </StyledText>
                        <View className="rounded-2xl bg-white elevation p-2 justify-center gap-3">
                            <View className="flex-row items-center gap-4 p-2">
                                <View className="w-14 h-14 rounded-full bg-primary items-center justify-center">
                                    <MaterialCommunityIcons
                                        name="face-woman-profile"
                                        size={24}
                                        color="black"
                                    />
                                </View>
                                <StyledText className="font-semibold flex-1">
                                    Informações pessoais
                                </StyledText>
                                <View className="w-14 h-14 items-center justify-center">
                                    <Entypo
                                        name="chevron-right"
                                        size={24}
                                        className="color-gray-300"
                                    />
                                </View>
                            </View>
                            <View className="flex-row items-center gap-4 p-2">
                                <View className="w-14 h-14 rounded-full bg-primary items-center justify-center">
                                    <Fontisto name="locked" size={24} color="black" />
                                </View>
                                <StyledText className="font-semibold flex-1">
                                    Login e Segurança
                                </StyledText>
                                <View className="w-14 h-14 items-center justify-center">
                                    <Entypo
                                        name="chevron-right"
                                        size={24}
                                        className="color-gray-300"
                                    />
                                </View>
                            </View>
                            <View className="flex-row items-center gap-4 p-2">
                                <View className="w-14 h-14 rounded-full bg-primary items-center justify-center">
                                    <MaterialCommunityIcons
                                        name="map-marker"
                                        size={24}
                                        color="black"
                                    />
                                </View>
                                <StyledText className="font-semibold flex-1">Endereços</StyledText>
                                <View className="w-14 h-14 items-center justify-center">
                                    <Entypo
                                        name="chevron-right"
                                        size={24}
                                        className="color-gray-300"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="p-1">
                        <StyledText className="font-semibold text-gray-500 uppercase mb-2">
                            {/* TODO: Mudar nome */}
                            Configurações da Conta 2
                        </StyledText>
                        <View className="rounded-2xl bg-white elevation p-2 justify-center gap-3">
                            <View className="flex-row items-center gap-4 p-2">
                                <View className="w-14 h-14 rounded-full bg-primary"></View>
                                <StyledText className="font-semibold flex-1">Histórico</StyledText>
                                <View className="w-14 h-14 items-center justify-center">
                                    <Entypo
                                        name="chevron-right"
                                        size={24}
                                        className="color-gray-300"
                                    />
                                </View>
                            </View>
                            <View className="flex-row items-center gap-4 p-2">
                                <View className="w-14 h-14 rounded-full bg-primary"></View>
                                <StyledText className="font-semibold flex-1">Favoritos</StyledText>
                                <View className="w-14 h-14 items-center justify-center">
                                    <Entypo
                                        name="chevron-right"
                                        size={24}
                                        className="color-gray-300"
                                    />
                                </View>
                            </View>
                            <View className="flex-row items-center gap-4 p-2">
                                <View className="w-14 h-14 rounded-full bg-primary"></View>
                                <StyledText className="font-semibold flex-1">
                                    Notificações
                                </StyledText>
                                <View className="w-14 h-14 items-center justify-center">
                                    <Entypo
                                        name="chevron-right"
                                        size={24}
                                        className="color-gray-300"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="p-1">
                        <StyledText className="font-semibold text-gray-500 uppercase mb-2">
                            {/* TODO: Mudar nome */}
                            Configurações da Conta 3
                        </StyledText>
                        <View className="rounded-2xl bg-white elevation p-2 justify-center gap-3">
                            <View className="flex-row items-center gap-4 p-2">
                                <View className="w-14 h-14 rounded-full bg-primary"></View>
                                <StyledText className="font-semibold flex-1">Cartões</StyledText>
                                <View className="w-14 h-14 items-center justify-center">
                                    <Entypo
                                        name="chevron-right"
                                        size={24}
                                        className="color-gray-300"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="p-4 gap-2 items-center justify-center flex-1">
                    <StyledButton onPress={logout} className="mt-2 bg-primary">
                        <StyledText className="">Logout</StyledText>
                    </StyledButton>
                </View>
            </ScrollView>
        </PageContainer>
    )
}
