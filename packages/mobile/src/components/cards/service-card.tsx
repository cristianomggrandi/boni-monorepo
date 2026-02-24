import { formatDuration, formatMoney } from "@/src/util/formatting"
import { Service } from "@boni/database/dist/generated/prisma/client"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { Pressable, View } from "react-native"
import StyledText from "../styled/styled-text"

export function ServiceCard({
    service,
    isCompact = false,
}: {
    service: Service
    isCompact?: boolean
}) {
    const router = useRouter()

    return (
        <Pressable
            onPress={() => router.push({ pathname: "/service/[id]", params: { id: service.id } })}
        >
            <View className="rounded-2xl bg-white border-0 p-2 justify-center gap-2 flex-row elevation">
                <View>
                    {service.imageUrl ? (
                        <Image
                            source={{ uri: service.imageUrl }}
                            className={"aspect-square rounded-lg " + (isCompact ? "h-24" : "h-28")}
                        />
                    ) : (
                        <View
                            className={
                                "items-center rounded-lg justify-center bg-red-300 aspect-square " +
                                (isCompact ? "h-24" : "h-28")
                            }
                        >
                            <StyledText>Foto</StyledText>
                        </View>
                    )}
                </View>
                <View className="flex-1 justify-between">
                    <View className="">
                        <StyledText className="font-semibold">{service.name}</StyledText>
                        <StyledText
                            className={"text-sm " + (isCompact ? "line-clamp-1" : "line-clamp-2")}
                        >
                            {service.description} teste tset est es tsetes tsestetes steste steste
                            steste steset steste stetes t se tes tes tesstetesste ste
                        </StyledText>
                    </View>
                    <View className="flex-row justify-between">
                        <View>
                            {service.duration ? (
                                <View className="flex-row items-center justify-center px-0.5 h-6 gap-1 opacity-65 bg-gray-200 rounded border-gray-300 border-hairline">
                                    {/* // TODO: Com ou sem ícone */}
                                    <StyledText
                                        className={
                                            "" + (isCompact ? "leading-3 text-sm" : "leading-4")
                                        }
                                    >
                                        <MaterialCommunityIcons
                                            name="clock"
                                            size={14}
                                            className="color-gray-800"
                                        />{" "}
                                        {formatDuration(service.duration)}
                                    </StyledText>
                                </View>
                            ) : null}
                        </View>
                        <View>
                            {service.price ? (
                                <View
                                    className={
                                        "bg-secondary rounded-full " +
                                        (isCompact ? "px-1 py-0.5" : "px-2 py-1")
                                    }
                                >
                                    <StyledText className="font-semibold items-center justify-center leading-4">
                                        {formatMoney(service.price)}
                                    </StyledText>
                                </View>
                            ) : null}
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}
