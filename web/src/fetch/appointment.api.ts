import { ApiError, type Appointment, type NextAppointment } from "../types"


export const appointment_api = {

    async getPatientAppointments(): Promise<Appointment[]> {

        const response = await fetch('/api/appointments')

        if (!response.ok) {
            const error = await response.json()

            throw new ApiError(error.message)
        }

        const appointments: Appointment[] = await response.json()

        return appointments
    }
    ,
    async getPatientScheduledAppointments(): Promise<Appointment[]> {

        const response = await fetch('/api/appointments/scheduled/patient')

        if (!response.ok) {
            const error = await response.json()
            throw new ApiError(error.message)
        }

        const scheduledAppointments: Appointment[] = await response.json()

        return scheduledAppointments
    }
    ,
    async getAvailability(): Promise<string[]> {

        const response = await fetch('/api/appointments/availability')

        if (!response.ok) {
            const error = await response.json()
            throw new ApiError(error.message)
        }

        const times: string[] = await response.json()

        return times
    }
    ,
    async createAppointment() {

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

}