import type { PrismaClient, Psychologist } from '../../generated/prisma/client.js'
import type { IAuthRepository } from './auth.interface.js'
import type { Patient, Session, User } from '../../generated/prisma/client.js'

export class AuthRepository implements IAuthRepository {
    constructor(private prisma: PrismaClient) { }

    async createPatientAccount(
        userData: Pick<User, 'email' | 'password' | 'role'>,
        patientData: Pick<Patient, 'name' | 'phone'>,
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

    async createPsychologistAccount(
        userData: Pick<User, 'email' | 'password' | 'role'>,
        psychologistData: Pick<Psychologist, 'name' | 'phone'>,
        sessionData: Pick<Session, 'token' | 'expires_at' | 'user_type'>

    ): Promise<{
        user: User,
        psychologist: Psychologist,
        session: Session
    }> {

        return this.prisma.$transaction(async (tx) => {

            const user = await tx.user.create({
                data: userData
            })

            const psychologist = await tx.psychologist.create({
                data: {
                    ...psychologistData,
                    user_id: user.id
                }
            })

            const session = await tx.session.create({
                data: {
                    ...sessionData,
                    user_id: user.id
                }
            })

            return { user, psychologist, session }
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

    async deleteExpiredSessions(): Promise<number> {
    const result = await this.prisma.session.deleteMany({
        where: {
            expires_at: {
                lte: new Date()
            }
        }
    })

    return result.count
}

}