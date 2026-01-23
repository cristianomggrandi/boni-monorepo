import { Prisma } from "@boni/database/dist/generated/prisma/client"
import Feather from "@expo/vector-icons/Feather"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Image } from "expo-image"
import { Link, useLocalSearchParams } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { Dimensions, FlatList, Pressable, ScrollView, View } from "react-native"
import api from "../api/boni-api"
import PageContainer from "../components/page-container"
import StyledIcon from "../components/styled/styled-icon"
import StyledText from "../components/styled/styled-text"
import { formatDuration, formatMoney } from "../util/formatting"

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

function ServiceGroupSelector({
    business,
    selectedGroup,
    onSelectServiceGroup,
}: {
    business: BusinessType
    selectedGroup?: number
    onSelectServiceGroup: (id: number, index: number) => void
}) {
    return (
        <View className="bg-background">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="p-2">
                {business.serviceGroups
                    // TODO: Corrigir scroll horizontal
                    // .concat(business.serviceGroups)
                    .map((group, index) => (
                        <Pressable
                            key={group.id}
                            className={`
                                elevation mx-1 py-3 px-4 rounded-full active:bg-primary 
                                ${selectedGroup === group.id ? "bg-primary" : "bg-white"}
                            `}
                            onPress={() => onSelectServiceGroup(group.id, index)}
                        >
                            <StyledText className="font-semibold">{group.name}</StyledText>
                        </Pressable>
                    ))}
            </ScrollView>
        </View>
    )
}

const WINDOW_WIDTH = Dimensions.get("window").width

export default function BusinessPage() {
    const { id } = useLocalSearchParams()

    const [business, setBusiness] = useState<BusinessType>()

    const [selectedGroup, setSelectedGroup] = useState<ServiceGroupType["id"]>()

    useEffect(() => {
        api.get("business/" + id)
            .then(res => {
                console.log("BUSINESS:", res.data)
                setBusiness(res.data)
            })
            .catch(error => console.error(error))
    }, [])

    const listRef = useRef<FlatList<BusinessType["serviceGroups"][0]>>(null)

    // TODO: PRÓXIMO:
    // Criar array de refs para cada categoria e fazer scroll até ele usando measure:
    // targetRef.current?.measure((x, y, width, height, pageX, pageY) => {
    //   //do something with the measurements
    // });

    // TODO:
    if (!business) return null

    return (
        <PageContainer enableSafeSpace className="gap-2 px-0">
            <View className="w-full flex-row items-center justify-between px-4">
                <StyledIcon>
                    <StyledIcon>
                        <Feather name="arrow-left" size={24} color="black" />
                    </StyledIcon>
                </StyledIcon>
                <StyledText className="font-jakarta-bold text-2xl">{business.name}</StyledText>
                <StyledIcon>
                    <MaterialCommunityIcons name="cards-heart" size={24} color="black" />
                    {/* TODO: Checar se favoritou ou não */}
                    {/* <MaterialCommunityIcons name="cards-heart-outline" size={24} color="black" /> */}
                </StyledIcon>
            </View>
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
                            <ServiceGroupSelector
                                key="service-group-selector"
                                business={business}
                                selectedGroup={selectedGroup}
                                onSelectServiceGroup={(id, index) => {
                                    setSelectedGroup(id)
                                    listRef.current?.scrollToIndex({
                                        index: index + 1,
                                        animated: true,
                                        viewOffset: 50,
                                    })
                                }}
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
