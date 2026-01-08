import { cn } from "@/src/util/styling"
import { TextInput, TextInputProps } from "react-native"

export default function StyledTextInput({ className, ...props }: TextInputProps) {
    return (
        <TextInput className={cn("flex-1 font-jakarta", className)} {...props}>
            {props.children}
        </TextInput>
    )
}
