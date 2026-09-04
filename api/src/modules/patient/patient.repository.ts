
import type { Patient, PrismaClient, User } from "../../generated/prisma/client.js";
import { build_update_patient_data} from "./patient.auxiliar.func/build.data.js";
import type { IPatientRepository } from "./patient.interface.js";
import type { UpdatePatientData } from "./patient.schema.js";


export class PatientRepository implements IPatientRepository {
    constructor(private prisma: PrismaClient) { }

    async findPatientById(id: Patient["id"]): Promise<Patient | null> {
        return await this.prisma.patient.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        email: true
                    }
                }
            }
        })
    }

    async findPatientByUserId(user_id: User["id"]): Promise<Patient | null> {
        return await this.prisma.patient.findUnique({
            where: { user_id }
        })
    }

    async updatePatient(id: Patient['id'], updateData: UpdatePatientData): Promise<Patient> {
        const data = build_update_patient_data(updateData)

        return await this.prisma.patient.update({
            where: { id },
            data
        })
    }
}