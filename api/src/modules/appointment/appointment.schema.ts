import { z } from 'zod'
import dayjs from './appointment.util.dayjs.js'


const appointmentStatusSchema = z.enum(['SCHEDULED', 'COMPLETED', 'IN_PROGRESS'])

const createAppointmentSchema = z.object({
    starts_at: z.iso.datetime().transform((value) => new Date(value))
})

export const checkAvailabilitySchema = z.object({
    date: z.string().refine((value) => dayjs(value, 'YYYY-MM-DD', true).isValid(), 'Data inválida')
}).strict()

