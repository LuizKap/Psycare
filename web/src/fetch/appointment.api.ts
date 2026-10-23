import type { Dayjs } from "dayjs"
import {
    ApiError,
    ApiValidationError,
    type ApiErrorResponse,
    type Appointment,
    type AppointmentFilter,
    type AppointmentPagination,
    type AppointmentSorting,
    type FilteredAppointments,
    type NextAppointment
} from "../types"


export const appointment_api = {

    async getPatientAppointments(status?: Appointment['status']): Promise<Appointment[]> {

        const response = await fetch(`/api/appointments${status ? `?status=${status}` : ''}`)

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()

            if (error.errors && error.errors.length > 0) {
                throw new ApiValidationError(error.message, error.errors)
            }

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
            const error: ApiErrorResponse = await response.json()

            if (error.errors && error.errors.length > 0) {
                throw new ApiValidationError(error.message, error.errors)
            }

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

            if (error.errors && error.errors.length > 0) {
                throw new ApiValidationError(error.message, error.errors)
            }

            throw new ApiError(error.message)
        }

        const message: string = 'Consulta marcada com sucesso!'
        return message
    }
    ,
    async reschedule() {

    }
    ,
    async getFilteredAppointments(
        filter: AppointmentFilter,
        sorting: AppointmentSorting,
        pagination: AppointmentPagination
    ) {

        const params = new URLSearchParams()

        if (filter.patient_name) params.set('patient_name', filter.patient_name);

        if (filter.status) params.set('status', filter.status);

        if (filter.notes !== undefined) params.set('notes', String(filter.notes));

        if (filter.starts_at?.gte) params.set('starts_at[gte]', filter.starts_at.gte.toISOString());

        if (filter.starts_at?.lt) params.set('starts_at[lt]', filter.starts_at.lt.toISOString());

        if (filter.created_at?.gte) params.set('created_at[gte]', filter.created_at.gte.toISOString());

        if (filter.created_at?.lt) params.set('created_at[lt]', filter.created_at.lt.toISOString());


        // Sorting

        if (sorting.sortBy) params.set('sortBy', sorting.sortBy)

        if (sorting.sortOrder) params.set('sortOrder', sorting.sortOrder)

        // Pagination

        if (pagination.page) params.set('page', String(pagination.page))

        if (pagination.limit) params.set('limit', String(pagination.limit))

        const response = await fetch(
            `/api/appointments/filter?${params.toString()}`
        )

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()

            if (error.errors && error.errors.length > 0) {
                throw new ApiValidationError(error.message, error.errors)
            }

            throw new ApiError(error.message)
        }

        const filteredAppointments: FilteredAppointments = await response.json()

        return filteredAppointments
    }
    ,
    async updateNotes(id: Appointment['id'], notes: Appointment['notes']) {

        const response = await fetch(`/api/appointments/${id}/notes`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                notes
            })
        })

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()

            if (error.errors && error.errors.length > 0) {
                throw new ApiValidationError(error.message, error.errors)
            }

            throw new ApiError(error.message)
        }

        const {updatedAppointment, message}  = await response.json()
        return {updatedAppointment, message}
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
            const error: ApiErrorResponse = await response.json()

            if (error.errors && error.errors.length > 0) {
                throw new ApiValidationError(error.message, error.errors)
            }

            throw new ApiError(error.message)
        }

        const count = await response.json()
        return count
    }
    ,
    async getNextAppointment(): Promise<NextAppointment | null> {
        const response = await fetch('/api/appointments/next')

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()

            if (error.errors && error.errors.length > 0) {
                throw new ApiValidationError(error.message, error.errors)
            }

            throw new ApiError(error.message)
        }

        const appointment: NextAppointment = await response.json()
        return appointment
    }
    ,
    async getUpcomingAppointments(): Promise<NextAppointment[]> {
        const response = await fetch('/api/appointments/upcoming')

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()

            if (error.errors && error.errors.length > 0) {
                throw new ApiValidationError(error.message, error.errors)
            }

            throw new ApiError(error.message)
        }

        const appointments: NextAppointment[] = await response.json()
        return appointments
    }
    ,
    async getPatientPreviousAppointments() {
        const response = await fetch('/api/appointments/previous')

        if (!response.ok) {
            const error: ApiErrorResponse = await response.json()

            if (error.errors && error.errors.length > 0) {
                throw new ApiValidationError(error.message, error.errors)
            }

            throw new ApiError(error.message)
        }

        const appointments: Appointment[] = await response.json()
        return appointments
    }

}