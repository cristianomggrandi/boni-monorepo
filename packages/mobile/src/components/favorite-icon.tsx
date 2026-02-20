import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Pressable } from "react-native"
import StyledIcon from "./styled/styled-icon"

export default function FavoriteIcon({
    isFavorite,
    handleFavoriteToggle,
}: {
    isFavorite: boolean
    handleFavoriteToggle: () => void
}) {
    return (
        <Pressable onPress={handleFavoriteToggle}>
            <StyledIcon>
                {isFavorite ? (
                    <MaterialCommunityIcons name="cards-heart" size={24} color="black" />
                ) : (
                    <MaterialCommunityIcons name="cards-heart-outline" size={24} color="black" />
                )}
            </StyledIcon>
        </Pressable>
    )
}
