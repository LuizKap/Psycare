import type { Prisma } from "../../../generated/prisma/client.js";
import type { UpdatePatientData } from "../patient.schema.js";


export function build_update_patient_data(updateData: UpdatePatientData
): Prisma.PatientUpdateInput {

    const data: Prisma.PatientUpdateInput = {}

    if (updateData.name !== undefined) {
        data.name = updateData.name
    }

    if (updateData.phone !== undefined) {
        data.phone = updateData.phone
    }

    return data
}