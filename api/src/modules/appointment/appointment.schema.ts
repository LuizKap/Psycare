import { z } from 'zod'
import dayjs from './appointment.util.dayjs.js'

const dateRangeSchema = z.object({
    gte: z.iso.datetime({
        message: 'Data inicial inválida'
    }).transform(value => new Date(value)),

    lt: z.iso.datetime({
        message: 'Data final inválida'
    }).transform(value => new Date(value))
}).refine(
    data => data.gte < data.lt,
    {
        message: 'A data inicial deve ser anterior à data final'
    }
)


export const createAppointmentSchema = z.object({

    starts_at: z.iso.datetime({
        message: 'Data e hora de início da consulta inválidas'
    }).transform(value => new Date(value))

}).strict()


export const checkAvailabilitySchema = z.object({

    date: z.string().refine(
        value => dayjs(value, 'YYYY-MM-DD', true).isValid(),
        'Data inválida'
    )

}).strict()


export const appointmentFilterSchema = z.object({

    patient_name: z.string({
        message: 'Nome do paciente inválido'
    }).optional(),

    status: z.enum(
        ['SCHEDULED', 'COMPLETED', 'CANCELLED'],
        {
            message: 'Status de consulta inválido'
        }
    ).optional(),

    notes: z.enum(
        ['true', 'false'],
        {
            message: 'O filtro de notas deve ser true ou false'
        }
    ).optional().transform(value => value === 'true'),

    created_at: dateRangeSchema.optional(),

    starts_at: dateRangeSchema.optional()

})


export const appointmentPaginationSchema = z.object({

    page: z.coerce.number({
        message: 'Página inválida'
    }).int({
        message: 'A página deve ser um número inteiro'
    }).positive({
        message: 'A página deve ser maior que zero'
    }).optional(),

    limit: z.coerce.number({
        message: 'Limite inválido'
    }).int({
        message: 'O limite deve ser um número inteiro'
    }).positive({
        message: 'O limite deve ser maior que zero'
    }).max(20, {
        message: 'O limite máximo é 20'
    }).optional()

})


export const appointmentSortingSchema = z.object({

    sortBy: z.enum(
        ['starts_at', 'created_at'],
        {
            message: 'Campo de ordenação inválido'
        }
    ).optional(),

    sortOrder: z.enum(
        ['asc', 'desc'],
        {
            message: 'Ordem de ordenação inválida'
        }
    ).optional()

})


export const idSchema = z.object({

    id: z.string({
        message: 'ID inválido'
    })

}).strict()


export const updateNotesSchema = z.object({

    notes: z.string().nullable()

}).strict()


export const rescheduleSchema = z.object({

    starts_at: z.iso.datetime({
        message: 'Data e hora de início da consulta inválidas'
    }).transform(value => new Date(value))

}).strict()


export const getPatientAppointmentsQuerySchema = z.object({

    status: z.enum(
        ['COMPLETED', 'SCHEDULED', 'CANCELLED'],
        {
            message: 'Status de consulta inválido'
        }
    ).optional()

}).strict()