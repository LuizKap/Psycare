import type { Appointment, Patient } from "../../generated/prisma/client.js";
import type { AppointmentFilters, AppointmentPagination, AppointmentSorting, PaginationProperties, UpdateAppointmentData } from "./appointment.auxiliar.func/buildAppointmentFilters.js";


export interface IAppointmentRepository {

    findAppointments(
        filters: AppointmentFilters,
        sorting: AppointmentSorting,
        pagination: AppointmentPagination): Promise<
            {
                appointments: Appointment[],
                pagination: PaginationProperties
            }>

    findAllAppointmentsByDate(startOfDay: Date, startOfNextDay: Date): Promise<Appointment[]>

    findAppointmentByDate(starts_at: Date, excludeId?: Appointment['id']): Promise<Appointment | null>

    createAppointment(appointment: Pick<Appointment, 'starts_at' | 'ends_at' | 'patient_id'>): Promise<Appointment>

    findAppointmentById(appointment: Appointment['id']): Promise<Appointment | null>

    findAllAppointmentsByPatientId(patient_id: Patient['id']): Promise<Appointment[]>

    findScheduledAppointmentByPatientId(patient_id: Patient['id']): Promise<Appointment | null>

    updateFinishedAppointments(): Promise<number>

    updateAppointment(
        id: Appointment['id'],
        updateData: UpdateAppointmentData,
        ends_at: Appointment['ends_at']
    ): Promise<Appointment>

    cancelAppointment(id: Appointment['id']): Promise<Appointment>
}