import dayjs from '../utils/dayjs'

export function formatAppointmentDate(date: string) {
    return dayjs(date)
        .tz("America/Sao_Paulo")
        .format("dddd, HH:mm")
}