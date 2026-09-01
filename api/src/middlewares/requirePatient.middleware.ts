import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../modules/errors/HttpError.js";

export const requirePatientMiddleware = (req: Request, res: Response, next: NextFunction) => {

    if (req.user?.role !== 'PATIENT') {
        return next(new HttpError(403, 'Você nao tem autorização'))
    }

    next()
}