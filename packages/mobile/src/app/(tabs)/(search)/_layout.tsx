import { RouterBackButton, StackPageHeader } from "@/src/components/page-header"
import StyledText from "@/src/components/styled/styled-text"
import useSearchFiltersParams from "@/src/stores/search-filters-params-store"
import { Stack } from "expo-router"
import { Pressable } from "react-native"

export default function SearchLayout() {
    const resetFilters = useSearchFiltersParams(s => s.resetFilters)

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerShadowVisible: false,
                header: StackPageHeader,
                headerLeft: () => <RouterBackButton />,
            }}
        >
            <Stack.Screen name="index" options={{}} />
            <Stack.Screen
                name="search-filters"
                options={{
                    title: "Filtros",
                    headerRight: () => (
                        <Pressable onPress={resetFilters}>
                            <StyledText className="font-semibold text-sm">Limpar</StyledText>,
                        </Pressable>
                    ),
                }}
            />
        </Stack>
    )
}
