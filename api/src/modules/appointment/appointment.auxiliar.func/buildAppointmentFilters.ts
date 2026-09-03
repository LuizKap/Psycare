
import { Prisma } from "../../../generated/prisma/client.js";
import type { AppointmentFilters } from "../appointment.interface.js";



export function buildAppointmentWhere(filters: AppointmentFilters): Prisma.AppointmentWhereInput {

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

    if (filters.starts_at) where.starts_at = filters.starts_at

    if (filters.created_at) where.created_at = filters.created_at

    if (filters.notes === true) where.notes = { not: null }

    if (filters.notes === false) where.notes = null

    return where
}