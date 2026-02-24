import { Business, BusinessCategory, Prisma } from "@boni/database/dist/generated/prisma/client"
import Feather from "@expo/vector-icons/Feather"
import { useRouter } from "expo-router"
import React, { use, useLayoutEffect, useState } from "react"
import { Pressable, View } from "react-native"
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated"
import api from "../api/boni-api"
import CategoryList from "../components/category-list"
import BusinessList from "../components/lists/business-list"
import PageContainer from "../components/page-container"
import SearchBar from "../components/search-bar"
import StyledIcon from "../components/styled/styled-icon"
import useUserDependentPromise from "../hooks/use-user-dependent-promise"

type Filters = Record<string, string>

type CategoryWithSubcategories = Prisma.BusinessCategoryGetPayload<{
    include: { subcategories: true }
}>

async function getCategories(): Promise<CategoryWithSubcategories[]> {
    try {
        const response = await api.get("categories")

        return response.data
    } catch (error) {
        console.log("CATEGORIES ERROR:", error)
        return []
    }
}

async function getBusinesses(filters: Filters): Promise<Business[]> {
    try {
        const params = new URLSearchParams(filters)

        const response = await api.get("business?" + params.toString())

        return response.data
    } catch (error) {
        console.log("BUSINESS ERROR:", error)
        return []
    }
}

function SearchHeader({ scrollY }: { scrollY: SharedValue<number> }) {
    const router = useRouter()

    const animatedHeaderStyle = useAnimatedStyle(() => {
        const width = interpolate(scrollY.value, [0, 60], [50, 0], Extrapolation.CLAMP)

        const translateX = interpolate(scrollY.value, [0, 60], [0, -50], Extrapolation.CLAMP)

        return {
            width,
            transform: [{ translateX }],
            overflow: "visible",
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
            <SearchBar containerStyle={animatedSearchBarStyle} />
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

    const getCategoriesPromise = useUserDependentPromise(getCategories)
    const categories = use(getCategoriesPromise)
    const [selectedCategory, setSelectedCategory] = useState<BusinessCategory>()

    const [filters, setFilters] = useState<Filters>({})
    const addFilter = (k: string, v: string) => setFilters(prev => ({ ...prev, [k]: v }))
    const removeFilter = (k: string) =>
        setFilters(prev => {
            const { [k]: _, ...rest } = prev
            return rest
        })

    const [businessList, setBusinessList] = useState<Business[]>([])
    const [loadingBusinesses, setLoadingBusinesses] = useState(true)

    const [subCategories, setSubCategories] = useState<BusinessCategory[]>([])
    const [selectedSubCategory, setSelectedSubCategory] = useState<BusinessCategory>()

    useLayoutEffect(() => {
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

    useLayoutEffect(() => {
        if (selectedSubCategory) {
            addFilter("category", selectedSubCategory.id.toString())
        } else if (selectedCategory) {
            addFilter("category", selectedCategory.id.toString())
        } else {
            removeFilter("category")
        }
    }, [selectedSubCategory])

    useLayoutEffect(() => {
        setLoadingBusinesses(true)

        getBusinesses(filters)
            .then(list => {
                setBusinessList(list)
                setLoadingBusinesses(false)
            })
            .catch(err => console.log(err))
    }, [filters])

    return (
        <PageContainer edges={["top", "left", "right"]}>
            <SearchHeader scrollY={scrollY} />
            <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
                {/* TODO: Checar se quero px-6 ou p-6 ou (px-6 + py-4) */}
                <CategoryList
                    categories={categories as BusinessCategory[]}
                    setSelectedCategory={setSelectedCategory}
                    selectedCategory={selectedCategory}
                />
                {/* TODO: Criar Skeleton para carregar subcategories (JQuery? ReactQuery?, React hook use?) */}
                {/* Acho que vai ser bom usar o useTransition */}
                <CategoryList
                    categories={subCategories as BusinessCategory[]}
                    setSelectedCategory={setSelectedSubCategory}
                    selectedCategory={selectedSubCategory}
                    size="small"
                />
                <BusinessList list={businessList} isLoading={loadingBusinesses} />
            </Animated.ScrollView>
        </PageContainer>
    )
}
