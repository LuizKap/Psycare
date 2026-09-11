import type { PrismaClient, Psychologist, User } from "../../generated/prisma/client.js";
import { build_update_psychologist_data } from "./psychologist.auxiliar.func/build.data.js";
import type { IPsychologistRepository } from "./psychologist.interface.js";
import type { updatePsychologistData } from "./psychologist.schema.js";

export class PsychologistRepository implements IPsychologistRepository {

    constructor(private prisma: PrismaClient) { }

    async findPsychologistByUserId(id: User['id']): Promise<Psychologist | null> {
        return this.prisma.psychologist.findUnique({
            where: { user_id: id }
        })
    }

    async findPsychologists(): Promise<Psychologist[]> {
        return this.prisma.psychologist.findMany()
    }

    async findPsychologist(id: Psychologist['id']): Promise<Psychologist | null> {
        return this.prisma.psychologist.findUnique({
            where: { id }
        })
    }

    updatePsychologist(id: Psychologist['id'], updateData: updatePsychologistData): Promise<Psychologist> {
        const data = build_update_psychologist_data(updateData)
        
        return this.prisma.psychologist.update({
            where: { id },
            data
        })
    }
}