import type {Patient, User} from '../../generated/prisma/client.js'
import type { UpdatePatientData } from './patient.schema.js'


export interface IPatientRepository {
    
    findPatientById(patientId: Patient['id']): Promise<Patient | null>

    findPatientByUserId(userId: User['id']): Promise<Patient | null>

    updatePatient(id: Patient['id'], updateData: UpdatePatientData): Promise<Patient>
}