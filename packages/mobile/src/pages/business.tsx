import { Prisma } from "@boni/database/dist/generated/prisma/client"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Image } from "expo-image"
import { useLocalSearchParams, useNavigation } from "expo-router"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { FlatList, View } from "react-native"
import api from "../api/boni-api"
import { ServiceCard } from "../components/cards/service-card"
import FavoriteIcon from "../components/favorite-icon"
import HorizontalListSelector from "../components/horizontal-list-selector"
import PageContainer from "../components/page-container"
import StyledText from "../components/styled/styled-text"
import useFavoritesStore from "../stores/favorites-store"

type BusinessType = Prisma.BusinessGetPayload<{
    include: {
        address: true
        categories: true
        serviceGroups: { include: { services: true } }
    }
}>

type ServiceGroupType = BusinessType["serviceGroups"][0]
type ServiceType = ServiceGroupType["services"][0]

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

// TODO: Decidir se coloca ou não dentro de Search para que tenha a TabBar ou se deixa sem (do jeito que está)

function BusinessPageFavoriteIcon({ business }: { business: BusinessType }) {
    const favoriteBusinessIds = useFavoritesStore(state => state.getFavoriteBusinessIds())
    const addFavoriteBusiness = useFavoritesStore(state => state.addFavoriteBusiness)
    const removeFavoriteBusiness = useFavoritesStore(state => state.removeFavoriteBusiness)

    const [isFavorite, setIsFavorite] = useState(favoriteBusinessIds.includes(Number(business.id)))

    const handleFavoriteToggle = async () => {
        const newIsFavorite = !isFavorite
        setIsFavorite(newIsFavorite)

        try {
            if (newIsFavorite) {
                await api.post("/favorite-businesses/" + business.id)
                addFavoriteBusiness(business)
            } else {
                await api.delete("/favorite-businesses/" + business.id)
                removeFavoriteBusiness(business)
            }
        } catch (error) {
            console.error("Failed to toggle favorite:", error)
            setIsFavorite(!newIsFavorite)
        }
    }

    useEffect(() => {
        setIsFavorite(favoriteBusinessIds.includes(Number(business.id)))
    }, [favoriteBusinessIds])

    return <FavoriteIcon isFavorite={isFavorite} handleFavoriteToggle={handleFavoriteToggle} />
}

export default function BusinessPage() {
    const navigation = useNavigation()
    const { id } = useLocalSearchParams()

    const [business, setBusiness] = useState<BusinessType>()

    const [selectedGroup, setSelectedGroup] = useState<ServiceGroupType["id"]>()

    // TODO: use() hook?
    useEffect(() => {
        api.get("business/" + id)
            .then(res => setBusiness(res.data))
            .catch(error => console.error(error))
    }, [])

    useLayoutEffect(() => {
        if (business)
            navigation.setOptions({
                headerRight: () => <BusinessPageFavoriteIcon business={business} />,
                title: business.name,
            })
    }, [business])

    const listRef = useRef<FlatList<BusinessType["serviceGroups"][0]>>(null)

    // TODO:
    if (!business) return null

    return (
        <PageContainer className="gap-2 p-0">
            <View className="relative">
                <View className="absolute">
                    <Image
                        className="w-full aspect-square bg-red-200"
                        source={
                            // business.image ??
                            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/e4/3b/b5/view-from-the-top.jpg?w=500&h=500&s=1"
                        }
                    />
                </View>
                <FlatList
                    ref={listRef}
                    ListHeaderComponent={() => <ListHeader business={business} />}
                    data={[business.serviceGroups[0], ...business.serviceGroups]}
                    renderItem={({ item, index }) =>
                        index === 0 ? (
                            <HorizontalListSelector
                                list={business.serviceGroups}
                                idExtractor={group => group.id}
                                onSelect={(group, index) => {
                                    setSelectedGroup(group.id)
                                    listRef.current?.scrollToIndex({
                                        index: index + 1,
                                        animated: true,
                                        viewOffset: 50,
                                    })
                                }}
                                selected={selectedGroup}
                                labelExtractor={group => group.name}
                                size="large"
                                selectedColor="primary"
                                className="bg-background py-1 px-3"
                            />
                        ) : (
                            <View className="gap-2 p-4 bg-background">
                                <StyledText className="font-semibold text-xl" key={item.id}>
                                    {item.name}
                                </StyledText>
                                <FlatList
                                    data={item.services}
                                    renderItem={({ item }) => <ServiceCard service={item} />}
                                    keyExtractor={
                                        // TODO: Voltar ao normal
                                        (item, index) => (item.id + 10 * index).toString()
                                    }
                                    ItemSeparatorComponent={() => <View className="h-2" />}
                                    showsVerticalScrollIndicator={false}
                                    scrollEnabled={false}
                                    contentContainerClassName="p-2"
                                />
                            </View>
                        )
                    }
                    keyExtractor={(item, index) => (item.id + 10 * index).toString()}
                    stickyHeaderIndices={[1]}
                />
                {/* TODO: Scrollar até o final e ver se vai cortar */}
            </View>
        </PageContainer>
    )
}
