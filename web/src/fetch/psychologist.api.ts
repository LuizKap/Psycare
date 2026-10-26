import { ApiError, ApiValidationError, type ApiErrorResponse, type Psychologist } from "../types"


export const psychologist_api = {

    async getProfile(): Promise<Psychologist> {

        const response = await fetch('/api/psychologist/me')

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()

            if (error.errors && error.errors.length > 0) {
                throw new ApiValidationError(error.message, error.errors)
            }

            throw new ApiError(error.message)
        }

        const psychologist: Psychologist = await response.json()

        return psychologist
    },

    async updateProfile(name?: string, phone?: string): Promise<{ psychologist: Psychologist, message: string }> {

        const response = await fetch("/api/psychologist", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                phone
            })
        })

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()

            if (error.errors && error.errors.length > 0) {
                throw new ApiValidationError(error.message, error.errors)
            }

            throw new ApiError(error.message)
        }

        const data: { psychologist: Psychologist, message: string } = await response.json()
        return data
    },

    async getPublicProfile(): Promise<Pick<Psychologist, 'name' | 'phone'>> {

        const response = await fetch('/api/psychologist/about')

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()

            if (error.errors && error.errors.length > 0) {
                throw new ApiValidationError(error.message, error.errors)
            }

            throw new ApiError(error.message)
        }

        const { name, phone }: Pick<Psychologist, 'name' | 'phone'> = await response.json()

        return { name, phone }
    }

}