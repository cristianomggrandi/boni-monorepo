import { ScrollView } from "react-native"
import PageContainer from "../components/page-container"
import useFavoritesStore from "../stores/favorites-store"
import { BusinessList } from "./search"

export default function FavoriteBusinessesPage() {
    const favoriteBusinesses = useFavoritesStore(state => state.getFavoriteBusinesses())
    const favoriteServices = useFavoritesStore(state => state.getFavoriteServices())

    return (
        <PageContainer edges={["top", "left", "right", "bottom"]} className="gap-2 px-0">
            <ScrollView>
                <BusinessList list={favoriteBusinesses} isLoading={false} />
            </ScrollView>
        </PageContainer>
    )
}
