import { ApiError, ApiValidationError, type ApiErrorResponse, type Psychologist } from "../types"


export const psychologist_api = {

    async getProfile(): Promise<Psychologist> {

        const response = await fetch('/psychologist/me')

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()
            throw new ApiError(error.message)
        }

        const psychologist: Psychologist = await response.json()

        return psychologist
    },

    async updateProfile(formData: FormData): Promise<string> {

        const response = await fetch("/psychologist", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.get('name'),
                phone: formData.get('phone')
            })
        })

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()
            throw new ApiValidationError(error.message, error.errors)
        }

        const data: { psychologist: Psychologist, message: string } = await response.json()
        return data.message
    }
}