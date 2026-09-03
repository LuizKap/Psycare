import type z from "zod";
import { Prisma } from "../../../generated/prisma/client.js";
import type { appointmentFilterSchema } from "../appointment.schema.js";


export function buildAppointmentWhere(filters: z.infer<typeof appointmentFilterSchema>): Prisma.AppointmentWhereInput {

    const where: Prisma.AppointmentWhereInput = {}

    if (filters.status) where.status = filters.status

    if (filters.starts_at) where.starts_at = filters.starts_at

    if (filters.created_at) where.created_at = filters.created_at

    if (filters.notes === true) where.notes = { not: null }

    if (filters.notes === false) where.notes = null

    return where
}