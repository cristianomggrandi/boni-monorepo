import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context"
import { cn } from "../util/styling"

export default function PageContainer({ className, children, ...props }: SafeAreaViewProps) {
    return (
        <SafeAreaView
            edges={["top"]}
            className={cn("flex-1 flex-col bg-[#FCF8F8] px-2 gap-2", className)}
            {...props}
        >
            {children}
        </SafeAreaView>
    )
}
