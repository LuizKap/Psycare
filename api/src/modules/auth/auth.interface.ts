import type { Patient, Session, User, Psychologist } from '../../generated/prisma/client.js'

export interface IAuthRepository {

    createPatientAccount(
        userData: Pick<User, 'email' | 'password' | 'role'>,
        patientData: Pick<Patient, 'name' | 'phone'>,
        sessionData: Pick<Session, 'token' | 'expires_at' | 'user_type'>
    ): Promise<{ user: User, patient: Patient, session: Session }>

    createPsychologistAccount(
        userData: Pick<User, 'email' | 'password' | 'role'>,
        psychologistData: Pick<Psychologist, 'name' | 'phone'>,
        sessionData: Pick<Session, 'token' | 'expires_at' | 'user_type'>
    ): Promise<{ user: User, psychologist: Psychologist, session: Session }>

    createSession(sessionData: Pick<Session, 'token' | 'expires_at' | 'user_id' | 'user_type'>): Promise<Session>

    findUserById(id: User['id']): Promise<User | null>

    findUserByEmail(email: User['email']): Promise<User | null>

    findSessionByToken(sessionToken: Session['token']): Promise<Session | null>

    deleteSessionByToken(sessionToken: Session['token']): Promise<Session>

    deleteExpiredSessions(): Promise<number>
}