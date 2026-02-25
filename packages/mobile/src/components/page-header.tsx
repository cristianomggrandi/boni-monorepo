import Feather from "@expo/vector-icons/Feather"
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs"
import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import { useRouter } from "expo-router"
import { Pressable, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import StyledIcon from "./styled/styled-icon"
import StyledText from "./styled/styled-text"

export function RouterBackButton() {
    const router = useRouter()

    return (
        <Pressable onPress={() => router.back()}>
            <StyledIcon>
                <Feather name="arrow-left" size={24} color="black" />
            </StyledIcon>
        </Pressable>
    )
}

export function TabPageHeader(props: BottomTabHeaderProps) {
    return (
        <SafeAreaView className="h-24 bg-background" edges={["top", "right", "left"]}>
            <View className="flex-row items-center justify-between relative">
                {props.options.headerLeft ? (
                    <View className="ml-5 z-10">{props.options.headerLeft({})}</View>
                ) : null}
                {props.options.headerRight ? (
                    <View className="mr-5 z-10">
                        {props.options.headerRight({ canGoBack: true })}
                    </View>
                ) : null}
                <View className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center pointer-events-none">
                    {props.options.headerTitle ? (
                        typeof props.options.headerTitle === "string" ? (
                            <StyledText className="text-center">
                                {props.options.headerTitle}
                            </StyledText>
                        ) : (
                            props.options.headerTitle({
                                children: props.options.title ?? "",
                            })
                        )
                    ) : (
                        <StyledText className="text-center text-xl font-jakarta-bold">
                            {props.options.title ?? ""}
                        </StyledText>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

export function StackPageHeader(props: NativeStackHeaderProps) {
    return (
        <SafeAreaView className="h-24" edges={["top", "right", "left"]}>
            <View className="flex-row items-center">
                {props.options.headerLeft ? (
                    <View className="ml-5">{props.options.headerLeft({})}</View>
                ) : null}
                {props.options.headerTitle ? (
                    <View className="flex-1">
                        {typeof props.options.headerTitle === "string" ? (
                            <StyledText>{props.options.headerTitle}</StyledText>
                        ) : (
                            props.options.headerTitle({
                                children: props.options.title ?? "",
                            })
                        )}
                    </View>
                ) : (
                    <View className="flex-1"></View>
                )}
                {props.options.headerRight ? (
                    <View className="mr-5">{props.options.headerRight({ canGoBack: true })}</View>
                ) : null}
            </View>
        </SafeAreaView>
    )
}
