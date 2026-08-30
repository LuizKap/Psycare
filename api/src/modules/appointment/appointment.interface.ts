import type { Appointment, Patient, User } from "../../generated/prisma/client.js";

export interface IAppointmentRepository {

    findAllAppointments(): Promise<Appointment[]>

    findAllAppointmentsByDate(startOfDay: Date, startOfNextDay: Date): Promise<Appointment[]>

    findAppointmentByDate(starts_at: Date): Promise<Appointment | null>

    createAppointment(appointment: Pick<Appointment, 'starts_at' | 'ends_at' | 'patient_id'>): Promise<Appointment>

    findAppointmentById(appointment: Appointment['id']): Promise<Appointment | null>

    findPatientByUserId(user_id: User['id']): Promise<Patient | null>

    findAllAppointmentsByPatientId(patient_id: Patient['id']): Promise<Appointment[]>

    findPatientById(id: Patient['id']): Promise<Patient | null> 

    findScheduledAppointmentByPatientId(patient_id: Patient['id']): Promise<Appointment | null>
}