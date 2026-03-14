import { ScrollView, View } from "react-native"
import StyledSkeleton from "../styled/styled-skeleton"

export default function SkeletonCardList() {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pt-2 pb-4 px-2 gap-2"
        >
            <View className="gap-4 mb-2">
                <View className="flex-row items-center justify-between">
                    <StyledSkeleton height={40} width={"80%"} />
                    <StyledSkeleton height={40} width={40} radius={"round"} />
                </View>
            </View>
            <StyledSkeleton width={"100%"} height={108} radius={12} />
            <StyledSkeleton width={"100%"} height={108} radius={12} />
            <StyledSkeleton width={"100%"} height={108} radius={12} />
            <StyledSkeleton width={"100%"} height={108} radius={12} />
            <StyledSkeleton width={"100%"} height={108} radius={12} />
            <StyledSkeleton width={"100%"} height={108} radius={12} />
            <StyledSkeleton width={"100%"} height={108} radius={12} />
            <StyledSkeleton width={"100%"} height={108} radius={12} />
        </ScrollView>
    )
}
