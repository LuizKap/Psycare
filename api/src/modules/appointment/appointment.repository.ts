import type { PrismaClient } from '../../generated/prisma/client.js';
import type { AppointmentFilters, AppointmentPagination, AppointmentSorting, IAppointmentRepository } from './appointment.interface.js';
import type { Appointment, Patient } from '../../generated/prisma/client.js';
import { buildAppointmentWhere } from './appointment.auxiliar.func/buildAppointmentFilters.js';



export class AppointmentRepository implements IAppointmentRepository {
    constructor(private prisma: PrismaClient) { }

    async findAppointments(
        filters: AppointmentFilters,
        sorting: AppointmentSorting,
        pagination: AppointmentPagination): Promise<Appointment[]> {

        const where = buildAppointmentWhere(filters)

        const orderBy = {
            [sorting.sortBy]: sorting.sortOrder
        }

        const skip = (pagination.page - 1) * pagination.limit
        const take = pagination.limit


        return await this.prisma.appointment.findMany({
            where,
            orderBy,
            skip,
            take
        })
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


    async findScheduledAppointmentByPatientId(patient_id: Patient['id']): Promise<Appointment | null> {
        return await this.prisma.appointment.findFirst({
            where: {
                patient_id,
                status: 'SCHEDULED'
            }
        })
    }

}