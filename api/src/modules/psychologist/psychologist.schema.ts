import z from 'zod'

export const updatePsychologistSchema = z.object({

    name: z.string().trim().min(5).max(200).transform(value => value.replace(/\s+/g, ' ')).optional(),

    phone: z.string().regex(/^\d{11}$/, 'Telefone inválido').optional()

}).refine(({ name, phone }) => name !== undefined || phone !== undefined,
    'Você deve mandar pelo menos um dado a ser alterado')

export type updatePsychologistData = z.infer<typeof updatePsychologistSchema>