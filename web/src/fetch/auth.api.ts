import { ApiError, ApiValidationError, type ApiErrorResponse, type User } from "../types"


export const auth_api = {

    async getAuthUser(): Promise<User | null> {
        const response = await fetch('/api/auth/me')

        if (!response.ok) {
            throw new ApiError('Erro ao buscar usuário autenticado')
        }

        const user: User | null = await response.json()

        return user
    },

    async registerPatient(formData: FormData) {

        const response = await fetch("/api/auth/register/patient", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirmPassword'),
                phone: formData.get('phone') || undefined
            })
        })

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()

            throw new ApiValidationError(error.message, error.errors)
        }

        const data: { user: User & { role: 'PATIENT' } } = await response.json()
        return data.user
    },

    async registerPsychologist(formData: FormData) {

        const response = await fetch('/api/auth/register/psychologist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirmPassword'),
                entryCode: formData.get('entryCode'),
                phone: formData.get('phone')
            })
        })

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()

            throw new ApiValidationError(error.message, error.errors)
        }

        const data: { user: User & { role: 'PSYCHOLOGIST' } } = await response.json()
        return data.user
    },

    async loginPatient(formData: FormData) {

        const response = await fetch("/api/auth/login/patient", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password')
            })
        })

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()

            throw new ApiValidationError(error.message, error.errors)
        }

        const data: { user: User & { role: 'PATIENT' } } = await response.json()
        return data.user

    },

    async loginPsychologist(formData: FormData) {
        const response = await fetch("/api/auth/login/psychologist", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
                entryCode: formData.get('entryCode')
            })
        })

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()

            throw new ApiValidationError(error.message, error.errors)
        }

        const data: { user: User & { role: 'PSYCHOLOGIST' } } = await response.json()
        return data.user
    },

    async logout(): Promise<string> {

        const response = await fetch('/api/auth/logout', { method: 'POST' })

        if (!response.ok) {
            const error = await response.json()
            throw new ApiError(error.message)
        }

        const {message} = await response.json()
        return message
    }


}