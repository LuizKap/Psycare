import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import type { IAuthRepository } from "./auth.interface.js";
import type { Patient, Session, User } from "../../generated/prisma/client.js";
import { HttpError } from "../errors/HttpError.js";

export class AuthService {
    constructor(private authRepository: IAuthRepository) { }

    async register(registerData: Pick<Patient, 'name'> & Pick<User, 'email' | 'password'>): Promise<{ patient: Patient, user: User, token: Session['token'] }> {

        const { name, email, password } = registerData

        const foundUser = await this.authRepository.findUserByEmail(email)
        if (foundUser) throw new HttpError(409, 'Esse email ja está cadastrado')

        const hashedPassword = await bcrypt.hash(password, 10)

        const token = crypto.randomBytes(32).toString('hex')
        const TEN_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 10
        const expires_at = new Date(Date.now() + TEN_DAYS_IN_MS)

        const account = await this.authRepository.createPatientAccount(
            { email, password: hashedPassword, role: 'PATIENT' },
            { name },
            { token, expires_at, user_type: 'PATIENT' }
        )

        const { user, patient, session } = account
        return { user, patient, token: session.token }
    }

    async login(loginData: Pick<User, 'email' | 'password'>): Promise<{ patient: Patient, user: User, token: Session['token'] }> {

        const { email, password } = loginData

        const user = await this.authRepository.findUserByEmail(email)
        if (!user) throw new HttpError(401, 'Email ou senha inválidos')

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) throw new HttpError(401, 'Email ou senha inválidos')

        if (user.role !== 'PATIENT') {
            throw new HttpError(403, 'Acesso não permitido')
        }

        const patient = await this.authRepository.findPatientByUserId(user.id)
        if (!patient) throw new HttpError(404, 'Paciente não encontrado para este usuário')


        const token = crypto.randomBytes(32).toString('hex')
        const TEN_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 10
        const expires_at = new Date(Date.now() + TEN_DAYS_IN_MS)

        const sessionData: Pick<Session, 'token' | 'expires_at' | 'user_id' | 'user_type'> = {
            token,
            expires_at,
            user_id: user.id,
            user_type: 'PATIENT'
        }

        await this.authRepository.createSession(sessionData)
        return { user, patient, token }
    }

    async logout(token: Session['token']): Promise<void> {
        const session = await this.authRepository.findSessionByToken(token)
        if (!session) throw new HttpError(404, 'Sessão não encontrada')

        await this.authRepository.deleteSessionByToken(token)
    }
}