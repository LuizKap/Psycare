import { PrismaClient, Patient } from '../../src/generated/prisma/client'
import { IAuthRepository, CreatePatientData } from './auth.interface.js'

export class AuthRepository implements IAuthRepository {
    constructor(private prisma: PrismaClient) { }

    async createPatientAccount(userData: CreatePatientData): Promise<Patient> {
        await this.prisma.
    }


}