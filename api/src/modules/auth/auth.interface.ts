import type { Patient, Psychologist, Session, User } from '../../generated/prisma/client.js'

export interface IAuthRepository {

    createUser(userData: Pick<User, 'email' | 'password' | 'role'>): Promise<User>

    createPatient(patientData: Pick<Patient, 'name' | 'user_id'>): Promise<Patient>

    createSession(sessionData: Pick<Session, 'token' | 'expires_at' | 'user_id' | 'user_type'>): Promise<Session>

    findUserById(id: User['id']): Promise<User | null>

    findUserByEmail(email: User['email']): Promise<User | null>

    findPatientByUserId(userId: User['id']): Promise<Patient | null>

    findPatientById(patientId: Patient['id']): Promise<Patient | null>

    findPsychologistByUserId(id: User['id']): Promise<Psychologist | null>

    findSessionByToken(sessionToken: Session['token']): Promise<Session | null>

    deleteSessionByToken(sessionToken: Session['token']): Promise<Session>
}