import dayjs from "../appointment.util.dayjs.js";

export function isAtLeast24HoursBefore(starts_at: Date) {
    const now = dayjs().tz('America/Sao_Paulo')
    const appointmentDate = dayjs(starts_at).tz('America/Sao_Paulo')

    return appointmentDate.isSameOrAfter(now.add(24, 'hours'))
}