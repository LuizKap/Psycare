import type { PrismaClient } from '../../generated/prisma/client.js'
import type { IAuthRepository } from './auth.interface.js'
import type { Patient, Session, User } from '../../generated/prisma/client.js'

export class AuthRepository implements IAuthRepository {
    constructor(private prisma: PrismaClient) { }

    async createPatientAccount(
        userData: Pick<User, 'email' | 'password' | 'role'>,
        patientData: Pick<Patient, 'name'>,
        sessionData: Pick<Session, 'token' | 'expires_at' | 'user_type'>
    ): Promise<{ user: User, patient: Patient, session: Session }> {

        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: userData
            })

            const patient = await tx.patient.create({
                data: {
                    ...patientData,
                    user_id: user.id
                }
            })

            const session = await tx.session.create({
                data: {
                    ...sessionData,
                    user_id: user.id
                }
            })

            return { user, patient, session }
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