import { RouterBackButton, TabPageHeader } from "@/src/components/page-header"
import StyledIcon from "@/src/components/styled/styled-icon"
import StyledText from "@/src/components/styled/styled-text"
import Feather from "@expo/vector-icons/Feather"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Link, Tabs } from "expo-router"
import { View } from "react-native"

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                headerShadowVisible: false,
                header: TabPageHeader,
                headerLeft: RouterBackButton,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            className={`w-16 h-9 rounded-full items-center justify-center ${focused ? "bg-primary" : ""}`}
                        >
                            <FontAwesome6 name="house" size={22} color="black" />
                        </View>
                    ),
                    tabBarLabel: ({ focused }) =>
                        focused ? <StyledText className="text-xs">Início</StyledText> : null,
                    headerLeft: () => (
                        <Link href="/profile">
                            <StyledIcon>
                                <MaterialCommunityIcons
                                    name="face-woman-profile"
                                    size={24}
                                    color="black"
                                />
                            </StyledIcon>
                        </Link>
                    ),
                    title: "",
                    headerRight: () => (
                        <View className="flex-row gap-2">
                            <Link href="/(favorites)/businesses">
                                <StyledIcon>
                                    <MaterialCommunityIcons
                                        name="cards-heart"
                                        size={24}
                                        color="primary"
                                    />
                                </StyledIcon>
                            </Link>
                            <StyledIcon>
                                <MaterialCommunityIcons name="bell" size={24} color="black" />
                            </StyledIcon>
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            className={`w-16 h-9 rounded-full items-center justify-center ${focused ? "bg-primary" : ""}`}
                        >
                            <Feather name="search" size={24} color="black" />
                        </View>
                    ),
                    tabBarLabel: ({ focused }) =>
                        focused ? <StyledText className="text-xs">Busca</StyledText> : null,
                }}
            />
            <Tabs.Screen
                name="bookings"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            className={`w-16 h-9 rounded-full items-center justify-center ${focused ? "bg-primary" : ""}`}
                        >
                            <FontAwesome5 name="calendar-alt" size={20} color="black" />
                        </View>
                    ),
                    // tabBarShowLabel: false,
                    tabBarLabel: ({ focused }) =>
                        focused ? <StyledText className="text-xs">Agendamentos</StyledText> : null,
                    title: "Meus Agendamentos",
                    headerLeft: () => <RouterBackButton />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            className={`w-16 h-9 rounded-full items-center justify-center ${focused ? "bg-primary" : ""}`}
                        >
                            <MaterialCommunityIcons
                                name="face-woman-shimmer-outline"
                                size={24}
                                color="black"
                            />
                        </View>
                    ),
                    tabBarLabel: ({ focused }) =>
                        focused ? <StyledText className="text-xs">Perfil</StyledText> : null,
                    title: "Perfil",
                    headerLeft: () => <RouterBackButton />,
                }}
            />
        </Tabs>
    )
}
