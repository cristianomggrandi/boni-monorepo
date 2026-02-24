import { NotoSans_400Regular } from "@expo-google-fonts/noto-sans"
import {
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    useFonts,
} from "@expo-google-fonts/plus-jakarta-sans"
import Entypo from "@expo/vector-icons/Entypo"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Image } from "expo-image"
import { Stack, useRouter, useSegments } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { cssInterop } from "nativewind"
import { useEffect } from "react"
import "../../global.css"
import { StackPageHeader, StackPageHeaderTitle } from "../components/page-header"
import useAuthStore from "../stores/auth-store"

cssInterop(Image, { className: "style" })

cssInterop(MaterialCommunityIcons, {
    className: {
        target: "style",
        nativeStyleToProp: {
            color: "color",
        },
    },
})

cssInterop(FontAwesome, {
    className: {
        target: "style",
        nativeStyleToProp: {
            color: "color",
        },
    },
})

cssInterop(Entypo, {
    className: {
        target: "style",
        nativeStyleToProp: {
            color: "color",
        },
    },
})

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const isLoggedIn = useAuthStore(s => s.isLoggedIn)
    const initializeAuthStore = useAuthStore(s => s.initialize)
    const segments = useSegments()
    const router = useRouter()

    const [loaded, error] = useFonts({
        PlusJakarta: PlusJakartaSans_400Regular,
        "Jakarta-SemiBold": PlusJakartaSans_600SemiBold,
        "PlusJakarta-Bold": PlusJakartaSans_700Bold,
        NotoSans: NotoSans_400Regular,
    })

    useEffect(() => {
        initializeAuthStore()
    }, [])

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync()
        }
    }, [loaded, error])

    useEffect(() => {
        const inTabsGroup = segments[0] === "(tabs)"

        if (!isLoggedIn && inTabsGroup) {
            router.replace("/(auth)/login")
        } else if (isLoggedIn && segments[0] === "(auth)") {
            router.replace("/(tabs)")
        }
    }, [isLoggedIn, segments])

    if (!loaded && !error) return null

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: StackPageHeader,
                headerTitle: props => <StackPageHeaderTitle {...props} />,
            }}
        >
            <Stack.Screen name="(auth)" options={{ animation: "fade", headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ animation: "fade", headerShown: false }} />
            <Stack.Screen
                name="business/[id]"
                options={{ headerShown: false, animation: "fade" }}
            />
            <Stack.Screen name="service/[id]" options={{ headerShown: false, animation: "fade" }} />
            <Stack.Screen
                name="(favorites)"
                options={{
                    animation: "fade",
                    headerShown: true,
                    title: "Favoritos",
                }}
            />
        </Stack>
    )
}
