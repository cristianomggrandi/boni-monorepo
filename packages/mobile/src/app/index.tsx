import api from "@/src/api/boni-api"
import type { Appointment } from "@boni/database"
import Entypo from "@expo/vector-icons/Entypo"
import Feather from "@expo/vector-icons/Feather"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useEffect, useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const meses = [
    "Jan.",
    "Fev.",
    "Mar.",
    "Abr.",
    "Mai.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Set.",
    "Out.",
    "Nov.",
    "Dez.",
]

function formatDate(dateString?: string) {
    if (!dateString) return [null, null]

    const date = new Date(dateString)
    const month = date.getMonth()
    const day = date.getDate()
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")

    return [`${day} de ${meses[month]}`, `${hours}:${minutes}`]
}

export default function Index() {
    const [nextAppointment, setNextAppointment] = useState<Appointment | null>(null)
    const [date, time] = formatDate(nextAppointment?.date)

    useEffect(() => {
        api.get("appointments/next/11")
            .then(response => {
                console.log("NEXT APPOINTMENT:", JSON.stringify(response.data))
                setNextAppointment(response.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-pink-50">
            <View className="m-6 p-2 rounded-2xl bg-primary flex-row items-center justify-center">
                <Feather name="search" size={24} color="black" className="px-4" />
                <TextInput className="flex-1" placeholder="Busque pelo que você precisa" />
            </View>
            <View className="border-primary rounded-2xl bg-white border-hairline m-6 p-4 justify-center gap-2">
                <View className="flex-row gap-2">
                    <View className="flex-1 flex-row gap-2">
                        <View className="bg-gray-200 rounded-full aspect-square items-center justify-center">
                            <Entypo name="calendar" size={24} color="#9ca3af" />
                        </View>
                        <View className="flex-col">
                            <Text className="font-bold">{nextAppointment?.services[0].name}</Text>
                            <Text className="text-sm">
                                {nextAppointment?.services[0].description}
                            </Text>
                        </View>
                    </View>
                    <View className="items-end">
                        <View className="bg-lime-300 p-1 rounded-xl">
                            <Text className="font-semibold text-sm uppercase px-1">Confirmado</Text>
                        </View>
                    </View>
                </View>
                <View className="flex-row items-center gap-2">
                    <Entypo name="calendar" size={12} color="black" />
                    <Text className="text-sm">{date}</Text>
                    <Text className="text-sm">·</Text>
                    <MaterialCommunityIcons name="clock" size={12} color="black" />
                    <Text className="text-sm">{time}</Text>
                </View>
                <View className="flex-row gap-2">
                    <Pressable className="p-2  flex-1 bg-white text-gray-500 items-center justify-center border-hairline rounded-xl border-gray-500">
                        <Text className="font-semibold">Cancelar</Text>
                    </Pressable>

                    <Pressable className="p-2  flex-1 bg-primary text-gray-500 items-center justify-center rounded-xl">
                        <Text className="font-semibold">Reagendar</Text>
                    </Pressable>
                </View>
            </View>
            <Text></Text>
            {/* <ScrollView horizontal bounces={true} showsHorizontalScrollIndicator={false}>
                    <View className="flex-row gap-2 px-2">
                        <View className="w-16 h-16 items-center justify-center rounded-full border-white border-2">
                            <Text className="text-xs text-white">Hair</Text>
                        </View>
                        <View className="w-16 h-16 items-center justify-center rounded-full border-white border-2">
                            <Text className="text-xs text-white">Nails</Text>
                        </View>
                        <View className="w-16 h-16 items-center justify-center rounded-full border-white border-2">
                            <Text className="text-xs text-white">Makeup</Text>
                        </View>
                        <View className="w-16 h-16 items-center justify-center rounded-full border-white border-2">
                            <Text className="text-xs text-white">Massage</Text>
                        </View>
                        <View className="w-16 h-16 items-center justify-center rounded-full border-white border-2">
                            <Text className="text-xs text-white">Eyebrows</Text>
                        </View>
                        <View className="w-16 h-16 items-center justify-center rounded-full border-white border-2">
                            <Text className="text-xs text-white">Colorist</Text>
                        </View>
                        <View className="w-16 h-16 items-center justify-center rounded-full border-white border-2">
                            <Text className="text-xs text-white">Colorist</Text>
                        </View>
                    </View>
                </ScrollView> */}

            <View>
                <View>
                    <Text>Estabelecimento 1</Text>
                </View>
                <View>
                    <Text>Estabelecimento 2</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
