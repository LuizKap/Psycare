import type { Patient, Session } from '../../generated/prisma/client.js'

export type PatientData = Pick<Patient, 'email' | 'password' | 'name'>
export type SessionData = Pick<Session, 'user_id' | 'user_type' | 'token' | 'expires_at'>

export interface IAuthRepository {

    createPatientAccount(patientData: PatientData): Promise<Patient>

    createSession(sessionData: SessionData): Promise<Session>

    findPatientByEmail(patientEmail: PatientData['email']): Promise<Patient | null>
}