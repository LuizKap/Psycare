
import type { Patient, PrismaClient, User } from "../../generated/prisma/client.js";
import type { IPatientInterface } from "./patient.interface.js";


export class PatientRepository implements IPatientInterface {
    constructor(private prisma: PrismaClient) { }

    async findPatientById(id: Patient["id"]): Promise<Patient | null> {
        return await this.prisma.patient.findUnique({
            where: { id }
        })
    }

    async findPatientByUserId(user_id: User["id"]): Promise<Patient | null> {
        return await this.prisma.patient.findUnique({
            where: { user_id }
        })
    }
}