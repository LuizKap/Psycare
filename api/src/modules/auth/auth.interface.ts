import type { Patient, Session, User } from '../../generated/prisma/client.js'

export interface IAuthRepository {

    createPatientAccount(
        userData: Pick<User, 'email' | 'password' | 'role'>,
        patientData: Pick<Patient, 'name'>,
        sessionData: Pick<Session, 'token' | 'expires_at' | 'user_type'>
    ): Promise<{ user: User, patient: Patient, session: Session }>

    createSession(sessionData: Pick<Session, 'token' | 'expires_at' | 'user_id' | 'user_type'>): Promise<Session>

    findUserById(id: User['id']): Promise<User | null>

    findUserByEmail(email: User['email']): Promise<User | null>

    findPatientByUserId(userId: User['id']): Promise<Patient | null>

    findPatientById(patientId: Patient['id']): Promise<Patient | null>

    findSessionByToken(sessionToken: Session['token']): Promise<Session | null>

    deleteSessionByToken(sessionToken: Session['token']): Promise<Session>
}