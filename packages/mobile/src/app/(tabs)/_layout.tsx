import Feather from "@expo/vector-icons/Feather"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Tabs } from "expo-router"

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <FontAwesome6 name="house" size={22} color="black" />
                    ),
                    tabBarShowLabel: false,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Feather name="search" size={24} color="black" />
                    ),
                    tabBarShowLabel: false,
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Feather name="map" size={24} color="black" />
                    ),
                    tabBarShowLabel: false,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons
                            name="face-woman-shimmer-outline"
                            size={24}
                            color="black"
                        />
                    ),
                    tabBarShowLabel: false,
                }}
            />
        </Tabs>
    )
}
