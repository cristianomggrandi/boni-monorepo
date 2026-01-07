import { Business } from "@boni/database/dist/generated/prisma/client"
import { FlashList } from "@shopify/flash-list"
import { useEffect, useState } from "react"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import api from "../api/boni-api"
import BusinessCard from "../components/cards/business"
import CategoryList from "../components/category-list"
import SearchBar from "../components/search-bar"

export default function Search() {
    const [businessList, setBusinessList] = useState<Business[]>([])

    useEffect(() => {
        api.get("business")
            .then(response =>
                // TODO:
                // setBusinessList(response.data)
                setBusinessList([...response.data, ...response.data, ...response.data])
            )
            .catch(err => console.log(err))
    }, [])

    return (
        <SafeAreaView edges={["top"]} className="flex-1 flex-col bg-[#FCF8F8]">
            {/* TODO: Colocar SafeAreaView em componente para reutilizar com o mesmo espaçamento */}
            {/* TODO: Checar se quero px-6 ou p-6 ou (px-6 + py-4) */}
            <View className="px-6">
                <SearchBar />
            </View>
            <CategoryList />
            <View className="flex-1">
                <FlashList
                    className="py-2 px-6"
                    data={businessList}
                    renderItem={({ item }) => <BusinessCard business={item} key={item.id} />}
                    keyExtractor={(item, index) => (item.id + 10 * index).toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<View>{/* TODO: Criar Skeleton */}</View>}
                    ItemSeparatorComponent={() => <View className="h-2" />}
                />
                {/* <ScrollView
                    contentContainerClassName="gap-2"
                    className="mt-4"
                    showsVerticalScrollIndicator={false}
                >
                    {businessList.map(business => (
                        <BusinessCard key={business.id} business={business} />
                    ))}
                </ScrollView> */}
            </View>
        </SafeAreaView>
    )
}
