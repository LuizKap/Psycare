import type { PrismaClient, Psychologist, User } from "../../generated/prisma/client.js";

export class PsychologistRepository {
    constructor(private prisma: PrismaClient) { }

    async findPsychologistByUserId(id: User['id']): Promise<Psychologist | null> {
        return this.prisma.psychologist.findUnique({
            where: { user_id: id }
        })
    }

    async findPsychologist(): Promise<Psychologist[]> {
        return this.prisma.psychologist.findMany()
    }
}