import api from "@/src/api/boni-api"
import { Prisma } from "@boni/database/dist/generated/prisma/client"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import { Link, useRouter } from "expo-router"
import { use } from "react"
import { Pressable, View } from "react-native"
import StyledIcon from "../styled/styled-icon"
import StyledText from "../styled/styled-text"

const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

function formatDate(dateString: string) {
    const date = new Date(dateString)
    const month = date.getMonth()
    const day = date.getDate()
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")

    return [day, meses[month], `${hours}:${minutes}`]
}

async function getNextAppointment(): Promise<Prisma.AppointmentGetPayload<{
    include: { services: true; business: true; worker: { include: { user: true } } }
}> | null> {
    try {
        const response = await api.get("appointments/next")

        return response.data
    } catch (error) {
        console.error("APPOINTMENT ERROR:", error)
        return null
    }
}

const nextAppointmentPromise = getNextAppointment()

export default function NextAppointment() {
    const router = useRouter()
    const nextAppointment = use(nextAppointmentPromise)

    if (!nextAppointment) return null

    const [day, month, time] = formatDate(nextAppointment.date.toString())

    return (
        <Pressable className="gap-2 p-2 mt-2" onPress={() => router.push("/business/1")}>
            <View className="flex-row items-center justify-between">
                <StyledText className="font-jakarta-bold text-xl">Próximo agendamento</StyledText>
                <Link href="/bookings">
                    <StyledIcon>
                        <FontAwesome5 name="calendar-alt" size={20} color="black" />
                    </StyledIcon>
                </Link>
            </View>
            <View className="rounded-2xl bg-white elevation p-4 justify-center gap-2">
                <View className="flex-row gap-6 p-2">
                    <View className="bg-gray-200 rounded-2xl aspect-square items-center justify-center">
                        <StyledText className="uppercase text-sm font-semibold text-gray-500 px-1">
                            {month}
                        </StyledText>
                        <StyledText className="text-2xl font-jakarta-bold">{day}</StyledText>
                    </View>
                    <View className="flex-col flex-1">
                        <StyledText className="text-lg font-jakarta-bold">
                            {nextAppointment.services[0].name}
                        </StyledText>
                        <StyledText className="text-sm">
                            {time} · {nextAppointment.worker.user.name}
                        </StyledText>
                        <View className="flex-row mt-2">
                            <StyledText className="font-semibold uppercase text-3xl/3 text-secondary">
                                ·
                            </StyledText>
                            <StyledText className="font-semibold text-sm uppercase px-1">
                                Confirmado
                            </StyledText>
                        </View>
                    </View>
                    <View className="justify-center">
                        <StyledIcon className="bg-secondary">
                            {/* <Feather name="map" size={24} color="black" /> */}
                            <FontAwesome name="map" size={24} color="black" />
                        </StyledIcon>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}
