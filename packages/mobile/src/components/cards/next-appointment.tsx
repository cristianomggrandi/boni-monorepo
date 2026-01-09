import api from "@/src/api/boni-api"
import { Prisma } from "@boni/database/dist/generated/prisma/client"
import Entypo from "@expo/vector-icons/Entypo"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Link } from "expo-router"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import StyledButton from "../styled/styled-button"
import StyledIcon from "../styled/styled-icon"
import StyledText from "../styled/styled-text"

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
        api.get("appointments/next/27")
            .then(response => {
                console.log("NEXT APPOINTMENT:", JSON.stringify(response.data))
                setNextAppointment(response.data)
            })
            .catch(err => console.log(err))
    }, [])

    if (!nextAppointment) return null

    const [date, time] = formatDate(nextAppointment.date.toString())

    return (
        <View className="gap-2 p-2 mt-2">
            <View className="flex-row items-center justify-between">
                <StyledText className="font-bold text-xl">Próximo agendamento</StyledText>
                <Link href="/(tabs)/calendar">
                    <StyledIcon>
                        <FontAwesome5 name="calendar-alt" size={20} color="black" />
                    </StyledIcon>
                </Link>
            </View>
            <View className="rounded-2xl bg-white elevation p-4 justify-center gap-2">
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
                    <StyledButton>
                        <Text className="font-semibold">Cancelar</Text>
                    </StyledButton>

                    <StyledButton className="bg-primary">
                        <Text className="font-semibold">Reagendar</Text>
                    </StyledButton>
                </View>
            </View>
        </View>
    )
}
