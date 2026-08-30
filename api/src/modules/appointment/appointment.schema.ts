import { z } from 'zod'
import dayjs from './appointment.util.dayjs.js'

export const createAppointmentSchema = z.object({
    starts_at: z.iso.datetime().transform((value) => new Date(value))
})

export const checkAvailabilitySchema = z.object({
    date: z.string().refine((value) => dayjs(value, 'YYYY-MM-DD', true).isValid(), 'Data inválida')
}).strict()

