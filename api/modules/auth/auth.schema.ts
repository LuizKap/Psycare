import { z } from 'zod'

const appointmentStatusSchema = z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED'])

const createUserSchema = z.object({

    email: z.email().trim().toLowerCase(),
    password: z.string().min(12).max(100).refine((value) => value.trim().length > 0,
    { error: 'A senha não pode conter apenas espaços' }

)})

const createPatientSchema = z.object({
    
    name: z.string().min(5).max(255).refine((value) => value.trim().length > 0,
    { error: 'O nome não pode conter apenas espaços' })

})

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

const appointmentIdSchema = z.object({
    id: z.uuid()
})

