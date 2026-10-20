
import { Prisma } from "../../../generated/prisma/client.js";
import type { Appointment } from "../../../generated/prisma/client.js";




export type AppointmentFilters = {
    patient_name?: string | undefined

    status?: Appointment['status'] | undefined

    notes?: boolean | undefined

    starts_at?: {
        gte?: Date | undefined;
        lt?: Date | undefined;
    } | undefined

    created_at?: {
        gte?: Date | undefined;
        lt?: Date | undefined;
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

export type PaginationProperties = {
    totalPages: number
    totalItems: number
    page: number
    limit: number
}

export function build_find_appointments_filters(filters: AppointmentFilters): Prisma.AppointmentWhereInput {

    const where: Prisma.AppointmentWhereInput = {}


    if (filters.patient_name) {
        where.patient = {
            name:
            {
                startsWith: filters.patient_name,
                mode: 'insensitive'
            }
        }
    }

    if (filters.status) where.status = filters.status

    if (filters.starts_at) {
        where.starts_at = {}

        if (filters.starts_at.gte) {
            where.starts_at.gte = filters.starts_at.gte
        }

        if (filters.starts_at.lt) {
            where.starts_at.lt = filters.starts_at.lt
        }
    }

    if (filters.created_at) {
        where.created_at = {}

        if (filters.created_at.gte) {
            where.created_at.gte = filters.created_at.gte
        }

        if (filters.created_at.lt) {
            where.created_at.lt = filters.created_at.lt
        }
    }

    if (filters.notes === true) where.notes = { not: null }

    if (filters.notes === false) where.notes = null

    return where
}

