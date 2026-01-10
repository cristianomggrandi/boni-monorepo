import { cn } from "@/src/util/styling"
import { View, ViewProps } from "react-native"

export default function StyledIcon({ className, children, ...props }: ViewProps) {
    return (
        <View
            className={cn(
                "h-12 w-12 bg-white elevation p-2 items-center justify-center rounded-full",
                className
            )}
        >
            {children}
        </View>
    )
}
