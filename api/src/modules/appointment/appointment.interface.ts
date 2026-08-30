import type { Appointment } from "../../generated/prisma/client.js";

export interface IAppointmentRepository {

    findAllAppointments(): Promise<Appointment[]>

    findAppointmentByDate(starts_at: string): Promise<Appointment | null>

    createAppointment(appointment: Pick<Appointment, 'starts_at' | 'ends_at' | 'patient_id'>): Promise<Appointment>

    findAppointmentById(appointment: Appointment['id']): Promise<Appointment | null>

    findAppointmentsByPatientId(appointment: Appointment['patient_id']): Promise<Appointment[]>

}