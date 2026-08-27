import { PrismaClient } from '../../generated/prisma/client.js'
import type { IAuthRepository } from './auth.interface.js'
import type { Patient, Session } from '../../generated/prisma/client.js'

export class AuthRepository implements IAuthRepository {
    constructor(private prisma: PrismaClient) { }

    async createPatientAccount(patientData: Pick<Patient, 'name' | 'email' | 'password'>): Promise<Patient> {
        return this.prisma.patient.create({
            data: patientData
        })
    }

    async createSession(sessionData: Pick<Session, 'token' | 'expires_at' | 'user_id' | 'user_type'>): Promise<Session> {
        return this.prisma.session.create({
            data: sessionData
        })
    }

    async findPatientByEmail(patientEmail: Patient['email']): Promise<Patient | null> {
        return this.prisma.patient.findUnique({
            where: { email: patientEmail }
        })
    }

    async findPatientById(patientId: Patient['id']): Promise<Patient | null> {
        return this.prisma.patient.findUnique({
            where: { id: patientId }
        })
    }

    async findSessionByToken(sessionToken: Session['token']): Promise<Session | null> {
        return this.prisma.session.findUnique({
            where: { token: sessionToken }
        })
    }

    async deleteSession(sessionToken: Session['token']): Promise<Session> {
        return this.prisma.session.delete({
            where: { token: sessionToken }
        })
    }

}