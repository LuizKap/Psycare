import dayjs from "../appointment.util.dayjs.js"

// Verifica se a data foi marcada em um final de semana
//  se o horário está dentro da regra de 9:00 - 21:00
// E se a consulta é marcada pelo menos uma hora antes

export const isValidAppointmentDate = (starts_at: Date): boolean => {
    const now = dayjs().tz('America/Sao_Paulo')
    const appointmentDate = dayjs(starts_at).tz('America/Sao_Paulo')

    const hour = appointmentDate.hour()
    const day = appointmentDate.day()

    const isWeekend = [0, 6].includes(day)

    return (
        appointmentDate.isSameOrAfter(now.add(1, 'hour')) &&
        !isWeekend &&
        hour >= 9 &&
        hour <= 21 &&
        appointmentDate.minute() === 0 &&
        appointmentDate.second() === 0
    )
}