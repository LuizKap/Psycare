import { PrismaClient } from '../../generated/prisma/client.js'
import type { IAuthRepository } from './auth.interface.js'
import type { Patient, Session } from '../../generated/prisma/client.js'
import type { PatientData, SessionData } from './auth.interface.js'

export class AuthRepository implements IAuthRepository {
    constructor(private prisma: PrismaClient) { }

    async createPatientAccount(patientData: PatientData): Promise<Patient> {
        return this.prisma.patient.create({
            data: patientData
        })
    }

    async createSession(sessionData: SessionData): Promise<Session> {
        return this.prisma.session.create({
            data: sessionData
        })
    }

    async findPatientByEmail(patientEmail: PatientData['email']): Promise<Patient | null> {
        return this.prisma.patient.findUnique({
            where: { email: patientEmail }
        })
    }

}