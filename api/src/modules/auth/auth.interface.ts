import type { Patient, Session } from '../../generated/prisma/client.js'

export type PatientData = Pick<Patient, 'email' | 'password' | 'name'>
export type SessionData = Pick<Session, 'user_id' | 'user_type' | 'token' | 'expires_at'>

export interface IAuthRepository {

    createPatientAccount(patientData: Pick<Patient, 'email' | 'password' | 'name'>): Promise<Patient>

    createSession(sessionData: Pick<Session, 'token' | 'expires_at' | 'user_id' | 'user_type'>): Promise<Session>

    findPatientByEmail(patientEmail: Patient['email']): Promise<Patient | null>

    findPatientById(patientId: Patient['id']): Promise<Patient | null>

    findSessionByToken(sessionToken: Session['token']): Promise<Session | null>

    deleteSession(sessionToken: Session['token']): Promise<Session>
}