import { cn } from "@/src/util/styling"
import { TextProps } from "react-native"
import Animated from "react-native-reanimated"

export default function StyledText({ className, children, ...props }: TextProps) {
    return (
        <Animated.Text className={cn("font-jakarta", className)} {...props}>
            {children}
        </Animated.Text>
    )
}
