import { z } from 'zod'

export const registerPatientSchema = z.object({
    name: z.string().min(5).max(200).trim().refine((value) => value.trim().length > 0,
        { error: 'O nome nao pode conter apenas espaços' }),
    email: z.email().trim().toLowerCase(),
    password: z.string().min(12).max(100).refine((value) => value.trim().length > 0, {
        error: 'A senha não pode conter apenas espaços'
    }),
    confirmPassword: z.string()
}).refine((
    data => data.password === data.confirmPassword), {
    error: 'As duas senhas devem ser iguais'
})

export const loginPatientSchema = z.object({
    email: z.email().trim().toLowerCase(),
    password: z.string().refine((value) => value.trim().length > 0, {
        error: 'A senha não pode conter apenas espaços'
    })
})



