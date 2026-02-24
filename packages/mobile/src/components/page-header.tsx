import Feather from "@expo/vector-icons/Feather"
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs"
import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import { useRouter } from "expo-router"
import { ReactNode } from "react"
import { Pressable, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import StyledIcon from "./styled/styled-icon"
import StyledText from "./styled/styled-text"

export function RouterBackButton() {
    const router = useRouter()

    return (
        <Pressable onPress={router.back} className="absolute left-4">
            <StyledIcon>
                <Feather name="arrow-left" size={24} color="black" />
            </StyledIcon>
        </Pressable>
    )
}

export function TabPageHeader(props: BottomTabHeaderProps) {
    return (
        <SafeAreaView className="bg-background" edges={["top", "right", "left"]}>
            <View className="flex-row items-center my-4">
                <RouterBackButton />
                <StyledText className="text-xl left-1/2 -translate-x-[50%] font-jakarta-bold">
                    {props.options.title}
                </StyledText>
            </View>
        </SafeAreaView>
    )
}

// TODO: Padronizar tamanhos e posições de headers

export function StackPageHeader(props: NativeStackHeaderProps) {
    const HeaderTitle = props.options.headerTitle as (props: {
        children: string
        tintColor?: string | undefined
    }) => ReactNode

    return (
        <SafeAreaView className="bg-white" edges={["top", "right", "left"]}>
            <View className="flex-row items-center my-4">
                <RouterBackButton />
                <HeaderTitle>{props.options.title ?? "No title"}</HeaderTitle>
                {props.options.headerRight ? props.options.headerRight({}) : null}
            </View>
        </SafeAreaView>
    )
}

export function StackPageHeaderTitle(props: { children: string; tintColor?: string | undefined }) {
    return (
        <StyledText className="text-xl left-1/2 -translate-x-[50%] font-jakarta-bold">
            {props.children}
        </StyledText>
    )
}
