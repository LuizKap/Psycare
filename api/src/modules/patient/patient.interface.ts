import type {Patient, User} from '../../generated/prisma/client.js'

export interface IPatientRepository {
    
    findPatientById(patientId: Patient['id']): Promise<Patient | null>

    findPatientByUserId(userId: User['id']): Promise<Patient | null>
}