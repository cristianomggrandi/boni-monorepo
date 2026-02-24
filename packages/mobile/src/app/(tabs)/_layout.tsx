import { TabPageHeader } from "@/src/components/page-header"
import StyledText from "@/src/components/styled/styled-text"
import Feather from "@expo/vector-icons/Feather"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Tabs } from "expo-router"
import { View } from "react-native"

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                header: TabPageHeader,
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
                    // tabBarShowLabel: false,
                    tabBarLabel: ({ focused }) =>
                        focused ? <StyledText className="text-xs">Início</StyledText> : null,
                    headerShown: false,
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
                    // tabBarShowLabel: false,
                    tabBarLabel: ({ focused }) =>
                        focused ? <StyledText className="text-xs">Busca</StyledText> : null,
                    title: "Busca",
                    headerShown: false,
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
                    // tabBarShowLabel: false,
                    title: "Perfil",
                }}
            />
        </Tabs>
    )
}
