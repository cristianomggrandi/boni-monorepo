import { ScrollView } from "react-native"
import BusinessList from "../components/lists/business-list"
import PageContainer from "../components/page-container"
import useFavoritesStore from "../stores/favorites-store"

export default function FavoriteBusinessesPage() {
    const favoriteBusinesses = useFavoritesStore(state => state.getFavoriteBusinesses())
    const isLoadingFavorites = useFavoritesStore(state => state.isLoadingFavorites)

    return (
        <PageContainer className="">
            <ScrollView>
                <BusinessList list={favoriteBusinesses} isLoading={isLoadingFavorites} isCompact />
            </ScrollView>
        </PageContainer>
    )
}
