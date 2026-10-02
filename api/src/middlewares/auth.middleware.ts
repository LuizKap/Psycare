import type { NextFunction, Request, Response } from "express";
import type { IAuthRepository } from "../modules/auth/auth.interface.js";
import { HttpError } from "../modules/errors/HttpError.js";

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser,
            patientId: string,
            psychologistId: string
        }
    }
}

export type AuthUser = {
    id: string
    email: string
    role: 'PATIENT' | 'PSYCHOLOGIST'
}



export { }

export const authMiddleware = (
    authRepository: IAuthRepository) => {
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

            req.user = {
                id: user.id,
                email: user.email,
                role: user.role
            }

            return next()

        } catch (error) {
            return next(error)
        }
    }
}