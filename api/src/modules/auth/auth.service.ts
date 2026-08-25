import z from "zod";
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import type { registerPatientSchema } from "./auth.schema.js";
import type { IAuthRepository, SessionData } from "./auth.interface.js";
import type { Patient, Session } from "../../generated/prisma/client.js";
import { HttpError } from "../errors/httpError.js";

type RegisterPatientData = z.infer<typeof registerPatientSchema>

export class AuthService {
    constructor(private authRepository: IAuthRepository) { }

    async registerPatient(patientData: RegisterPatientData): Promise<{ patient: Patient, token: Session['token'] }> {
        const { name, email, password } = patientData

        const existingPatient = await this.authRepository.findPatientByEmail(email)
        if (existingPatient) throw new HttpError(409, 'Esse email ja está cadastrado')

        const hashedPassword = await bcrypt.hash(password, 10)

        const patient = await this.authRepository.createPatientAccount({ name, email, password: hashedPassword })

        const token = crypto.randomBytes(32).toString('hex')
        const TEN_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 10
        const expires_at = new Date(Date.now() + TEN_DAYS_IN_MS)

        const sessionData: SessionData = { token, expires_at, user_id: patient.id, user_type: 'PATIENT' }
        const session = await this.authRepository.createSession(sessionData)

        return { patient, token }
    }
}