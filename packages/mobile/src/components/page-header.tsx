import Feather from "@expo/vector-icons/Feather"
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import StyledIcon from "./styled/styled-icon"
import StyledText from "./styled/styled-text"

export default function PageHeader(props: BottomTabHeaderProps) {
    return (
        <SafeAreaView className="bg-background" edges={["top", "right", "left"]}>
            <View className="flex-row items-center my-4">
                <StyledIcon className="absolute left-4">
                    <Feather name="arrow-left" size={24} color="black" />
                </StyledIcon>
                <StyledText className="text-xl left-1/2 -translate-x-[50%] font-bold">
                    {props.options.title}
                </StyledText>
            </View>
        </SafeAreaView>
    )
}
