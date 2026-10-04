

export const patient_api = {

    async countPatients(): Promise<number> {
        const response = await fetch('/patient/count')

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }

        const count = await response.json()
        return count
    }

}