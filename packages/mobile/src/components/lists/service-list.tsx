import { Service } from "@boni/database/dist/generated/prisma/client"
import Ionicons from "@expo/vector-icons/Ionicons"
import { FlashList } from "@shopify/flash-list"
import { View } from "react-native"
import { ServiceCard } from "../cards/service-card"
import StyledIcon from "../styled/styled-icon"
import StyledText from "../styled/styled-text"

export default function ServiceList({
    list,
    isCompact = false,
}: {
    list: Service[]
    isCompact?: boolean
}) {
    return (
        <View className="flex-1">
            <View className="flex-row items-center justify-between p-2">
                <StyledText className="text-xl font-semibold">
                    {list.length} {list.length === 1 ? "resultado" : "resultados"}
                </StyledText>
                <StyledIcon>
                    <Ionicons name="options-outline" size={24} color="black" />
                </StyledIcon>
            </View>
            <View className="flex-1">
                <FlashList
                    // TODO: Remover 3 lists
                    data={[...list, ...list, ...list]}
                    renderItem={({ item }) => (
                        <ServiceCard service={item} key={item.id} isCompact={isCompact} />
                    )}
                    keyExtractor={(item, index) => (item.id + 10 * index).toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<View>{/* TODO: Criar Skeleton */}</View>}
                    ItemSeparatorComponent={() => <View className="h-2" />}
                    contentContainerClassName="pt-2 pb-4 px-2"
                    scrollEnabled={false}
                />
            </View>
        </View>
    )
}
