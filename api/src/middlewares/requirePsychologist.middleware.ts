import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../modules/errors/HttpError.js";
import type { IPsychologistRepository } from "../modules/psychologist/psychologist.interface.js";

export const requirePsychologistMiddleware = (psychologistRepository: IPsychologistRepository) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        if (req.user?.role !== 'PSYCHOLOGIST') return next(new HttpError(403, 'Essa conta nao tem autorização'))

        const psychologist = await psychologistRepository.findPsychologistByUserId(req.user.id)

        if (!psychologist) {
            return next(new HttpError(403, 'Psicólogo não encontrado'))
        }

        req.psychologistId = psychologist.id
        next()
    }
}