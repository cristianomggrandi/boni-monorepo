import { Business, Category } from "@boni/database/dist/generated/prisma/client"
import Feather from "@expo/vector-icons/Feather"
import Ionicons from "@expo/vector-icons/Ionicons"
import { FlashList } from "@shopify/flash-list"
import { useRouter } from "expo-router"
import React, { use, useEffect, useState } from "react"
import { ActivityIndicator, Pressable, View } from "react-native"
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated"
import api from "../api/boni-api"
import BusinessCard from "../components/cards/business"
import CategoryList from "../components/category-list"
import PageContainer from "../components/page-container"
import SearchBar from "../components/search-bar"
import StyledIcon from "../components/styled/styled-icon"
import StyledText from "../components/styled/styled-text"

type Filters = Record<string, string>

async function getCategories() {
    const response = await api.get("categories")

    return response.data
}

const getCategoriesPromise = getCategories()

async function getBusinesses(filters: Filters): Promise<Business[]> {
    const params = new URLSearchParams(filters)

    const response = await api.get("business?" + params.toString())

    return response.data
}

function BusinessList({ list, isLoading }: { list: Business[]; isLoading: boolean }) {
    return (
        <View className="flex-1">
            <View className="flex-row items-center justify-between p-2">
                <StyledText className="text-xl font-semibold">
                    {isLoading ? "Carregando" : list.length} resultados
                </StyledText>
                <StyledIcon>
                    <Ionicons name="options-outline" size={24} color="black" />
                </StyledIcon>
            </View>
            <View className="flex-1">
                {isLoading ? (
                    <View className="flex-1 items-center justify-center">
                        <ActivityIndicator size={80} className="fill-primary text-primary" />
                    </View>
                ) : (
                    <FlashList
                        data={[...list, ...list, ...list]}
                        renderItem={({ item }) => <BusinessCard business={item} key={item.id} />}
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

function SearchHeader({ scrollY }: { scrollY: SharedValue<number> }) {
    const router = useRouter()

    // 4. Create the animated style for the Back Button wrapper
    const animatedHeaderStyle = useAnimatedStyle(() => {
        // We interpolate: as scroll goes from 0 to 50, width goes from 50 to 0
        const width = interpolate(
            scrollY.value,
            [0, 60],
            [50, 0], // Start width -> End width
            Extrapolation.CLAMP
        )

        // const opacity = interpolate(scrollY.value, [0, 40], [1, 0], Extrapolation.CLAMP)

        // Push the element to the left as it disappears for a smoother effect
        const translateX = interpolate(scrollY.value, [0, 60], [0, -50], Extrapolation.CLAMP)

        return {
            width,
            // opacity,
            transform: [{ translateX }],
            overflow: "visible", // Important so the icon doesn't bleed out while shrinking
        }
    })

    const animatedSearchBarStyle = useAnimatedStyle(() => {
        const paddingVertical = interpolate(scrollY.value, [0, 60], [8, 0], Extrapolation.CLAMP)

        return { paddingVertical }
    })

    return (
        <View className="flex-row items-center px-2 pb-1overflow-hidden">
            <Animated.View style={animatedHeaderStyle} className="">
                <Pressable onPress={router.back} className="">
                    <StyledIcon>
                        <Feather name="arrow-left" size={24} color="black" />
                    </StyledIcon>
                </Pressable>
            </Animated.View>
            <SearchBar style={animatedSearchBarStyle} />
        </View>
    )
}

export default function Search() {
    const scrollY = useSharedValue(0)
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: event => {
            scrollY.value = event.contentOffset.y
        },
    })

    const categories = use(getCategoriesPromise)
    const [selectedCategory, setSelectedCategory] = useState<Category>()

    const [filters, setFilters] = useState<Filters>({})
    const addFilter = (k: string, v: string) => setFilters(prev => ({ ...prev, [k]: v }))
    const removeFilter = (k: string) =>
        setFilters(prev => {
            const { [k]: _, ...rest } = prev
            return rest
        })

    const [businessList, setBusinessList] = useState<Business[]>([])
    const [loadingBusinesses, setLoadingBusinesses] = useState(true)

    const [subCategories, setSubCategories] = useState<Category[]>([])
    const [selectedSubCategory, setSelectedSubCategory] = useState<Category>()

    useEffect(() => {
        if (selectedCategory) {
            api.get("categories/" + selectedCategory.id + "/subcategories")
                .then(response => setSubCategories(response.data))
                .catch(err => console.log(err))

            addFilter("category", selectedCategory.id.toString())
        } else {
            removeFilter("category")
            setSubCategories([])
        }

        setSelectedSubCategory(undefined)
    }, [selectedCategory])

    useEffect(() => {
        if (selectedSubCategory) {
            addFilter("category", selectedSubCategory.id.toString())
        } else if (selectedCategory) {
            addFilter("category", selectedCategory.id.toString())
        } else {
            removeFilter("category")
        }
    }, [selectedSubCategory])

    useEffect(() => {
        setLoadingBusinesses(true)

        getBusinesses(filters)
            .then(list => {
                setBusinessList(list)
                setLoadingBusinesses(false)
            })
            .catch(err => console.log(err))
    }, [filters])

    return (
        <PageContainer enableSafeSpace>
            <SearchHeader scrollY={scrollY} />
            <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
                {/* TODO: Checar se quero px-6 ou p-6 ou (px-6 + py-4) */}
                <CategoryList
                    categories={categories}
                    setSelectedCategory={setSelectedCategory}
                    selectedCategory={selectedCategory}
                />
                {/* TODO: Criar Skeleton para carregar subcategories (JQuery? ReactQuery?, React hook use?) */}
                {/* Acho que vai ser bom usar o useTransition */}
                <CategoryList
                    categories={subCategories}
                    setSelectedCategory={setSelectedSubCategory}
                    selectedCategory={selectedSubCategory}
                    size="small"
                />
                <BusinessList list={businessList} isLoading={loadingBusinesses} />
            </Animated.ScrollView>
        </PageContainer>
    )
}
