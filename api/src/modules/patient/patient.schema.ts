import { z } from 'zod'

export const updatePatientSchema = z.object({

    name: z.string().min(5).max(200).refine((value) => value.trim().length > 0,
        { error: 'O nome nao pode conter apenas espaços' }).optional(),

    phone: z.string().regex(/^\d{11}$/, 'Telefone inválido').nullable().optional()
}).refine(
    data => data.name !== undefined || data.phone !== undefined,
    {
        message: 'Você deve mandar pelo menos um dado a ser alterado'
    })

export type UpdatePatientData = z.infer<typeof updatePatientSchema>