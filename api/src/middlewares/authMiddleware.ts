import type { NextFunction, Request, Response } from "express";
import { AuthRepository } from "../modules/auth/auth.repository.js";
import { HttpError } from "../modules/errors/HttpError.js";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                userName: string
            }
        }
    }
}
export { }

export const authMiddleware = (authRepository: AuthRepository) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.session

        if (token) {
            const session = await authRepository.findSessionByToken(token)

            if (!session) return next(new HttpError(401, 'Sessão inválida'))
            if (session.expires_at < new Date()) return (next(new HttpError(401, 'Sessão expirada')))

            const patient = await authRepository.findPatientById(session.user_id)
            if (!patient) return next(new HttpError(404, 'Usuário não cadastrado'))

            req.user = { id: patient.id, userName: patient.name }
            return next()
        }

        next()
    }
}