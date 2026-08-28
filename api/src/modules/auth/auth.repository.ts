import type { PrismaClient } from '../../generated/prisma/client.js'
import type { IAuthRepository } from './auth.interface.js'
import type { Patient, Session, User, Psychologist } from '../../generated/prisma/client.js'

export class AuthRepository implements IAuthRepository {
    constructor(private prisma: PrismaClient) { }

    async createUser(userData: Pick<User, 'email' | 'password' | 'role'>): Promise<User> {
        return this.prisma.user.create({
            data: userData
        })
    }

    async createPatient(patientData: Pick<Patient, 'name' | 'user_id'>): Promise<Patient> {
        return this.prisma.patient.create({
            data: patientData
        })
    }

    async createSession(sessionData: Pick<Session, 'token' | 'expires_at' | 'user_id' | 'user_type'>): Promise<Session> {
        return this.prisma.session.create({
            data: sessionData
        })
    }

    async findUserById(id: User['id']): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id }
        })
    }

    async findUserByEmail(email: User['email']): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email }
        })
    }

    async findPatientByUserId(userId: User['id']): Promise<Patient | null> {
        return this.prisma.patient.findUnique({
            where: { user_id: userId }
        })
    }

    async findPatientById(patientId: Patient['id']): Promise<Patient | null> {
        return this.prisma.patient.findUnique({
            where: { id: patientId }
        })
    }

    async findPsychologistByUserId(id: User['id']): Promise<Psychologist | null> {
        return this.prisma.psychologist.findUnique({
            where: { id }
        })
    }

    async findSessionByToken(sessionToken: Session['token']): Promise<Session | null> {
        return this.prisma.session.findUnique({
            where: { token: sessionToken }
        })
    }

    async deleteSessionByToken(sessionToken: Session['token']): Promise<Session> {
        return this.prisma.session.delete({
            where: { token: sessionToken }
        })
    }

}