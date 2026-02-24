import { FlatList } from "react-native"
import PageContainer from "../components/page-container"
import useFavoritesStore from "../stores/favorites-store"
import { ServiceCard } from "./business"

export default function FavoriteServicesPage() {
    const favoriteServices = useFavoritesStore(state => state.getFavoriteServices())

    return (
        <PageContainer edges={["top", "left", "right", "bottom"]} className="gap-2 px-0">
            <FlatList
                data={favoriteServices}
                renderItem={({ item }) => <ServiceCard service={item} />}
                // TODO: Key
                keyExtractor={(item, index) => (item.id + 10 * index).toString()}
            />
        </PageContainer>
    )
}
