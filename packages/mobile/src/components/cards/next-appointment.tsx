import api from "@/src/api/boni-api"
import { Prisma } from "@boni/database/dist/generated/prisma/client"
import Entypo from "@expo/vector-icons/Entypo"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useEffect, useState } from "react"
import { Pressable, Text, View } from "react-native"

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

function formatDate(dateString: string) {
    const date = new Date(dateString)
    const month = date.getMonth()
    const day = date.getDate()
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")

    return [`${day} de ${meses[month]}`, `${hours}:${minutes}`]
}

export default function NextAppointment() {
    const [nextAppointment, setNextAppointment] = useState<Prisma.AppointmentGetPayload<{
        include: { services: true; business: true }
    }> | null>(null)

    useEffect(() => {
        api.get("appointments/next/11")
            .then(response => {
                console.log("NEXT APPOINTMENT:", JSON.stringify(response.data))
                setNextAppointment(response.data)
            })
            .catch(err => console.log(err))
    }, [])

    if (!nextAppointment) return null

    const [date, time] = formatDate(nextAppointment.date.toString())

    return (
        <View className="border-primary rounded-2xl bg-white border-hairline m-6 p-4 justify-center gap-2">
            <View className="flex-row gap-2">
                <View className="flex-1 flex-row gap-2">
                    <View className="bg-gray-200 rounded-full aspect-square items-center justify-center">
                        <Entypo name="calendar" size={24} color="#9ca3af" />
                    </View>
                    <View className="flex-col">
                        <Text className="font-bold">{nextAppointment?.services[0].name}</Text>
                        <Text className="text-sm">{nextAppointment?.services[0].description}</Text>
                    </View>
                </View>
                <View className="items-end">
                    <View className="bg-secondary p-1 rounded-xl">
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
                <Pressable className="p-2 flex-1 bg-white text-gray-500 items-center justify-center border-hairline rounded-xl border-gray-500">
                    <Text className="font-semibold">Cancelar</Text>
                </Pressable>

                <Pressable className="p-2 flex-1 bg-primary text-gray-500 items-center justify-center rounded-xl">
                    <Text className="font-semibold">Reagendar</Text>
                </Pressable>
            </View>
        </View>
    )
}
