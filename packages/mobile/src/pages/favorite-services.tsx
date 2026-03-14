import { Service } from "@boni/database/dist/generated/prisma/client"
import { Suspense, use } from "react"
import { ScrollView } from "react-native"
import ServiceList from "../components/lists/service-list"
import SkeletonCardList from "../components/lists/skeleton-card-list"
import PageContainer from "../components/page-container"
import useFavoritesStore from "../stores/favorites-store"

function Services({ favoriteServicesPromise }: { favoriteServicesPromise: Promise<Service[]> }) {
    const favoriteServices = use(favoriteServicesPromise)

    return <ServiceList list={favoriteServices} isCompact />
}

export default function FavoriteServicesPage() {
    const getFavoriteServices = useFavoritesStore(state => state.getFavoriteServices)()

    return (
        <PageContainer className="">
            <ScrollView>
                <Suspense fallback={<SkeletonCardList />}>
                    <Services favoriteServicesPromise={getFavoriteServices} />
                </Suspense>
            </ScrollView>
        </PageContainer>
    )
}
