import { BusinessCategory } from "@boni/database/dist/generated/prisma/client"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import Slider from "@react-native-community/slider"
import { use, useLayoutEffect, useState } from "react"
import { FlatList, Pressable, View } from "react-native"
import CategoryList from "../components/category-list"
import PageContainer from "../components/page-container"
import StyledButton from "../components/styled/styled-button"
import StyledText from "../components/styled/styled-text"
import useUserDependentPromise from "../hooks/use-user-dependent-promise"
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

function MinimumRatingSlider({ minimumRating, setMinimumRating }: any) {
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
    const [orderBy, setOrderBy] = useState(SORT_BY_OPTIONS[0])
    const [minimumRating, setMinimumRating] = useState(0)

    const getCategoriesPromise = useUserDependentPromise(getCategories)
    const categories = use(getCategoriesPromise)
    const [selectedCategory, setSelectedCategory] = useState<CategoryWithSubcategories>()

    const [subCategories, setSubCategories] = useState<BusinessCategory[]>([])
    const [selectedSubCategory, setSelectedSubCategory] = useState<BusinessCategory>()

    useLayoutEffect(() => {
        if (selectedCategory) {
            setSubCategories(selectedCategory.subcategories)
            // getSubCategories(selectedCategory.id).then(setSubCategories).catch(console.log)

            // addFilter("category", selectedCategory.id.toString())
        } else {
            // removeFilter("category")
            setSubCategories([])
        }

        setSelectedSubCategory(undefined)
    }, [selectedCategory])

    useLayoutEffect(() => {
        if (selectedSubCategory) {
            // addFilter("category", selectedSubCategory.id.toString())
        } else if (selectedCategory) {
            // addFilter("category", selectedCategory.id.toString())
        } else {
            // removeFilter("category")
        }
    }, [selectedSubCategory])

    return (
        <PageContainer className="">
            <View className="flex-1 gap-4">
                <View>
                    <StyledText className="px-2 text-lg font-jakarta-bold">Categorias</StyledText>
                    <CategoryList
                        categories={categories ?? []}
                        onSelect={(selected: CategoryWithSubcategories) =>
                            selectedCategory?.id === selected.id
                                ? setSelectedCategory(undefined)
                                : setSelectedCategory(selected)
                        }
                        selectedCategory={selectedCategory}
                    />
                    <CategoryList
                        categories={subCategories}
                        onSelect={(selected: BusinessCategory) =>
                            selectedSubCategory?.id === selected.id
                                ? setSelectedSubCategory(undefined)
                                : setSelectedSubCategory(selected)
                        }
                        selectedCategory={selectedSubCategory}
                        size="small"
                    />
                </View>
                <View className="gap-2">
                    <StyledText className="px-2 text-lg font-jakarta-bold">Ordenar por</StyledText>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={SORT_BY_OPTIONS}
                        extraData={orderBy?.id}
                        keyExtractor={item => item.id.toString()}
                        contentContainerClassName="gap-2 p-1"
                        renderItem={({ item }) => {
                            const isSelected = item.id === orderBy?.id
                            return (
                                <Pressable
                                    key={item.id}
                                    className={`
                                        py-2 px-4 rounded-full active:bg-secondary elevation
                                        ${isSelected ? "bg-secondary" : "bg-white border-gray-300"}
                                    `}
                                    onPress={() => setOrderBy(item)}
                                >
                                    <StyledText className={`text-lg`}>{item.label}</StyledText>
                                </Pressable>
                            )
                        }}
                    />
                </View>
                <MinimumRatingSlider
                    minimumRating={minimumRating}
                    setMinimumRating={setMinimumRating}
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
