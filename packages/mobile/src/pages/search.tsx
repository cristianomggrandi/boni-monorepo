import { Business, BusinessCategory } from "@boni/database/dist/generated/prisma/client"
import { useFocusEffect, useGlobalSearchParams, useNavigation, useRouter } from "expo-router"
import React, { use, useCallback, useEffect, useLayoutEffect, useState } from "react"
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
import useUserDependentPromise from "../hooks/use-user-dependent-promise"
import useSearchFiltersParams from "../stores/search-filters-params-store"
import { CategoryWithSubcategories, getBusinesses, getCategories } from "../util/db"

function SearchHeader({ scrollY }: { scrollY: SharedValue<number> }) {
    const router = useRouter()
    const { autoFocus } = useGlobalSearchParams<{ autoFocus?: string }>()

    const textInputRef = React.useRef<any>(null)

    useFocusEffect(
        useCallback(() => {
            if (autoFocus === "true") {
                setTimeout(() => {
                    textInputRef.current?.focus()
                }, 150)

                router.setParams({ autoFocus: "false" })
            }
        }, [autoFocus])
    )

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
                <Animated.View style={animatedSearchBarContainerStyle} className="absolute right-0">
                    <SearchBar containerStyle={{ paddingVertical: 4 }} ref={textInputRef} />
                </Animated.View>
            </View>
        </SafeAreaView>
    )
}

export default function Search() {
    const navigation = useNavigation()
    const router = useRouter()
    const { filters, addFilter, removeFilter } = useSearchFiltersParams()

    const scrollY = useSharedValue(0)
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: event => {
            scrollY.value = event.contentOffset.y
        },
    })

    const getCategoriesPromise = useUserDependentPromise(getCategories)
    const categories = use(getCategoriesPromise)
    const [selectedCategory, setSelectedCategory] = useState<CategoryWithSubcategories>()

    const [businessList, setBusinessList] = useState<Business[]>([])
    const [loadingBusinesses, setLoadingBusinesses] = useState(true)

    const [subCategories, setSubCategories] = useState<BusinessCategory[]>([])
    const [selectedSubCategory, setSelectedSubCategory] = useState<BusinessCategory>()

    useEffect(() => {
        if (categories) {
            if (filters.category) {
                const category = categories.find(c => c.id === Number(filters.category))
                if (category) {
                    setSelectedCategory(category)
                    setSubCategories(category.subcategories)
                    if (filters.subCategory) {
                        setSelectedSubCategory(
                            category.subcategories.find(c => c.id === Number(filters.subCategory))
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
    }, [categories, filters.category, filters.subCategory])

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
                <HorizontalListSelector
                    list={categories ?? []}
                    onSelect={selected => {
                        if (!selected) {
                            setSelectedCategory(undefined)
                            setSubCategories([])
                            removeFilter("category")
                            removeFilter("subCategory")
                        } else {
                            setSelectedCategory(selected)
                            setSubCategories(selected.subcategories)
                            addFilter("category", selected.id)
                            removeFilter("subCategory")
                        }

                        setSelectedSubCategory(undefined)
                    }}
                    selected={filters.category}
                    labelExtractor={item => item.name}
                    idExtractor={item => item.id}
                />
                <HorizontalListSelector
                    list={subCategories}
                    onSelect={selected => {
                        // if (filters.subCategory) {
                        //     if (filters.subCategory === selected.id) {
                        //         setSelectedSubCategory(undefined)
                        //         removeFilter("subCategory")
                        //     } else {
                        //         setSelectedSubCategory(selected)
                        //         addFilter("subCategory", selected.id)
                        //     }
                        // } else {
                        //     setSelectedSubCategory(selected)
                        //     addFilter("subCategory", selected.id)
                        // }
                    }}
                    selected={filters.subCategory}
                    size="small"
                    labelExtractor={item => item.name}
                    idExtractor={item => item.id}
                />
                <BusinessList list={businessList} isLoading={loadingBusinesses} />
            </Animated.ScrollView>
        </PageContainer>
    )
}
