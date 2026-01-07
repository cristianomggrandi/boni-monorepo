import { Business } from "@boni/database/dist/generated/prisma/client"
import { useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import api from "../api/boni-api"
import BusinessCard from "../components/cards/business"
import SearchBar from "../components/search-bar"

export default function Search() {
    const [businessList, setBusinessList] = useState<Business[]>([])

    useEffect(() => {
        api.get("business")
            .then(response => setBusinessList(response.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <SafeAreaView className="flex-1 bg-pink-50 px-6">
            {/* TODO: Colocar SafeAreaView em componente para reutilizar com o mesmo espaçamento */}
            {/* TODO: Checar se quero px-6 ou p-6 ou (px-6 + py-4) */}
            <SearchBar />
            <View>
                <ScrollView
                    contentContainerClassName="gap-2"
                    className="mt-4"
                    showsVerticalScrollIndicator={false}
                >
                    {businessList.map(business => (
                        <BusinessCard key={business.id} business={business} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
