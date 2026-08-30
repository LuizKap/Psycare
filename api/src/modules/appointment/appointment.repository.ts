import type { PrismaClient } from '../../generated/prisma/client.js';
import type { IAppointmentRepository } from './appointment.interface.js';
import type { Appointment, Patient, User } from '../../generated/prisma/client.js';

export class AppointmentRepository implements IAppointmentRepository {
    constructor(private prisma: PrismaClient) { }

    async findAllAppointments(): Promise<Appointment[]> {
        return await this.prisma.appointment.findMany()
    }

    async findAppointmentByDate(starts_at: Date): Promise<Appointment | null> {
        return await this.prisma.appointment.findUnique({
            where: { starts_at }
        })
    }

    async findAllAppointmentsByDate(startOfDay: Date, startOfNextDay: Date): Promise<Appointment[]> {
        return await this.prisma.appointment.findMany({
            where: {
                starts_at: {
                    gte: startOfDay,
                    lt: startOfNextDay
                }
            },

        })
    }

    async createAppointment(appointment: Pick<Appointment, 'starts_at' | 'ends_at' | 'patient_id'>): Promise<Appointment> {
        return await this.prisma.appointment.create({
            data: appointment
        })
    }

    async findAppointmentById(id: Appointment['id']): Promise<Appointment | null> {
        return await this.prisma.appointment.findUnique({
            where: { id }
        })
    }

    async findAllAppointmentsByPatientId(patient_id: Appointment['patient_id']): Promise<Appointment[]> {
        return await this.prisma.appointment.findMany({
            where: { patient_id: patient_id },
            orderBy: { starts_at: 'asc' }
        })
    }

    async findPatientByUserId(user_id: User['id']): Promise<Patient | null> {
        return await this.prisma.patient.findUnique({
            where: { user_id }
        })
    }

    async findPatientById(id: Patient['id']): Promise<Patient | null> {
        return await this.prisma.patient.findUnique({
            where: { id }
        })
    }

    async findScheduledAppointmentByPatientId(patient_id: Patient['id']): Promise<Appointment | null> {
        return await this.prisma.appointment.findFirst({
            where: {
                patient_id,
                status: 'SCHEDULED'
            }
        })
    }

}