import {
    createMaterialTopTabNavigator,
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs"
import { ParamListBase, TabNavigationState } from "@react-navigation/native"
import { withLayoutContext } from "expo-router"

const { Navigator } = createMaterialTopTabNavigator()

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator)

export default function FavoritesLayout() {
    return (
        <MaterialTopTabs screenOptions={{ tabBarIndicatorStyle: { backgroundColor: "#D2DB76" } }}>
            <MaterialTopTabs.Screen name="businesses" options={{ title: "Estabelecimentos" }} />
            <MaterialTopTabs.Screen name="services" options={{ title: "Serviços" }} />
        </MaterialTopTabs>
    )
}
