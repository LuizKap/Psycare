import bcrypt from 'bcrypt'
import type { IAuthRepository } from "./auth.interface.js";
import type { Patient, Psychologist, Session, User } from "../../generated/prisma/client.js";
import { HttpError } from "../errors/HttpError.js";
import type { IPatientRepository } from '../patient/patient.interface.js';
import { generateSessionData } from './auth.auxiliar.func.js';
import type { IPsychologistRepository } from '../psychologist/psychologist.interface.js';


export class AuthService {
    constructor(
        private authRepository: IAuthRepository,
        private patientRepository: IPatientRepository,
        private psychologistRepository: IPsychologistRepository
    ) { }

    async registerPatient(registerData: Pick<Patient, 'name' | 'phone'> & Pick<User, 'email' | 'password'>): Promise<{ patient: Patient, user: User, token: Session['token'] }> {

        const { name, email, password, phone } = registerData

        const foundUser = await this.authRepository.findUserByEmail(email)
        if (foundUser) throw new HttpError(409, 'Esse email ja está cadastrado')

        const hashedPassword = await bcrypt.hash(password, 10)

        const { token, expires_at, user_type } = generateSessionData('PATIENT')

        const { patient, user, session } = await this.authRepository.createPatientAccount(
            { email, password: hashedPassword, role: user_type },
            { name, phone },
            { token, expires_at, user_type }
        )

        return { user, patient, token: session.token }
    }

    async loginPatient(loginData: Pick<User, 'email' | 'password'>): Promise<{ patient: Patient, user: User, token: Session['token'] }> {

        const { email, password } = loginData

        const user = await this.authRepository.findUserByEmail(email)
        if (!user) throw new HttpError(401, 'Email ou senha inválidos')

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) throw new HttpError(401, 'Email ou senha inválidos')

        if (user.role !== 'PATIENT') {
            throw new HttpError(403, 'Acesso não permitido')
        }

        const patient = await this.patientRepository.findPatientByUserId(user.id)
        if (!patient) throw new HttpError(404, 'Paciente não encontrado para este usuário')

        const { token, expires_at, user_type } = generateSessionData('PATIENT')

        await this.authRepository.createSession({ token, expires_at, user_type, user_id: user.id })
        return { user, patient, token }
    }

    async logout(token: Session['token']): Promise<void> {
        const session = await this.authRepository.findSessionByToken(token)
        if (!session) throw new HttpError(404, 'Sessão não encontrada')

        await this.authRepository.deleteSessionByToken(token)
    }



    async registerPsychologist(registerData: Pick<Psychologist, 'name' | 'phone'> & Pick<User, 'email' | 'password'> & { entryCode: string }): Promise<{ user: User, psychologist: Psychologist, token: Session['token'] }> {

        const { name, email, entryCode, password, phone } = registerData

        const alreadyHavePsychologist = await this.psychologistRepository.findPsychologists()
        if (alreadyHavePsychologist.length > 0) throw new HttpError(409, 'Só pode haver um psicólogo cadastrado')

        if (entryCode !== process.env.PSYCHOLOGIST_REGISTRATION_CODE) throw new HttpError(400, 'Código incorreto')

        const hashedPassword = await bcrypt.hash(password, 10)

        const { token, expires_at, user_type } = generateSessionData('PSYCHOLOGIST')

        const { psychologist, session, user } = await this.authRepository.createPsychologistAccount(
            { email, password: hashedPassword, role: user_type },
            { name, phone },
            { token, expires_at, user_type }
        )

        return { user, psychologist, token: session.token }
    }

    async loginPsychologist(loginData: Pick<User, 'email' | 'password'> & { entryCode: string }): Promise<{ psychologist: Psychologist, user: User, token: Session['token'] }> {

        const { email, password, entryCode } = loginData

        if (entryCode !== process.env.PSYCHOLOGIST_REGISTRATION_CODE) throw new HttpError(400, 'Código incorreto')

        const user = await this.authRepository.findUserByEmail(email)
        if (!user) throw new HttpError(401, 'Email ou senha inválidos')

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) throw new HttpError(401, 'Email ou senha inválidos')

        if (user.role !== 'PSYCHOLOGIST') {
            throw new HttpError(403, 'Acesso não permitido')
        }

        const psychologist = await this.psychologistRepository.findPsychologistByUserId(user.id)
        if (!psychologist) throw new HttpError(404, 'Psicólogo não encontrado para este usuário')

        const { token, expires_at, user_type } = generateSessionData('PSYCHOLOGIST')

        await this.authRepository.createSession({ token, expires_at, user_type, user_id: user.id })
        return { user, psychologist, token }
    }

    async deleteExpiredSessions(): Promise<number> {
        const deleted = await this.authRepository.deleteExpiredSessions()

        return deleted
    }
}