import type { NextFunction, Request, Response } from "express";
import { AuthRepository } from "../modules/auth/auth.repository.js";
import { HttpError } from "../modules/errors/HttpError.js";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                name: string
                email: string
                role: string
            }
        }
    }
}

export { }

export const authMiddleware = (authRepository: AuthRepository) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.session

            // Usuário não está logado.
            // A requisição continua normalmente porque
            // este middleware não é responsável por proteção.
            if (!token) return next()

            const session = await authRepository.findSessionByToken(token)

            if (!session) {
                return next(new HttpError(401, 'Sessão inválida'))
            }

            if (session.expires_at < new Date()) {
                return next(new HttpError(401, 'Sessão expirada'))
            }

            const user = await authRepository.findUserById(session.user_id)

            if (!user) {
                return next(new HttpError(404, 'Usuário não encontrado'))
            }

            if (user.role === 'PATIENT') {
                const patient = await authRepository.findPatientByUserId(user.id)

                if (!patient) {
                    return next(new HttpError(404, 'Paciente não encontrado'))
                }

                req.user = {
                    id: patient.id,
                    name: patient.name,
                    email: user.email,
                    role: user.role
                }
            }

            if (user.role === 'PSYCHOLOGIST') {
                const psychologist = await authRepository.findPsychologistByUserId(user.id)

                if (!psychologist) {
                    return next(new HttpError(404, 'Psicólogo não encontrado'))
                }

                req.user = {
                    id: psychologist.id,
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