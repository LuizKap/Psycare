import type { PrismaClient } from '../../generated/prisma/client.js';
import type { IAppointmentRepository } from './appointment.interface.js';
import type { Appointment, Patient } from '../../generated/prisma/client.js';
import {
    build_find_appointments_filters,
    type AppointmentFilters,
    type AppointmentPagination,
    type AppointmentSorting,
    type PaginationProperties
} from './appointment.auxiliar.func/buildAppointmentFilters.js';



export class AppointmentRepository implements IAppointmentRepository {
    constructor(private prisma: PrismaClient) { }

    async findAppointments(
        filters: AppointmentFilters,
        sorting: AppointmentSorting,
        pagination: AppointmentPagination)
        : Promise<{ appointments: Appointment[], pagination: PaginationProperties }> {

        const where = build_find_appointments_filters(filters)

        const totalItems = await this.prisma.appointment.count({
            where
        })

        const totalPages = Math.ceil(totalItems / pagination.limit)

        const appointments = await this.prisma.appointment.findMany({
            where,
            include: {
                patient:
                {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: { [sorting.sortBy]: sorting.sortOrder },
            skip: (pagination.page - 1) * pagination.limit,
            take: pagination.limit
        })

        return {
            appointments,
            pagination: {
                totalPages,
                totalItems,
                page: pagination.page,
                limit: pagination.limit
            }
        }
    }

    async findAppointmentByDate(starts_at: Date, excludeId?: Appointment['id']): Promise<Appointment | null> {

        return await this.prisma.appointment.findFirst({
            where: {
                starts_at,
                ...(excludeId && {
                    id: { not: excludeId }
                })
            }
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

    async findNextAppointment(): Promise<Appointment | null> {
        return await this.prisma.appointment.findFirst({
            where: {
                starts_at: {
                    gt: new Date()
                },
                status: 'SCHEDULED'
            },
            orderBy: {
                starts_at: 'asc'
            },
            include: {
                patient: {
                    select: { name: true }
                }
            }
        })
    }

    async findUpcomingAppointments(): Promise<Appointment[]> {
        return await this.prisma.appointment.findMany({
            where: {
                starts_at: { gt: new Date() },
                status: 'SCHEDULED'
            },
            orderBy: {
                starts_at: 'asc'
            },
            include: {
                patient: {
                    select: { name: true }
                }
            },
            take: 5
        })
    }

    async countUpcomingAppointmentsToday(now: Date, startOfNextDay: Date): Promise<number> {
        return await this.prisma.appointment.count({
            where: {
                starts_at: {
                    gte: now,
                    lt: startOfNextDay
                },
                status: 'SCHEDULED'
            }
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

    async findAppointmentsByPatientId(patient_id: Appointment['patient_id'], status?: Appointment['status']): Promise<Appointment[]> {
        return await this.prisma.appointment.findMany({
            where:
            {
                patient_id: patient_id,
                ...(status && { status })
            },
            orderBy: { starts_at: 'asc' }
        })
    }

    async findPreviousAppointmentsByPatientId(patient_id: Patient['id']): Promise<Appointment[]> {
        return await this.prisma.appointment.findMany({
            where: {
                patient_id,
                starts_at: { lt: new Date() }
            },
            orderBy: { starts_at: 'desc' }
        })
    }

    async updateFinishedAppointments(): Promise<number> {
        const result = await this.prisma.appointment.updateMany({
            where: {
                status: 'SCHEDULED',
                ends_at: {
                    lte: new Date()
                }
            },
            data: {
                status: 'COMPLETED'
            }
        })

        return result.count
    }

    async updateNotes(
        id: Appointment['id'],
        notes: Appointment['notes'] | null): Promise<Appointment> {

        return await this.prisma.appointment.update({
            where: { id },
            data: { notes }
        })
    }

    async reschedule(id: Appointment['id'], starts_at: Appointment['starts_at'], ends_at: Appointment['ends_at']
    ): Promise<Appointment> {
        return await this.prisma.appointment.update({
            where: { id },
            data: { starts_at, ends_at, rescheduled_at: new Date() }
        })
    }

    async cancelAppointment(id: Appointment['id']): Promise<Appointment> {
        return await this.prisma.appointment.update({
            where: { id },
            data: { status: 'CANCELLED' }
        })
    }

}