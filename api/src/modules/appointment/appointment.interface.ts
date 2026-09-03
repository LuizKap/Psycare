import type { Appointment, Patient } from "../../generated/prisma/client.js";


export type AppointmentFilters = {

    status?: Appointment['status'] | undefined

    notes?: boolean | undefined

    starts_at?: {
        gte: Date;
        lt: Date;
    } | undefined

    created_at?: {
        gte: Date;
        lt: Date;
    } | undefined
}

export type AppointmentSorting = {
    sortBy: 'starts_at' | 'created_at'
    sortOrder: 'asc' | 'desc'
}

export type AppointmentPagination = {
    page: number
    limit: number
}

export interface IAppointmentRepository {

    findAppointments(
        filters: AppointmentFilters,
        sorting: AppointmentSorting,
        pagination: AppointmentPagination)
        : Promise<Appointment[]>

    findAllAppointmentsByDate(startOfDay: Date, startOfNextDay: Date): Promise<Appointment[]>

    findAppointmentByDate(starts_at: Date): Promise<Appointment | null>

    createAppointment(appointment: Pick<Appointment, 'starts_at' | 'ends_at' | 'patient_id'>): Promise<Appointment>

    findAppointmentById(appointment: Appointment['id']): Promise<Appointment | null>

    findAllAppointmentsByPatientId(patient_id: Patient['id']): Promise<Appointment[]>

    findScheduledAppointmentByPatientId(patient_id: Patient['id']): Promise<Appointment | null>
}