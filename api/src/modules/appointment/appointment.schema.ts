import { z } from 'zod'
import dayjs from './appointment.util.dayjs.js'

const dateRangeSchema = z.object({
    gte: z.iso.datetime().transform(value => new Date(value)),
    lt: z.iso.datetime().transform(value => new Date(value))
}).refine(
    data => data.gte < data.lt,
    {
        message: 'gte deve ser anterior a lt'
    }
)



export const createAppointmentSchema = z.object({

    starts_at: z.iso.datetime().transform((value) => new Date(value))
    
}).strict()

export const checkAvailabilitySchema = z.object({

    date: z.string().refine((value) => dayjs(value, 'YYYY-MM-DD', true).isValid(), 'Data inválida')
}).strict()

export const appointmentFilterSchema = z.object({
    patient_name: z.string().optional(),

    status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED']).optional(),

    notes: z.enum(['true', 'false']).optional().transform((value) => value === 'true'),

    created_at: dateRangeSchema.optional(),

    starts_at: dateRangeSchema.optional()
})

export const appointmentPaginationSchema = z.object({

    page: z.coerce.number().int().positive().optional(),

    limit: z.coerce.number().int().positive().max(20).optional()
})

export const appointmentSortingSchema = z.object({

    sortBy: z.enum(['starts_at', 'created_at']).optional(),

    sortOrder: z.enum(['asc', 'desc']).optional()

})

export const idSchema = z.object({
    id: z.string()
}).strict()

export const updateNotesSchema = z.object({

    notes: z.string().nullable()

}).strict()

export const rescheduleSchema = z.object({

    starts_at: z.iso.datetime().transform((value) => new Date(value))

}).strict()

