import Feather from "@expo/vector-icons/Feather"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Tabs } from "expo-router"
import { View } from "react-native"

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View
                            className={`w-16 h-10 rounded-full items-center justify-center ${focused ? "bg-primary" : ""}`}
                        >
                            <FontAwesome6 name="house" size={22} color="black" />
                        </View>
                    ),
                    tabBarShowLabel: false,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View
                            className={`w-16 h-10 rounded-full items-center justify-center ${focused ? "bg-primary" : ""}`}
                        >
                            <Feather name="search" size={24} color="black" />
                        </View>
                    ),
                    tabBarShowLabel: false,
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View
                            className={`w-16 h-10 rounded-full items-center justify-center ${focused ? "bg-primary" : ""}`}
                        >
                            <Feather name="map" size={24} color="black" />
                        </View>
                    ),
                    tabBarShowLabel: false,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View
                            className={`w-16 h-10 rounded-full items-center justify-center ${focused ? "bg-primary" : ""}`}
                        >
                            <MaterialCommunityIcons
                                name="face-woman-shimmer-outline"
                                size={24}
                                color="black"
                            />
                        </View>
                    ),
                    tabBarShowLabel: false,
                }}
            />
        </Tabs>
    )
}
