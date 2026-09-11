import { z } from 'zod'

export const registerPatientSchema = z.object({

    name: z.string().trim().min(5).max(200).transform(value => value.replace(/\s+/g, ' ')),


    email: z.email().trim().toLowerCase(),

    phone: z.string().regex(/^\d{11}$/, 'Telefone inválido').optional(),

    password: z.string().min(12).max(100).refine((value) => value.trim().length > 0,
        { error: 'A senha não pode conter apenas espaços' }),


    confirmPassword: z.string().min(1, 'O campo não deve ser vazio')


}).refine((data => data.password === data.confirmPassword), { error: 'As duas senhas devem ser iguais' }).strict()


export const loginPatientSchema = z.object({

    email: z.email().trim().toLowerCase(),

    password: z.string().refine((value) => value.trim().length > 0, {
        error: 'A senha não pode conter apenas espaços'
    })

}).strict()

export const registerPsychologistSchema = z.object({

    name: z.string().trim().min(5).max(200).transform(value => value.replace(/\s+/g, ' ')),


    email: z.email().trim().toLowerCase(),


    password: z.string().min(12).max(100).refine((value) => value.trim().length > 0,
        { error: 'A senha não pode conter apenas espaços' }),

    confirmPassword: z.string(),

    phone: z.string().regex(/^\d{11}$/, 'Telefone inválido'),

    entryCode: z.string().trim().min(1, 'O código é obrigatório')

}).refine((data => data.password === data.confirmPassword), { error: 'As duas senhas devem ser iguais' }).strict()


export const loginPsychologistSchema = z.object({

    email: z.email().trim().toLowerCase(),

    password: z.string().refine((value) => value.trim().length > 0, {
        error: 'A senha não pode conter apenas espaços'
    }),

    entryCode: z.string().trim().min(1, 'O código é obrigatório')

}).strict()

