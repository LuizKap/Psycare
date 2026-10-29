import { ApiError, ApiValidationError, type ApiErrorResponse, type Patient } from "../types"


export const patient_api = {

    async getProfile(): Promise<Patient> {
        const response = await fetch('/api/patient/me')

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()

            if (error.errors && error.errors.length > 0) {
                throw new ApiValidationError(error.message, error.errors)
            }

            throw new ApiError(error.message)
        }

        const patient: Patient = await response.json()

        return patient
    },

    async countPatients(): Promise<number> {
        const response = await fetch('/api/patient/count')

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()

            if (error.errors && error.errors.length > 0) {
                throw new ApiValidationError(error.message, error.errors)
            }

            throw new ApiError(error.message)
        }

        const count = await response.json()
        return count
    },

    async updatePatient(name?: string, phone?: string | null) {

        const response = await fetch("/api/patient", {
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

        const data: { patient: Patient, message: string } = await response.json()
        return data
    }

}