import { Text } from "react-native"

export default function StyledText(props: { children: React.ReactNode; className?: string }) {
    return <Text className={"font-jakarta " + props.className}>{props.children}</Text>
}
