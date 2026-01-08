import { cn } from "@/src/util/styling"
import { Text, TextProps } from "react-native"

export default function StyledText({ className, ...props }: TextProps) {
    return <Text className={cn("font-jakarta", className)}>{props.children}</Text>
}
