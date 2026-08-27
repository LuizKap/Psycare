import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import type { IAuthRepository } from "./auth.interface.js";
import type { Patient, Session } from "../../generated/prisma/client.js";
import { HttpError } from "../errors/HttpError.js";

export class AuthService {
    constructor(private authRepository: IAuthRepository) { }

    async register(patientData: Pick<Patient, 'name' | 'email' | 'password'>): Promise<{ patient: Patient, token: Session['token'] }> {

        const { name, email, password } = patientData


        const existingPatient = await this.authRepository.findPatientByEmail(email)
        if (existingPatient) throw new HttpError(409, 'Esse email ja está cadastrado')


        const hashedPassword = await bcrypt.hash(password, 10)

        const patient = await this.authRepository.createPatientAccount({
            name,
            email,
            password: hashedPassword
        })

        const token = crypto.randomBytes(32).toString('hex')
        const TEN_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 10
        const expires_at = new Date(Date.now() + TEN_DAYS_IN_MS)

        const sessionData: Pick<Session, 'token' | 'expires_at' | 'user_id' | 'user_type'> = {
            token,
            expires_at,
            user_id: patient.id,
            user_type: 'PATIENT'
        }

        await this.authRepository.createSession(sessionData)
        return { patient, token }
    }

    async login(patientData: Pick<Patient, 'email' | 'password'>): Promise<{ patient: Patient, token: Session['token'] }> {

        const { email, password } = patientData

        const patient = await this.authRepository.findPatientByEmail(email)
        if (!patient) throw new HttpError(401, 'Email ou senha inválidos')


        const isValidPassword = await bcrypt.compare(password, patient.password)
        if (!isValidPassword) throw new HttpError(401, 'Email ou senha inválidos')


        const token = crypto.randomBytes(32).toString('hex')
        const TEN_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 10
        const expires_at = new Date(Date.now() + TEN_DAYS_IN_MS)

        const sessionData: Pick<Session, 'token' | 'expires_at' | 'user_id' | 'user_type'> = {
            token,
            expires_at,
            user_id: patient.id,
            user_type: 'PATIENT'
        }

        await this.authRepository.createSession(sessionData)
        return { patient, token }
    }

    async logout(token: Session['token']): Promise<void> {
        const session = await this.authRepository.findSessionByToken(token)
        if (!session) throw new HttpError(404, 'Sessão não encontrada')

        await this.authRepository.deleteSession(token)
    }
}