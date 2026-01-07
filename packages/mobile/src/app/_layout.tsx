import { NotoSans_400Regular } from "@expo-google-fonts/noto-sans"
import {
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    useFonts,
} from "@expo-google-fonts/plus-jakarta-sans"
import Feather from "@expo/vector-icons/Feather"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Tabs } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "../../global.css"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded, error] = useFonts({
        PlusJakarta: PlusJakartaSans_400Regular,
        "Jakarta-SemiBold": PlusJakartaSans_600SemiBold,
        "PlusJakarta-Bold": PlusJakartaSans_700Bold,
        NotoSans: NotoSans_400Regular,
    })

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync()
        }
    }, [loaded, error])

    if (!loaded && !error) {
        return null
    }

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
