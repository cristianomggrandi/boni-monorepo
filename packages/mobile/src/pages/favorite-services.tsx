import { ScrollView } from "react-native"
import ServiceList from "../components/lists/service-list"
import PageContainer from "../components/page-container"
import useFavoritesStore from "../stores/favorites-store"

export default function FavoriteServicesPage() {
    const favoriteServices = useFavoritesStore(state => state.getFavoriteServices())
    const fetchedFavorites = useFavoritesStore(state => state.fetchedFavorites)

    return (
        <PageContainer className="">
            <ScrollView>
                <ServiceList list={favoriteServices} isLoading={!fetchedFavorites} isCompact />
            </ScrollView>
        </PageContainer>
    )
}
