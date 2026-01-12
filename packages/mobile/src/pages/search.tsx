import { Business, Category } from "@boni/database/dist/generated/prisma/client"
import Ionicons from "@expo/vector-icons/Ionicons"
import { FlashList } from "@shopify/flash-list"
import { useEffect, useState } from "react"
import { View } from "react-native"
import api from "../api/boni-api"
import BusinessCard from "../components/cards/business"
import CategoryList from "../components/category-list"
import PageContainer from "../components/page-container"
import SearchBar from "../components/search-bar"
import StyledIcon from "../components/styled/styled-icon"
import StyledText from "../components/styled/styled-text"

export default function Search() {
    const [businessList, setBusinessList] = useState<Business[]>([])

    // TODO: Ao clicar, fazer Optimistic UI Change
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState<Category>()

    const [subCategories, setSubCategories] = useState<Category[]>([])
    const [selectedSubCategory, setSelectedSubCategory] = useState<Category>()

    useEffect(() => {
        api.get("categories")
            .then(response => setCategories(response.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (selectedCategory)
            api.get("categories/" + selectedCategory.id + "/subcategories")
                .then(response => setSubCategories(response.data))
                .catch(err => console.log(err))

        setSelectedSubCategory(undefined)
    }, [selectedCategory])

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
        <PageContainer>
            {/* TODO: Colocar SafeAreaView em componente para reutilizar com o mesmo espaçamento */}
            {/* TODO: Checar se quero px-6 ou p-6 ou (px-6 + py-4) */}
            <SearchBar />
            <CategoryList
                categories={categories}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
            />
            {/* TODO: Criar Skeleton para carregar subcategories (JQuery? ReactQuery?, React hook use?) */}
            <CategoryList
                categories={subCategories}
                setSelectedCategory={setSelectedSubCategory}
                selectedCategory={selectedSubCategory}
                size="small"
            />
            <View className="flex-row items-center justify-between p-2">
                <StyledText className="text-xl font-semibold">
                    {businessList.length} resultados
                </StyledText>
                <StyledIcon>
                    <Ionicons name="options-outline" size={24} color="black" />
                </StyledIcon>
            </View>
            <View className="flex-1">
                <FlashList
                    data={businessList}
                    renderItem={({ item }) => <BusinessCard business={item} key={item.id} />}
                    keyExtractor={(item, index) => (item.id + 10 * index).toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<View>{/* TODO: Criar Skeleton */}</View>}
                    ItemSeparatorComponent={() => <View className="h-2" />}
                    contentContainerClassName="pt-2 pb-4 px-2"
                />
            </View>
        </PageContainer>
    )
}
