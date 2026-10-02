import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../modules/errors/HttpError.js";
import type { IPatientRepository } from "../modules/patient/patient.interface.js";

export const requirePatientMiddleware = (patientRepository: IPatientRepository) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        if (req.user?.role !== 'PATIENT') {
            return next(new HttpError(403, 'Você nao tem autorização'))
        }

        const patient = await patientRepository.findPatientByUserId(req.user.id)

        if (!patient) {
            return next(new HttpError(403, 'Paciente não encontrado'))
        }

        req.patientId = patient.id

        next()
    }
}