import { cn } from "@/src/util/styling"
import { Pressable, PressableProps } from "react-native"

export default function StyledButton({ className, children, ...props }: PressableProps) {
    return (
        <Pressable
            className={cn(
                "p-2 elevation bg-white text-gray-500 items-center justify-center rounded-xl border-gray-100",
                className
            )}
            {...props}
        >
            {children}
        </Pressable>
    )
}
