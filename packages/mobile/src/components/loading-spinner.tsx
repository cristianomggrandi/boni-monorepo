import { ActivityIndicator, View } from "react-native"

export default function LoadingSpinner({ size = 80 }: { size?: number }) {
    return (
        <View className="flex-1 items-center justify-center bg-background">
            <ActivityIndicator size={size} className="fill-primary text-primary" />
        </View>
    )
}
