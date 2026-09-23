import { z } from 'zod'

export const registerPatientSchema = z.object({

    name: z.string()
        .trim()
        .min(5, 'O nome deve ter pelo menos 5 caracteres')
        .max(200, 'O nome não deve ter mais que 200 caracteres')
        .transform(value => value.replace(/\s+/g, ' ')),


    email: z.email({ error: 'Digite um email válido' })
        .trim()
        .toLowerCase(),

    phone: z.string()
        .regex(/^\d{11}$/, 'Telefone inválido')
        .optional(),

    password: z.string()
        .min(12, 'A senha deve ter no minimo 12 caracteres')
        .max(100, 'A senha não deve ter mais que 100 caracteres').refine((value) => value.trim().length > 0,
            { error: 'A senha não pode conter apenas espaços' }),


    confirmPassword: z.string().min(1, 'O campo não deve ser vazio')


}).refine((data => data.password === data.confirmPassword), {

    error: 'As duas senhas devem ser iguais',
    path: ['confirmPassword']

}).strict()


export const loginPatientSchema = z.object({

    email: z.email({ error: 'Digite um email válido' })
        .trim()
        .toLowerCase(),

    password: z.string().refine((value) => value.trim().length > 0, {
        error: 'A senha não pode conter apenas espaços'
    })

}).strict()

export const registerPsychologistSchema = z.object({

    name: z.string()
        .trim()
        .min(5, 'O nome deve ter pelo menos 5 caracteres')
        .max(200, 'O nome não deve ter mais que 200 caracteres')
        .transform(value => value.replace(/\s+/g, ' ')),


    email: z.email({ error: 'Digite um email válido' })
        .trim()
        .toLowerCase(),


    password: z.string()
        .min(12, 'A senha deve ter no minimo 12 caracteres')
        .max(100, 'A senha não deve ter mais que 100 caracteres').refine((value) => value.trim().length > 0,
            { error: 'A senha não pode conter apenas espaços' }),

    confirmPassword: z.string().min(1, 'O campo não deve ser vazio'),

    phone: z.string().regex(/^\d{11}$/, 'Telefone inválido'),

    entryCode: z.string().trim().min(1, 'O código é obrigatório')

}).refine((data => data.password === data.confirmPassword), {

    error: 'As duas senhas devem ser iguais',
    path: ['confirmPassword']

}).strict()


export const loginPsychologistSchema = z.object({

    email: z.email({ error: 'Digite um email válido' }).trim().toLowerCase(),

    password: z.string().refine((value) => value.trim().length > 0, {
        error: 'A senha não pode conter apenas espaços'
    }),

    entryCode: z.string().trim().min(1, 'O código é obrigatório')

}).strict()

