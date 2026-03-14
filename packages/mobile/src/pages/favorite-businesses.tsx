import { Suspense } from "react"
import { ScrollView } from "react-native"
import BusinessList from "../components/lists/business-list"
import SkeletonCardList from "../components/lists/skeleton-card-list"
import PageContainer from "../components/page-container"
import useFavoritesStore from "../stores/favorites-store"

export default function FavoriteBusinessesPage() {
    const getFavoriteBusinesses = useFavoritesStore(state => state.getFavoriteBusinesses)()

    return (
        <PageContainer className="">
            <ScrollView>
                <Suspense fallback={<SkeletonCardList />}>
                    <BusinessList list={getFavoriteBusinesses} isCompact />
                </Suspense>
            </ScrollView>
        </PageContainer>
    )
}
