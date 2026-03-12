import { Business } from "@boni/database/dist/generated/prisma/client"
import Ionicons from "@expo/vector-icons/Ionicons"
import { FlashList } from "@shopify/flash-list"
import { useRouter } from "expo-router"
import { Pressable, View } from "react-native"
import BusinessCard from "../cards/business-card"
import LoadingSpinner from "../loading-spinner"
import StyledIcon from "../styled/styled-icon"
import StyledText from "../styled/styled-text"

export default function BusinessList({
    list,
    isLoading,
    isCompact = false,
}: {
    list: Business[]
    isLoading: boolean
    isCompact?: boolean
}) {
    const router = useRouter()

    return (
        <View className="flex-1">
            <View className="flex-row items-center justify-between p-2">
                <StyledText className="text-xl font-semibold">
                    {isLoading ? "Carregando" : list.length}{" "}
                    {list.length === 1 ? "resultado" : "resultados"}
                </StyledText>
                <Pressable onPress={() => router.push("/search-filters")}>
                    <StyledIcon>
                        <Ionicons name="options-outline" size={24} color="black" />
                    </StyledIcon>
                </Pressable>
            </View>
            <View className="flex-1">
                {isLoading ? (
                    <LoadingSpinner size={80} />
                ) : (
                    <FlashList
                        // TODO: Remover 3 lists
                        data={[...list, ...list, ...list]}
                        renderItem={({ item }) => (
                            <BusinessCard business={item} key={item.id} isCompact={isCompact} />
                        )}
                        keyExtractor={(item, index) => (item.id + 10 * index).toString()}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={<View>{/* TODO: Criar Skeleton */}</View>}
                        ItemSeparatorComponent={() => <View className="h-2" />}
                        contentContainerClassName="pt-2 pb-4 px-2"
                        scrollEnabled={false}
                    />
                )}
            </View>
        </View>
    )
}
