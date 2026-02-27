import { Business, BusinessCategory } from "@boni/database/dist/generated/prisma/client"
import { useGlobalSearchParams, useNavigation, useRouter } from "expo-router"
import React, { use, useEffect, useLayoutEffect, useState } from "react"
import { View } from "react-native"
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import HorizontalListSelector from "../components/horizontal-list-selector"
import BusinessList from "../components/lists/business-list"
import PageContainer from "../components/page-container"
import { RouterBackButton } from "../components/page-header"
import SearchBar from "../components/search-bar"
import StyledText from "../components/styled/styled-text"
import useUserDependentPromise from "../hooks/use-user-dependent-promise"
import { CategoryWithSubcategories, Filters, getBusinesses, getCategories } from "../util/db"

function SearchHeader({ scrollY }: { scrollY: SharedValue<number> }) {
    const animatedHeaderStyle = useAnimatedStyle(() => {
        const width = interpolate(scrollY.value, [0, 60], [50, 0], Extrapolation.CLAMP)

        const translateX = interpolate(scrollY.value, [0, 60], [0, -50], Extrapolation.CLAMP)

        const opacity = scrollY.value < 60 ? 1 : 0

        return {
            width,
            transform: [{ translateX }],
            overflow: "visible",
            opacity,
        }
    })

    const animatedSearchBarContainerStyle = useAnimatedStyle(() => {
        const left = interpolate(scrollY.value, [0, 60], [50, 0], Extrapolation.CLAMP)

        return { left }
    })

    return (
        <SafeAreaView className="h-24 w-full bg-background" edges={["top", "left", "right"]}>
            <View className="mx-5 flex-row items-center justify-between relative">
                <Animated.View style={animatedHeaderStyle} className="">
                    <RouterBackButton />
                </Animated.View>
                {/* <SearchBar containerStyle={animatedSearchBarStyle} /> */}
                <Animated.View style={animatedSearchBarContainerStyle} className="absolute right-0">
                    <SearchBar containerStyle={{ paddingVertical: 4 }} />
                </Animated.View>
            </View>
        </SafeAreaView>
    )
}

export default function Search() {
    const navigation = useNavigation()
    const router = useRouter()
    const globalParams = useGlobalSearchParams<{ category: string; subCategory: string }>()

    const scrollY = useSharedValue(0)
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: event => {
            scrollY.value = event.contentOffset.y
        },
    })

    const getCategoriesPromise = useUserDependentPromise(getCategories)
    const categories = use(getCategoriesPromise)
    const [selectedCategory, setSelectedCategory] = useState<CategoryWithSubcategories>()

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

    useEffect(() => {
        if (categories) {
            if (globalParams.category) {
                const category = categories.find(c => c.id === Number(globalParams.category))

                if (category) {
                    setSelectedCategory(category)
                    setSubCategories(category.subcategories)

                    if (globalParams.subCategory) {
                        setSelectedSubCategory(
                            category.subcategories.find(
                                c => c.id === Number(globalParams.subCategory)
                            )
                        )
                    } else {
                        setSelectedSubCategory(undefined)
                    }
                } else {
                    setSelectedCategory(undefined)
                    setSubCategories([])
                    setSelectedSubCategory(undefined)
                }
            } else {
                setSelectedCategory(undefined)
                setSubCategories([])
                setSelectedSubCategory(undefined)
            }
        }
    }, [categories, globalParams.category, globalParams.subCategory])

    useLayoutEffect(() => {
        setLoadingBusinesses(true)

        getBusinesses(filters)
            .then(list => {
                setBusinessList(list)
                setLoadingBusinesses(false)
            })
            .catch(err => console.log(err))
    }, [filters])

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <SearchHeader scrollY={scrollY} />,
        })
    }, [])

    return (
        <PageContainer edges={[]} className="pt-1">
            <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
                <StyledText>{JSON.stringify(globalParams)}</StyledText>
                {/* TODO: Checar se quero px-6 ou p-6 ou (px-6 + py-4) */}
                <HorizontalListSelector
                    list={categories ?? []}
                    onSelect={selected => {
                        if (selectedCategory) {
                            if (selectedCategory.id === selected.id) {
                                setSelectedCategory(undefined)
                                setSubCategories([])

                                router.setParams({ category: undefined, subCategory: undefined })
                            } else {
                                setSelectedCategory(selected)
                                setSubCategories(selectedCategory.subcategories)

                                router.setParams({ category: selected.id, subCategory: undefined })
                            }
                        } else {
                            setSelectedCategory(selected)
                            setSubCategories(selected.subcategories)

                            router.setParams({ category: selected.id, subCategory: undefined })
                        }

                        setSelectedSubCategory(undefined)
                    }}
                    selected={selectedCategory}
                    labelExtractor={item => item.name}
                />
                <HorizontalListSelector
                    list={subCategories}
                    onSelect={selected => {
                        if (selectedSubCategory) {
                            if (selectedSubCategory.id === selected.id) {
                                setSelectedSubCategory(undefined)

                                router.setParams({ subCategory: undefined })
                            } else {
                                setSelectedSubCategory(selected)

                                router.setParams({ subCategory: selected.id })
                            }
                        } else {
                            setSelectedSubCategory(selected)

                            router.setParams({ subCategory: selected.id })
                        }
                    }}
                    selected={selectedSubCategory}
                    size="small"
                    labelExtractor={item => item.name}
                />
                <BusinessList list={businessList} isLoading={loadingBusinesses} />
            </Animated.ScrollView>
        </PageContainer>
    )
}
