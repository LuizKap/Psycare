import { ApiError, type ApiErrorResponse, type Patient } from "../types"


export const patient_api = {

    async getProfile(): Promise<Patient> {
        const response = await fetch('/api/patient/me')

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()
            throw new ApiError(error.message)
        }

        const patient: Patient = await response.json()

        return patient
    },

    async countPatients(): Promise<number> {
        const response = await fetch('/api/patient/count')

        if (!response.ok) {
            const error = await response.json()
            throw new ApiError(error.message)
        }

        const count = await response.json()
        return count
    }

}