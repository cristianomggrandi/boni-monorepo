import { SafeAreaView } from "react-native-safe-area-context"

export default function PageContainer(props: { children?: React.ReactNode }) {
    return (
        <SafeAreaView edges={["top"]} className="flex-1 flex-col bg-[#FCF8F8]">
            {props.children}
        </SafeAreaView>
    )
}
