import { ScrollView } from "react-native"
import PageContainer from "../components/page-container"
import useFavoritesStore from "../stores/favorites-store"
import BusinessList from "../components/lists/business-list"

export default function FavoriteBusinessesPage() {
    const favoriteBusinesses = useFavoritesStore(state => state.getFavoriteBusinesses())
    const fetchedFavorites = useFavoritesStore(state => state.fetchedFavorites)

    return (
        <PageContainer className="">
            <ScrollView>
                <BusinessList list={favoriteBusinesses} isLoading={!fetchedFavorites} isCompact />
            </ScrollView>
        </PageContainer>
    )
}
