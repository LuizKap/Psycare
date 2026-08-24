import type { Patient } from '../../src/generated/prisma/client'

export interface CreatePatientData {
    email: string,
    password: string
    name: string
}

export interface IAuthRepository {

    createPatientAccount(PatientData: CreatePatientData): Promise<Patient>

}