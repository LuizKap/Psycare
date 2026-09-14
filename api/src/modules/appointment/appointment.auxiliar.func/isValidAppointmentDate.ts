import dayjs from "../appointment.util.dayjs.js"

// Verifica se a data foi marcada em um final de semana
//  se o horário está dentro da regra de 9:00 - 21:00
// E se a consulta é marcada pelo menos uma hora antes

export const validateAppointmentDate = (starts_at: Date): string | null => {
    const now = dayjs().tz('America/Sao_Paulo')
    const appointmentDate = dayjs(starts_at).tz('America/Sao_Paulo')

    const hour = appointmentDate.hour()
    const day = appointmentDate.day()

    if (appointmentDate.isBefore(now.add(1, 'hour')))
        return 'A consulta deve ser agendada com pelo menos 1 hora de antecedência'

    if ([0, 6].includes(day))
        return 'Consultas não podem ser agendadas aos finais de semana'

    if (hour < 9 || hour > 21)
        return 'O horário da consulta deve estar entre 09:00 e 21:00'

    if (appointmentDate.minute() !== 0 || appointmentDate.second() !== 0)
        return 'A consulta deve ser agendada em uma hora cheia'

    return null
}