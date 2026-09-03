import type { NextFunction, Request, Response } from "express";
import type { IAuthRepository } from "../modules/auth/auth.interface.js";
import { HttpError } from "../modules/errors/HttpError.js";
import type { IPsychologistRepository } from "../modules/psychologist/psychologist.interface.js";
import type { IPatientRepository } from "../modules/patient/patient.interface.js";

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser
        }
    }
}

type AuthUser = PatientUser | PsychologistUser

export type PatientUser = {
    id: string
    patient_id: string
    name: string
    email: string
    role: 'PATIENT'
}

export type PsychologistUser = {
    id: string
    psychologist_id: string
    name: string
    email: string
    role: 'PSYCHOLOGIST'
}



export { }

export const authMiddleware = (
    authRepository: IAuthRepository,
    psychologistRepository: IPsychologistRepository,
    patientRepository: IPatientRepository) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.session

            // Usuário não está logado.
            // A requisição continua normalmente porque
            // este middleware não é responsável por proteção.
            if (!token) return next()

            const session = await authRepository.findSessionByToken(token)

            if (!session) {
                return next()
            }

            if (session.expires_at < new Date()) {
                return next()
            }

            const user = await authRepository.findUserById(session.user_id)

            if (!user) {
                return next(new HttpError(404, 'Usuário não encontrado'))
            }

            if (user.role === 'PATIENT') {
                const patient = await patientRepository.findPatientByUserId(user.id)

                if (!patient) {
                    return next(new HttpError(403, 'Paciente não encontrado'))
                }

                req.user = {
                    id: user.id,
                    patient_id: patient.id,
                    name: patient.name,
                    email: user.email,
                    role: user.role
                }
            }

            if (user.role === 'PSYCHOLOGIST') {
                const psychologist = await psychologistRepository.findPsychologistByUserId(user.id)

                if (!psychologist) {
                    return next(new HttpError(403, 'Psicólogo não encontrado'))
                }

                req.user = {
                    id: psychologist.id,
                    psychologist_id: psychologist.id,
                    name: psychologist.name,
                    email: user.email,
                    role: user.role
                }
            }

            return next()

        } catch (error) {
            return next(error)
        }
    }
}