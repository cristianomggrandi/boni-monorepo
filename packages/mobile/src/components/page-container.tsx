import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context"
import { cn } from "../util/styling"

export default function PageContainer({
    className,
    children,
    enableSafeSpace = false,
    scrollEnabled = true,
    ...props
}: SafeAreaViewProps & {
    enableSafeSpace?: boolean
    scrollEnabled?: boolean
}) {
    return (
        <SafeAreaView
            edges={props.edges ?? (enableSafeSpace ? ["top", "left", "right", "bottom"] : ["left", "right", "bottom"])}
            className={cn("flex-1 flex-col bg-background px-2 gap-2", className)}
            {...props}
        >
            {children}
        </SafeAreaView>
    )
}
