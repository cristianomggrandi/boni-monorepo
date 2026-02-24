import { Prisma } from "@boni/database/dist/generated/prisma/client"
import { FlashList } from "@shopify/flash-list"
import { Suspense, use } from "react"
import { Button, ScrollView, Text, View } from "react-native"
import api from "../api/boni-api"
import PageContainer from "../components/page-container"
import StyledText from "../components/styled/styled-text"
import useUserDependentPromise from "../hooks/use-user-dependent-promise"

type Booking = Prisma.AppointmentGetPayload<{ include: { business: true; services: true } }>

async function getBookings(): Promise<{
    upcoming: Array<Booking>
    finished: Array<Booking>
} | null> {
    try {
        const response = await api.get("appointments")

        return response.data
    } catch (error) {
        console.error("BOOKINGS ERROR:", error)
        return { upcoming: [], finished: [] }
    }
}

const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

function formatDate(dateString: string) {
    const date = new Date(dateString)
    const month = date.getMonth()
    const day = date.getDate()
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")

    return [day, meses[month], `${hours}:${minutes}`]
}

function BookingCard({ booking }: { booking: Booking }) {
    const [day, month, time] = formatDate(booking.date.toString())

    return (
        <View className="rounded-2xl bg-white elevation p-4 justify-center gap-2">
            <View className="flex-row gap-6 p-2">
                <View className="bg-gray-200 h-20 rounded-2xl aspect-square items-center justify-center">
                    <StyledText className="uppercase text-sm font-semibold text-gray-500 px-1">
                        {month}
                    </StyledText>
                    <StyledText className="text-2xl font-jakarta-bold">{day}</StyledText>
                </View>
                <View className="flex-col flex-1 justify-between">
                    <StyledText className="text-lg font-jakarta-bold">
                        {booking.services[0].name}
                        {booking.services.length > 1
                            ? " + " + (booking.services.length - 1).toString()
                            : null}
                    </StyledText>
                    <StyledText className="text-sm">
                        {time} · {booking.business.name}
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
            </View>
        </View>
    )
}

function BookingsList() {
    const getBookingsPromise = useUserDependentPromise(getBookings)

    const bookings = use(getBookingsPromise)

    // TODO:
    if (!bookings)
        return (
            <View>
                <StyledText>Realize seu primeiro agendamento!</StyledText>
                <Button title="Agendar" />
            </View>
        )

    return (
        <ScrollView className="flex-1 gap-4">
            <StyledText className="font-jakarta-bold text-xl p-2">Agendados</StyledText>
            <FlashList
                data={bookings.upcoming}
                renderItem={({ item }) => <BookingCard booking={item} />}
                keyExtractor={(item, index) => (item.id + 10 * index).toString()} // TODO: Voltar ao normal
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                ListEmptyComponent={
                    <View className="items-center justify-center">
                        <StyledText className="text-lg">
                            Você não possui nenhum agendamento
                        </StyledText>
                    </View>
                }
                ItemSeparatorComponent={() => <View className="h-2" />}
                contentContainerClassName="pt-2 pb-4 px-2"
            />
            <StyledText className="font-jakarta-bold text-xl p-2">Concluídos</StyledText>
            <FlashList
                data={bookings.finished}
                renderItem={({ item }) => <BookingCard booking={item} />}
                keyExtractor={(item, index) => (item.id + 10 * index).toString()} // TODO: Voltar ao normal
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                ListEmptyComponent={
                    <View className="items-center justify-center">
                        <StyledText className="text-lg">
                            Você não concluiu nenhum agendamento
                        </StyledText>
                    </View>
                }
                ItemSeparatorComponent={() => <View className="h-2" />}
                contentContainerClassName="pt-2 pb-4 px-2"
            />
        </ScrollView>
    )
}

export default function BookingsPage() {
    return (
        <PageContainer enableSafeSpace className="gap-2">
            <Suspense fallback={<Text>// TODO:</Text>}>
                <BookingsList />
            </Suspense>
        </PageContainer>
    )
}
