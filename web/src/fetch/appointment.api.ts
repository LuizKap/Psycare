import type { Dayjs } from "dayjs"
import { ApiError, ApiValidationError, type ApiErrorResponse, type Appointment, type NextAppointment } from "../types"


export const appointment_api = {

    async getPatientAppointments(status?: Appointment['status']): Promise<Appointment[]> {

        const response = await fetch(`/api/appointments${status ? `?status=${status}` : ''}`)

        if (!response.ok) {
            const error = await response.json()

            throw new ApiError(error.message)
        }

        const appointments: Appointment[] = await response.json()

        return appointments
    }
    ,
    async getAvailability(date: Dayjs): Promise<string[]> {

        const response = await fetch(
            `/api/appointments/availability?date=${date.format('YYYY-MM-DD')}`
        );

        if (!response.ok) {
            const error = await response.json()
            throw new ApiError(error.message)
        }

        const times: string[] = await response.json()

        return times
    }
    ,
    async createAppointment(dateUTC: string) {

        const response = await fetch(
            '/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                starts_at: dateUTC
            })
        })

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()
            throw new ApiValidationError(error.message, error.errors)
        }

        const message: string = 'Consulta marcada com sucesso!'
        return message
    }
    ,
    async reschedule() {

    }
    ,
    async getFilteredAppointments() {

    }
    ,
    async updateNotes() {

    }
    ,
    async psychologistCancel() {

    }
    ,
    async patientCancel() {

    }
    ,
    async countTodayAppointments(): Promise<number> {
        const response = await fetch('/api/appointments/count/today')

        if (!response.ok) {
            const error = await response.json()
            throw new ApiError(error.message)
        }

        const count = await response.json()
        return count
    }
    ,
    async getNextAppointment(): Promise<NextAppointment | null> {
        const response = await fetch('/api/appointments/next')

        if (!response.ok) {
            const error = await response.json()
            throw new ApiError(error.message)
        }

        const appointment: NextAppointment = await response.json()
        return appointment
    }
    ,
    async getUpcomingAppointments(): Promise<NextAppointment[]> {
        const response = await fetch('/api/appointments/upcoming')

        if (!response.ok) {
            const error = await response.json()
            throw new ApiError(error.message)
        }

        const appointments: NextAppointment[] = await response.json()
        return appointments
    }
    ,
    async getPatientPreviousAppointments() {
        const response = await fetch('/api/appointments/previous')

        if (!response.ok) {
            const error = await response.json()
            throw new ApiError(error.message)
        }

        const appointments: Appointment[] = await response.json()
        return appointments
    }

}