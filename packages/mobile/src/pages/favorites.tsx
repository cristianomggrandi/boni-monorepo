import { Prisma } from "@boni/database/dist/generated/prisma/client"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Image } from "expo-image"
import { Link } from "expo-router"
import { Dimensions, ScrollView, View } from "react-native"
import PageContainer from "../components/page-container"
import StyledText from "../components/styled/styled-text"
import useFavoritesStore from "../stores/favorites-store"
import { formatDuration, formatMoney } from "../util/formatting"
import { BusinessList } from "./search"

type BusinessType = Prisma.BusinessGetPayload<{
    include: {
        address: true
        categories: true
        serviceGroups: { include: { services: true } }
    }
}>

type ServiceGroupType = BusinessType["serviceGroups"][0]
type ServiceType = ServiceGroupType["services"][0]

function ServiceCard({ service }: { service: ServiceType }) {
    return (
        <Link href={`/service/${service.id}`}>
            <View className="flex-row elevation-sm bg-white rounded-xl p-2 gap-2">
                <View className="h-32 w-32 m-1 rounded">
                    <Image
                        className="h-full w-full rounded-xl"
                        source={
                            // TODO: Remover fallback
                            service.imageUrl ??
                            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/e4/3b/b5/view-from-the-top.jpg?w=500&h=500&s=1"
                        }
                    />
                </View>
                <View className="flex-1 justify-between">
                    <View className="">
                        <StyledText className="font-semibold text-lg">{service.name}</StyledText>
                        <StyledText className="text-sm line-clamp-3">
                            {service.description}
                        </StyledText>
                    </View>
                    <View className="flex-row justify-between">
                        <View>
                            {service.duration ? (
                                <View className="flex-row items-center px-2 gap-1 opacity-65 bg-gray-200 rounded border-gray-300 border-hairlin">
                                    {/* // TODO: Com ou sem ícone */}
                                    <StyledText className="">
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
                                <View className="bg-secondary rounded-full px-2 py-1">
                                    <StyledText className="font-semibold items-center justify-center leading-4">
                                        {formatMoney(service.price)}
                                    </StyledText>
                                </View>
                            ) : null}
                        </View>
                    </View>
                </View>
            </View>
        </Link>
    )
}

function ListHeader({ business }: { business: BusinessType }) {
    return (
        <View className="">
            <View className="w-full aspect-square bg-transparent -mb-6" />
            <View className="gap-4 bg-background pt-8 rounded-t-4xl">
                <View className="px-6">
                    <StyledText className="text-3xl font-jakarta-bold">{business.name}</StyledText>
                    {/* TODO: Exibir categorias? */}
                    {business.address ? (
                        <StyledText className="font-semibold text-gray-500">
                            {business.address.street}, {business.address.streetNumber},{" "}
                            {business.address.city}
                        </StyledText>
                    ) : null}
                </View>
                <View className="flex-row justify-between px-6">
                    <View className="p-2 elevation-sm bg-white rounded flex-row  gap-2">
                        <StyledText className="font-semibold text-lg">
                            <FontAwesome name="star" size={16} className="color-secondary" />
                            {"   "}
                            {/* TODO: Página de avaliações */}
                            4.9
                        </StyledText>
                        <StyledText className="text-sm text-gray-500 mt-1.5">(120)</StyledText>
                    </View>
                    <View className="p-2 elevation-sm bg-white rounded flex-row items-center">
                        <StyledText className="">
                            <MaterialCommunityIcons
                                name="clock"
                                size={14}
                                className="color-gray-800"
                            />{" "}
                            {/* TODO: Parametrizar */}
                            Aberto até 8:00
                        </StyledText>
                    </View>
                </View>
                <View className="border-b-hairline border-gray-300 m-4 bg-background" />
            </View>
        </View>
    )
}

const WINDOW_WIDTH = Dimensions.get("window").width

// TODO: Decidir se coloca ou não dentro de Search para que tenha a TabBar ou se deixa sem (do jeito que está)

export default function FavoritesPage() {
    const favoriteBusinesses = useFavoritesStore(state => state.getFavoriteBusinesses())
    const favoriteServices = useFavoritesStore(state => state.getFavoriteServices())

    return (
        <PageContainer edges={["top", "left", "right", "bottom"]} className="gap-2 px-0">
            <ScrollView>
                <BusinessList list={favoriteBusinesses} isLoading={false} />
            </ScrollView>
        </PageContainer>
    )
}
