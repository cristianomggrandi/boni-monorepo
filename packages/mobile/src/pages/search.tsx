import { BusinessCategory } from "@boni/database/dist/generated/prisma/client"
import { useFocusEffect, useGlobalSearchParams, useNavigation, useRouter } from "expo-router"
import React, {
    Suspense,
    use,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from "react"
import { ScrollView, View } from "react-native"
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
import LoadingSpinner from "../components/loading-spinner"
import PageContainer from "../components/page-container"
import { RouterBackButton } from "../components/page-header"
import SearchBar from "../components/search-bar"
import StyledSkeleton from "../components/styled/styled-skeleton"
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

function BusinessCategoryList({
    getCategoriesPromise,
}: {
    getCategoriesPromise: Promise<CategoryWithSubcategories[]>
}) {
    const { filters, addFilter, removeFilter } = useSearchFiltersParams()

    const categories = use(getCategoriesPromise)

    const [subCategories, setSubCategories] = useState<BusinessCategory[]>([])

    useEffect(() => {
        if (categories) {
            if (filters.category) {
                const category = categories.find(c => c.id === Number(filters.category))

                if (category) setSubCategories(category.subcategories)
                else setSubCategories([])
            } else {
                setSubCategories([])
            }
        }
    }, [categories, filters.category])

    return (
        <>
            <HorizontalListSelector
                list={categories ?? []}
                onSelect={selected => {
                    if (!selected) {
                        setSubCategories([])
                        removeFilter("category")
                        removeFilter("subCategory")
                    } else {
                        setSubCategories(selected.subcategories)
                        addFilter("category", selected.id)
                        removeFilter("subCategory")
                    }
                }}
                selected={filters.category}
                labelExtractor={item => item.name}
                idExtractor={item => item.id}
            />
            <HorizontalListSelector
                list={subCategories}
                onSelect={selected => {
                    if (!selected) removeFilter("subCategory")
                    else addFilter("subCategory", selected.id)
                }}
                selected={filters.subCategory}
                size="small"
                labelExtractor={item => item.name}
                idExtractor={item => item.id}
            />
        </>
    )
}

// function BusinessList

export default function SearchPage() {
    const navigation = useNavigation()

    const filters = useSearchFiltersParams(s => s.filters)

    const scrollY = useSharedValue(0)
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: event => {
            scrollY.value = event.contentOffset.y
        },
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <SearchHeader scrollY={scrollY} />,
        })
    }, [])

    const getBusinessPromise = useMemo(() => getBusinesses(filters), [filters])
    const getCategoriesPromise = useUserDependentPromise(getCategories)

    return (
        <PageContainer edges={[]} className="pt-1">
            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                contentContainerClassName="min-h-full"
            >
                <Suspense
                    fallback={
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View className="p-1 flex-row gap-1">
                                <StyledSkeleton width={96} height={36} radius={"round"} />
                                <StyledSkeleton width={96} height={36} radius={"round"} />
                                <StyledSkeleton width={96} height={36} radius={"round"} />
                                <StyledSkeleton width={96} height={36} radius={"round"} />
                                <StyledSkeleton width={96} height={36} radius={"round"} />
                                <StyledSkeleton width={96} height={36} radius={"round"} />
                            </View>
                        </ScrollView>
                    }
                >
                    <BusinessCategoryList getCategoriesPromise={getCategoriesPromise} />
                </Suspense>
                <Suspense fallback={<LoadingSpinner />}>
                    <BusinessList list={getBusinessPromise} />
                </Suspense>
            </Animated.ScrollView>
        </PageContainer>
    )
}
