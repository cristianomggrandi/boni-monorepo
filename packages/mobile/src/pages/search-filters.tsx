import { BusinessCategory } from "@boni/database/dist/generated/prisma/client"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import Slider from "@react-native-community/slider"
import { use, useEffect, useState } from "react"
import { View } from "react-native"
import HorizontalListSelector from "../components/horizontal-list-selector"
import PageContainer from "../components/page-container"
import StyledButton from "../components/styled/styled-button"
import StyledText from "../components/styled/styled-text"
import useUserDependentPromise from "../hooks/use-user-dependent-promise"
import useSearchFiltersParams from "../stores/search-filters-params-store"
import { CategoryWithSubcategories, getCategories } from "../util/db"
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../util/styling"

const SORT_BY_OPTIONS = [
    {
        id: 1,
        label: "Relevância",
    },
    {
        id: 2,
        label: "Melhor avaliado",
    },
    {
        id: 3,
        label: "Distância",
    },
    {
        id: 4,
        label: "Maior preço",
    },
    {
        id: 5,
        label: "Menor preço",
    },
]

function MinimumRatingSlider({
    minimumRating,
    setMinimumRating,
}: {
    minimumRating: number
    setMinimumRating: (value: number) => void
}) {
    const [rating, setRating] = useState(minimumRating)

    return (
        <View className="gap-2">
            <View className="px-2 flex-row justify-between">
                <StyledText className="text-lg font-jakarta-bold">Avaliação mínima</StyledText>
                <StyledText className="text-lg font-jakarta-bold">
                    {rating} <FontAwesome name="star" size={16} className="color-secondary" />
                </StyledText>
            </View>
            <Slider
                style={{ marginTop: 12 }}
                minimumValue={0}
                maximumValue={5}
                value={rating}
                step={0.1}
                onValueChange={e => setRating(Number(e.toFixed(1)))}
                onSlidingComplete={e => setMinimumRating(Number(e.toFixed(1)))}
                thumbTintColor={SECONDARY_COLOR}
                minimumTrackTintColor={SECONDARY_COLOR}
                maximumTrackTintColor={PRIMARY_COLOR}
            />
        </View>
    )
}

export default function FiltersPage() {
    const { filters, addFilter, removeFilter } = useSearchFiltersParams()

    const [orderBy, setOrderBy] = useState(SORT_BY_OPTIONS[0])
    const [minimumRating, setMinimumRating] = useState(0)

    const getCategoriesPromise = useUserDependentPromise(getCategories)
    const categories = use(getCategoriesPromise)
    const [selectedCategory, setSelectedCategory] = useState<CategoryWithSubcategories>()

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

    return (
        <PageContainer className="">
            <View className="flex-1 gap-4">
                <StyledText>{JSON.stringify(filters)}</StyledText>
                <View>
                    <StyledText className="px-2 text-lg font-jakarta-bold">Categorias</StyledText>
                    <HorizontalListSelector
                        list={categories ?? []}
                        onSelect={selected => {
                            if (selectedCategory) {
                                if (selectedCategory.id === selected.id) {
                                    setSelectedCategory(undefined)
                                    setSubCategories([])
                                    removeFilter("category")
                                    removeFilter("subCategory")
                                } else {
                                    setSelectedCategory(selected)
                                    setSubCategories(selectedCategory.subcategories)
                                    addFilter("category", selected.id)
                                    removeFilter("subCategory")
                                }
                            } else {
                                setSelectedCategory(selected)
                                setSubCategories(selected.subcategories)
                                addFilter("category", selected.id)
                                removeFilter("subCategory")
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
                                    removeFilter("subCategory")
                                } else {
                                    setSelectedSubCategory(selected)
                                    addFilter("subCategory", selected.id)
                                }
                            } else {
                                setSelectedSubCategory(selected)
                                addFilter("subCategory", selected.id)
                            }
                        }}
                        selected={selectedSubCategory}
                        size="small"
                        labelExtractor={item => item.name}
                    />
                </View>
                <View className="gap-2">
                    <StyledText className="px-2 text-lg font-jakarta-bold">Ordenar por</StyledText>
                    <HorizontalListSelector
                        list={SORT_BY_OPTIONS ?? []}
                        onSelect={item => {
                            setOrderBy(item)
                            addFilter("orderBy", item.id)
                        }}
                        selected={orderBy}
                        labelExtractor={item => item.label}
                        size="large"
                    />
                </View>
                <MinimumRatingSlider
                    minimumRating={minimumRating}
                    setMinimumRating={value => {
                        setMinimumRating(value)
                        addFilter("minimumRating", value)
                    }}
                />
            </View>
            <View className="px-4">
                <StyledButton className="bg-secondary rounded-full p-4" onPress={() => {}}>
                    <StyledText className="font-jakarta-bold">Mostrar resultados</StyledText>
                </StyledButton>
            </View>
        </PageContainer>
    )
}
