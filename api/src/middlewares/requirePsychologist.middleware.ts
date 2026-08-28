import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../modules/errors/HttpError.js";

export const requirePsychologistMiddleware = (req: Request, res: Response, next: NextFunction) => {

    if (req.user?.role !== 'PSYCHOLOGIST') return next(new HttpError(403, 'Essa conta nao tem autorização'))
}