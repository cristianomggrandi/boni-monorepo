import useAuthStore from "@/src/stores/auth-store"
import Entypo from "@expo/vector-icons/Entypo"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import Fontisto from "@expo/vector-icons/Fontisto"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useRouter } from "expo-router"
import { Pressable, ScrollView, View } from "react-native"
import PageContainer from "../components/page-container"
import StyledButton from "../components/styled/styled-button"
import StyledText from "../components/styled/styled-text"

export default function ProfilePage() {
    const logout = useAuthStore(s => s.logout)
    const user = useAuthStore(s => s.user)
    const router = useRouter()

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
                            Conta e Segurança
                        </StyledText>
                        <View className="rounded-2xl bg-white elevation p-2 justify-center gap-3">
                            <Pressable onPress={() => router.push("/profile/personal-info")}>
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
                            </Pressable>
                            <Pressable onPress={() => router.push("/login-security")}>
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
                            </Pressable>
                            <Pressable onPress={() => router.push("/addresses")}>
                                <View className="flex-row items-center gap-4 p-2">
                                    <View className="w-14 h-14 rounded-full bg-primary items-center justify-center">
                                        <MaterialCommunityIcons
                                            name="map-marker"
                                            size={24}
                                            color="black"
                                        />
                                    </View>
                                    <StyledText className="font-semibold flex-1">
                                        Endereços
                                    </StyledText>
                                    <View className="w-14 h-14 items-center justify-center">
                                        <Entypo
                                            name="chevron-right"
                                            size={24}
                                            className="color-gray-300"
                                        />
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                    <View className="p-1">
                        <StyledText className="font-semibold text-gray-500 uppercase mb-2">
                            Atividades
                        </StyledText>
                        <View className="rounded-2xl bg-white elevation p-2 justify-center gap-3">
                            <Pressable onPress={() => router.push("/bookings")}>
                                <View className="flex-row items-center gap-4 p-2">
                                    <View className="w-14 h-14 rounded-full bg-primary items-center justify-center">
                                        <FontAwesome6
                                            name="clock-rotate-left"
                                            size={24}
                                            color="black"
                                        />
                                    </View>
                                    <StyledText className="font-semibold flex-1">
                                        Histórico
                                    </StyledText>
                                    <View className="w-14 h-14 items-center justify-center">
                                        <Entypo
                                            name="chevron-right"
                                            size={24}
                                            className="color-gray-300"
                                        />
                                    </View>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => router.push("/(favorites)/businesses")}>
                                <View className="flex-row items-center gap-4 p-2">
                                    <View className="w-14 h-14 rounded-full bg-primary items-center justify-center">
                                        <MaterialCommunityIcons
                                            name="cards-heart"
                                            size={24}
                                            color="primary"
                                        />
                                    </View>
                                    <StyledText className="font-semibold flex-1">
                                        Favoritos
                                    </StyledText>
                                    <View className="w-14 h-14 items-center justify-center">
                                        <Entypo
                                            name="chevron-right"
                                            size={24}
                                            className="color-gray-300"
                                        />
                                    </View>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => router.push("/notifications")}>
                                <View className="flex-row items-center gap-4 p-2">
                                    <View className="w-14 h-14 rounded-full bg-primary items-center justify-center">
                                        <MaterialCommunityIcons
                                            name="bell"
                                            size={24}
                                            color="black"
                                        />
                                    </View>
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
                            </Pressable>
                        </View>
                    </View>
                    <View className="p-1">
                        <StyledText className="font-semibold text-gray-500 uppercase mb-2">
                            Pagamentos
                        </StyledText>
                        <View className="rounded-2xl bg-white elevation p-2 justify-center gap-3">
                            <Pressable onPress={() => router.push("/cards")}>
                                <View className="flex-row items-center gap-4 p-2">
                                    <View className="w-14 h-14 rounded-full bg-primary items-center justify-center">
                                        <FontAwesome
                                            name="credit-card-alt"
                                            size={24}
                                            color="black"
                                        />
                                    </View>
                                    <StyledText className="font-semibold flex-1">
                                        Cartões
                                    </StyledText>
                                    <View className="w-14 h-14 items-center justify-center">
                                        <Entypo
                                            name="chevron-right"
                                            size={24}
                                            className="color-gray-300"
                                        />
                                    </View>
                                </View>
                            </Pressable>
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
