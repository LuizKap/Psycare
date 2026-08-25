import {z} from 'zod'

const appointmentStatusSchema = z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED'])

const createAppointmentSchema = z.object({

    starts_at: z.iso.datetime().transform((value) => new Date(value)),
    ends_at: z.iso.datetime().transform((value) => new Date(value))

}).refine((data) => data.ends_at > data.starts_at, {
    error: 'O horário de término deve ser posterior ao horário de início',
    path: ['ends_at']
})

const updateAppointmentSchema = z.object({

    starts_at: z.iso.datetime().transform((value) => new Date(value)).optional(),
    ends_at: z.iso.datetime().transform((value) => new Date(value)).optional(),
    notes: z.string().optional().nullable()

})

