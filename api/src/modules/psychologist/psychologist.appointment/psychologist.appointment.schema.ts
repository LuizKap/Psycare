import { z } from 'zod'

const updateAppointmentSchema = z.object({

    starts_at: z.iso.datetime().transform((value) => new Date(value)).optional(),
    ends_at: z.iso.datetime().transform((value) => new Date(value)).optional(),
    notes: z.string().optional().nullable()

})