const moneyFormatter = Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })

export function formatMoney(price: number) {
    return moneyFormatter.format(price / 100)
}

export function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (!hours) return `${mins}min`

    return `${hours}h${mins}min`
}
