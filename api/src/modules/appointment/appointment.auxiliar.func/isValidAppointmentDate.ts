import dayjs from "../appointment.util.dayjs.js"

export const isValidAppointmentDate = (starts_at: Date): boolean => {
    const appointmentDate = dayjs(starts_at).tz('America/Sao_Paulo')

    const hour = appointmentDate.hour()

    return (
        hour >= 9 &&
        hour <= 21 &&
        appointmentDate.minute() === 0 &&
        appointmentDate.second() === 0
    )
}