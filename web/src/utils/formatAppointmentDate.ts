export function formatAppointmentDate(date: string) {
    const appointmentDate = new Date(date)

    const weekday = appointmentDate.toLocaleDateString("pt-BR", {
        weekday: "long",
        timeZone: "America/Sao_Paulo"
    })

    const time = appointmentDate.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Sao_Paulo"
    })

    return `${weekday}, ${time}`
}