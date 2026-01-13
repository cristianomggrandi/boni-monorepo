import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context"
import { cn } from "../util/styling"

export default function PageContainer({
    className,
    children,
    enableSafeSpace = false,
    ...props
}: SafeAreaViewProps & { enableSafeSpace?: boolean }) {
    return (
        <SafeAreaView
            edges={enableSafeSpace ? ["top"] : []}
            className={cn("flex-1 flex-col bg-background px-2 gap-2", className)}
            {...props}
        >
            {children}
        </SafeAreaView>
    )
}
