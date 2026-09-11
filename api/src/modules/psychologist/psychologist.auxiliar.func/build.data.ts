import type { Prisma } from "../../../generated/prisma/client.js"
import type { updatePsychologistData } from "../psychologist.schema.js"

export function build_update_psychologist_data(updateData: updatePsychologistData
): Prisma.PsychologistUpdateInput {

    const data: Prisma.PsychologistUpdateInput = {}

    if (updateData.name !== undefined) {
        data.name = updateData.name
    }

    if (updateData.phone !== undefined) {
        data.phone = updateData.phone
    }

    return data
}